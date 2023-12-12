import type { NextPage } from 'next';

const NavMenu: NextPage = () => {
  return (
    <div className="w-[378px] flex flex-row items-start justify-between p-1.5 box-border text-left text-5xl font-outfit">
      <div
        className="mx-2 md:mx-4 relative tracking-[0.9px] leading-[30px] font-semibold text-black whitespace-nowrap"
        style={{
          background: 'linear-gradient(90deg, #fbd099, #fcefdf 59.9%, #ffe299)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        rewards
      </div>
      <div
        className="mx-2 md:mx-3 relative tracking-[0.9px] leading-[30px] font-semibold text-black whitespace-nowrap"
        style={{
          background: 'linear-gradient(90deg, #fbd099, #fcefdf 59.9%, #ffe299)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        directory
      </div>
      <div
        className="mx-2 md:mx-4 relative tracking-[0.9px] leading-[30px] font-semibold text-black whitespace-nowrap"
        style={{
          background: 'linear-gradient(90deg, #fbd099, #fcefdf 59.9%, #ffe299)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        social feed
      </div>
    </div>
  );
};

export default NavMenu;
