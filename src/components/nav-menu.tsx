import { useRouter } from 'next/router';
import type { NextPage } from 'next';

const NavMenu: NextPage = () => {
  const router = useRouter();
  const isIndexPage = router.pathname === '/'; // Check if the current page is the index page

  // Function to handle navigation and apply smooth scroll if on the index page
  const handleNavigation = (sectionId: string) => {
    if (isIndexPage) {
      const section = document.querySelector(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      router.push(`/${sectionId}`);
    }
  };

  return (
    <div className="w-[378px] flex flex-row items-start justify-between p-1.5 box-border text-left text-5xl font-outfit">
      <div
        onClick={() => handleNavigation('#DailyCheckIn')}
        className="mx-2 md:mx-4 cursor-pointer relative tracking-[0.9px] leading-[30px] font-semibold text-black whitespace-nowrap"
        style={{
          background: 'linear-gradient(90deg, #fbd099, #fcefdf 59.9%, #ffe299)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        rewards
      </div>
      <div
        onClick={() => handleNavigation('#DesktopDirectory')}
        className="mx-2 md:mx-3 cursor-pointer relative tracking-[0.9px] leading-[30px] font-semibold text-black whitespace-nowrap"
        style={{
          background: 'linear-gradient(90deg, #fbd099, #fcefdf 59.9%, #ffe299)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        directory
      </div>
      <div
        onClick={() => handleNavigation('#Leaderboard')}
        className="mx-2 md:mx-4 cursor-pointer relative tracking-[0.9px] leading-[30px] font-semibold text-black whitespace-nowrap"
        style={{
          background: 'linear-gradient(90deg, #fbd099, #fcefdf 59.9%, #ffe299)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        leaderboard
      </div>
    </div>
  );
};

export default NavMenu;
