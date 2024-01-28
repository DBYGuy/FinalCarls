import { PrismaAdapter } from '@next-auth/prisma-adapter';
import Cookies from 'cookies';
import { randomUUID as generateSessionToken } from 'crypto';
import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { AuthOptions, Session } from 'next-auth';
import { decode, encode } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getCsrfToken } from 'next-auth/react';
import { SiweMessage } from 'siwe';
import { DOMAIN, websiteUrl } from '../../../constants';
import { prisma } from '../../../server/context/db';
import { InfuraProvider } from 'ethers';
import DiscordProvider from 'next-auth/providers/discord';

type DiscordProfile = {
  username: string;
  discriminator: string;
};

const UNSECURE_SESSION_TOKEN_COOKIE_NAME = 'next-auth.session-token';
const SECURE_SESSION_TOKEN_COOKIE_NAME = '__Secure-next-auth.session-token';
const SESSION_TOKEN_COOKIE_NAME = process.env.VERCEL
  ? SECURE_SESSION_TOKEN_COOKIE_NAME
  : UNSECURE_SESSION_TOKEN_COOKIE_NAME;

const getExpiryDate = (time: number, date = Date.now()) =>
  new Date(date + time * 1000);

const isCredentialsCallback = (req: NextApiRequest) =>
  req.method === 'POST' &&
  req.query.nextauth?.includes('callback') &&
  req.query.nextauth.includes('credentials');

export function getServerContext(
  req: NextApiRequest,
  res: NextApiResponse,
): [NextApiRequest, NextApiResponse, AuthOptions] {
  const adapter = PrismaAdapter(prisma);

  const authOptions: AuthOptions = {
    debug: true,
    adapter: PrismaAdapter(prisma),
    secret: process.env.NEXTAUTH_SECRET,
    useSecureCookies: process.env.VERCEL === '1',
    providers: [
      CredentialsProvider({
        name: 'Ethereum',
        credentials: {
          message: {
            label: 'Message',
            type: 'text',
          },
          signature: {
            label: 'Signature',
            type: 'text',
          },
        },
        async authorize(credentials) {
          try {
            const siwe = new SiweMessage(
              JSON.parse(credentials?.message ?? '{}'),
            );
            const nextAuthUrl = new URL(websiteUrl);

            const result = await siwe.verify({
              signature: credentials?.signature ?? '',
              domain: nextAuthUrl.host,
              nonce: await getCsrfToken({ req: { headers: req.headers } }),
            });

            if (!result.success) {
              return null;
            }

            const user = await prisma.$transaction(async (prisma) => {
              const upsertedUser = await prisma.user.upsert({
                where: {
                  walletAddress: siwe.address,
                },
                create: {
                  walletAddress: siwe.address,
                  // Create UserPoints and UserProfile at the time of user creation
                  userPoints: {
                    create: {
                      totalPoints: 0,
                      level: 0,
                      lastUpdated: new Date(),
                    },
                  },
                  userProfile: {
                    create: {
                      walletAddress: siwe.address,
                      joinedDate: new Date(),
                    },
                  },
                  userDailyReward: {
                    create: {
                      currentDay: 0, // Set the current day to 0
                      lastClaimed: new Date(), // Set the last claimed date to now
                    },
                  },
                },
                update: {},
                include: {
                  userPoints: true,
                  userProfile: true,
                  userDailyReward: true,
                },
              });

              return upsertedUser;
            });

            return user;
          } catch (e) {
            console.error('Error in user authorization:', e);
            return null;
          }
        },
      }),
      DiscordProvider({
        clientId: process.env?.DISCORD_CLIENT_ID ?? '',
        clientSecret: process.env?.DISCORD_CLIENT_SECRET ?? '',
        authorization: {
          params: {
            scope: 'identify',
          },
        },
      }),
    ],
    callbacks: {
      async signIn({ user, account, profile }) {
        if (account?.provider === 'discord' && profile) {
          // Use type assertion with 'unknown' first
          const discordProfile = profile as unknown as DiscordProfile;

          const updatedUser = await prisma.user.update({
            where: { id: user.id },
            data: {
              discordID: `${discordProfile.username}#${discordProfile.discriminator}`,
            },
          });

          return updatedUser ? true : false;
        }
        if (isCredentialsCallback(req) && user) {
          const sessionToken = generateSessionToken();
          const sessionMaxAge = 60 * 60 * 24 * 30; // 30 Days
          const expires = getExpiryDate(sessionMaxAge);

          if (adapter?.createSession) {
            await adapter.createSession({
              sessionToken,
              userId: user.id,
              expires,
            });
            return true;
          }

          const provider = new InfuraProvider(
            1, // Ethereum Mainnet
            process.env.INFURA_API_KEY,
          );
          const name = await provider.lookupAddress(user.walletAddress);
          await prisma.user.update({
            where: {
              id: user.id,
            },
            data: {
              ENSName: name,
            },
          });

          const cookies = new Cookies(req, res);

          try {
            cookies.secure = true;
            cookies.set(SESSION_TOKEN_COOKIE_NAME, sessionToken, {
              expires,
              secure: !!process.env.VERCEL,
              domain: DOMAIN,
            });
          } catch (err) {
            console.log('Error setting session token cookie', err);
          }
        }

        return true;
      },
      session({ session, user }) {
        if (session.user) {
          session.user = user as Session['user'];
        }

        return session;
      },
    },
    jwt: {
      encode: async ({ token, secret, maxAge }) => {
        if (isCredentialsCallback(req)) {
          const cookie = new Cookies(req, res).get(SESSION_TOKEN_COOKIE_NAME);
          return cookie ?? '';
        }
        return encode({ token, secret, maxAge });
      },
      decode: async ({ token, secret }) => {
        if (isCredentialsCallback(req)) {
          return null;
        }
        return decode({ token, secret });
      },
    },
    pages: {
      signIn: '/',
    },
  };

  return [req, res, authOptions];
}

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const context = getServerContext(req, res);
  return await NextAuth(...context);
};

export default handler;
