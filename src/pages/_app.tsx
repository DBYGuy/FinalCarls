import type { NextPage } from 'next';
import type { AppType, AppProps } from 'next/app';
import type { ReactElement, ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import {
  configureChains,
  createConfig,
  WagmiConfig,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  mainnet,
} from 'wagmi';
import { infuraProvider } from 'wagmi/providers/infura';
import { createPublicClient, http } from 'viem';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import {
  GetSiweMessageOptions,
  RainbowKitSiweNextAuthProvider,
} from '@rainbow-me/rainbowkit-siwe-next-auth';
import '@rainbow-me/rainbowkit/styles.css';
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  injectedWallet,
  rainbowWallet,
  walletConnectWallet,
  ledgerWallet,
  metaMaskWallet,
  rabbyWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { Session } from 'next-auth';
import { trpc } from '../utils/trpc';
import '~/styles/globals.css';
import { CHAIN } from '../constants';

const projectId = process.env.NEXT_PUBLIC_RAINBOW_KEY ?? '';

const { chains } = configureChains(
  [CHAIN],
  [infuraProvider({ apiKey: process.env.INFURA_API_KEY! })],
);

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      injectedWallet({ chains }),
      rainbowWallet({ projectId, chains }),
      walletConnectWallet({ projectId, chains }),
      ledgerWallet({ projectId, chains }),
      metaMaskWallet({ projectId, chains }),
      rabbyWallet({ chains }),
    ],
  },
]);

const config = createConfig({
  connectors,
  autoConnect: true,
  publicClient: createPublicClient({
    chain: CHAIN,
    transport: http(),
  }),
});

const getSiweMessageOptions: GetSiweMessageOptions = () => ({
  statement: 'Sign in to ITSC',
});

export type NextPageWithLayout<
  TProps = Record<string, unknown>,
  TInitialProps = TProps,
> = NextPage<TProps, TInitialProps> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
  session: Session;
};

const MyApp = (({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) => {
  const getLayout =
    Component.getLayout ??
    ((page) => (
      <WagmiConfig config={config}>
        <SessionProvider session={session}>
          <RainbowKitSiweNextAuthProvider
            getSiweMessageOptions={getSiweMessageOptions}
          >
            <RainbowKitProvider chains={chains}>
              <>
                <div>{page}</div>
              </>
            </RainbowKitProvider>
          </RainbowKitSiweNextAuthProvider>
        </SessionProvider>
      </WagmiConfig>
    ));
  return getLayout(<Component {...pageProps} />);
}) as AppType;

export default trpc.withTRPC(MyApp);
