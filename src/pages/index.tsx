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
      </Head>
      <main className="flex flex-col">
        <HomeScreen />
        <div id="DailyCheckIn">
          <DailyCheckIn />
        </div>
        <div id="DesktopDirectory">
          <DesktopDirectory />
        </div>
        <div id="Leaderboard">
          <Leaderboard />
        </div>
        <Footer />
      </main>
    </>
  );
};

export default IndexPage;
