import Head from 'next/head';
import TigerProfile from '~/components/TigerProfile';
import HoldingsGallery from '~/components/HoldingsGallery';
import Custom404 from '~/pages/404';
import { useMe } from '~/hooks/useMe';

const ProfilePage = () => {
  const { user } = useMe();

  if (!user) {
    return <Custom404 />;
  }

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Your Tiger Profile</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col items-start justify-start w-full min-h-screen bg-gray-100">
        <TigerProfile />
        <HoldingsGallery />
      </div>
    </>
  );
};

export default ProfilePage;
