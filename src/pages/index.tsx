import React from 'react';
import Head from 'next/head';
import HomeScreen from '~/components/HomeScreen';
import DailyCheckIn from '~/components/DailyCheckIn';
import DesktopDirectory from '~/components/DesktopDirectory';
import Leaderboard from '~/components/Leaderboard';
import Footer from '~/components/Footer';

const IndexPage = () => {
  return (
    <>
      <Head>
        <title>Welcome to ITSCTigers</title>
        {/* Add any additional head elements here */}
      </Head>
      <main className="flex flex-col items-center justify-center">
        <HomeScreen />
        <DailyCheckIn />
        <DesktopDirectory />
        <Leaderboard />
        <Footer />
      </main>
    </>
  );
};

export default IndexPage;
