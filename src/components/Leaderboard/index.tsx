import type { NextPage } from 'next';
import LeaderboardContainer from '~/components/Leaderboard/leaderboard-container';
import SectionCard from '~/components/Leaderboard/section-card';

const Leaderboard: NextPage = () => {
  return (
    <div className="relative bg-itsc-black w-full flex flex-col items-center justify-start p-4 box-border gap-[58px] text-center text-17xl font-outfit">
      <LeaderboardContainer />
      <div className="shrink-0 flex flex-row items-start justify-start gap-[215px]">
        <b className="relative text-transparent !bg-clip-text [background:linear-gradient(90deg,_#fbd099,_#fcefdf_59.9%,_#ffe299)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
          Rank
        </b>
        <b className="relative inline-block text-transparent !bg-clip-text [background:linear-gradient(90deg,_#fbd099,_#fcefdf_59.9%,_#ffe299)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] w-[193px] shrink-0">
          Name
        </b>
        <b className="relative inline-block text-transparent !bg-clip-text [background:linear-gradient(90deg,_#fbd099,_#fcefdf_59.9%,_#ffe299)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] w-[107px] shrink-0">
          Level
        </b>
        <b className="relative text-transparent !bg-clip-text [background:linear-gradient(90deg,_#fbd099,_#fcefdf_59.9%,_#ffe299)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] text-right">
          Tiger Points
        </b>
      </div>
      <div className="shrink-0 flex flex-col items-start justify-start gap-[15px]">
        <SectionCard avatarBaseImageUrl="/-privateavatarbase@2x.png" />
        <SectionCard avatarBaseImageUrl="/-privateavatarbase@2x.png" />
        <SectionCard avatarBaseImageUrl="/-privateavatarbase@2x.png" />
        <SectionCard avatarBaseImageUrl="/-privateavatarbase@2x.png" />
        <SectionCard avatarBaseImageUrl="/-privateavatarbase@2x.png" />
      </div>
    </div>
  );
};

export default Leaderboard;
