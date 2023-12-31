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
  sepolia,
} from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { createPublicClient, http } from 'viem';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
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
} from '@rainbow-me/rainbowkit/wallets';
import { Session } from 'next-auth';
import DesktopHeader from '~/components/DesktopHeader';
import HomeScreen from '~/components/HomeScreen';
import DailyCheckIn from '~/components/DailyCheckIn';
import DesktopDirectory from '~/components/DesktopDirectory';
import DesktopDropdown from '~/components/DesktopDropdown';
import TigerProfile from '~/components/TigerProfile';
import Leaderboard from '~/components/Leaderboard';
import HoldingsGallery from '~/components/HoldingsGallery';
import { PopupProvider } from '~/components/PopUp/popupContext';
import { ConfirmationModalProvider } from '../context/ConfirmationModalContext';
import localFont from '@next/font/local';
import { trpc } from '../utils/trpc';
import '~/styles/globals.css';
import { Open_Sans, Outfit, Poppins } from 'next/font/google';
import { CHAIN } from '../constants';

const projectId = process.env.NEXT_PUBLIC_RAINBOW_KEY ?? '';

const omegle = localFont({
  src: [
    {
      path: '../../public/fonts/Omegle/OmegleRegular.ttf',
      weight: '400',
    },
  ],
  variable: '--font-omegle',
});

const openSans = Open_Sans({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
  variable: '--font-open-sans',
});

const openSansBold = Open_Sans({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
  variable: '--font-open-sans-bold',
});

const sfProRounded = localFont({
  src: [
    {
      path: '../../public/fonts/SFProRounded/SF-Pro-Rounded-Regular.otf',
      weight: '400',
    },
  ],
  variable: '--font-sf-pro-rounded',
});

const outfit = Outfit({
  weight: ['300', '400', '700', '900'],
  subsets: ['latin'],
  variable: '--font-outfit',
});

const poppins = Poppins({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-poppins',
});

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [CHAIN],
  [publicProvider()],
);

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      injectedWallet({ chains }),
      rainbowWallet({ projectId, chains }),
      walletConnectWallet({ projectId, chains }),
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
                <ConfirmationModalProvider>
                  <PopupProvider>
                    <main
                      style={{
                        ...outfit.style,
                        ...sfProRounded.style,
                        ...openSans.style,
                        ...poppins.style,
                        ...openSansBold.style,
                      }}
                      className={omegle.variable}
                    >
                      <DesktopHeader />
                      <HomeScreen />
                      <DailyCheckIn />

                      <DesktopDirectory />
                      <DesktopDropdown />
                      <TigerProfile />
                      <HoldingsGallery />
                      <Leaderboard />
                      {/* <div>
                    <DefaultLayout>{page}</DefaultLayout>
                  </div> */}
                    </main>
                  </PopupProvider>
                </ConfirmationModalProvider>
              </>
            </RainbowKitProvider>
          </RainbowKitSiweNextAuthProvider>
        </SessionProvider>
      </WagmiConfig>
    ));
  return getLayout(<Component {...pageProps} />);
}) as AppType;

export default trpc.withTRPC(MyApp);
