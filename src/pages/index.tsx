import Head from 'next/head';
import HomeScreen from '~/components/HomeScreen';
import DailyCheckIn from '~/components/DailyCheckIn';
import DesktopDirectory from '~/components/DesktopDirectory';
import Leaderboard from '~/components/Leaderboard';
import Footer from '~/components/Footer';
import SignedOutRewardsTiles from '~/components/SignedOutRewardsTiles'; // Make sure the path is correct
import { useMe } from '~/hooks/useMe';

const IndexPage = () => {
  const { user } = useMe();

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Welcome to ITSCTigers</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col">
        <HomeScreen />
        {user ? (
          <>
            <div id="DailyCheckIn">
              <DailyCheckIn />
            </div>
            <div id="DesktopDirectory">
              <DesktopDirectory />
            </div>
            <div id="Leaderboard">
              <Leaderboard />
            </div>
          </>
        ) : (
          <SignedOutRewardsTiles />
        )}
        <Footer />
      </main>
    </>
  );
};

export default IndexPage;
