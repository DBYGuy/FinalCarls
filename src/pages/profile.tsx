import TigerProfile from '~/components/TigerProfile';
import HoldingsGallery from '~/components/HoldingsGallery';
import Custom404 from '~/pages/404';
import { useMe } from '~/hooks/useMe';

const ProfilePage = () => {
  const user = useMe();

  if (!user) {
    return <Custom404 />;
  }

  return (
    <>
      <div className="flex flex-col items-start justify-start w-full min-h-screen bg-gray-100">
        <TigerProfile />
        <HoldingsGallery />
      </div>
    </>
  );
};

export default ProfilePage;
