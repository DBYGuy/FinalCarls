import type { NextPage } from 'next';
import LargeCheckIn from '../LargeCheckIn';
import ThinCheckIn from '../ThinCheckIn';

const DailyCheckIn: NextPage = () => {
  return (
    <div className="relative w-full h-screen mx-auto text-center text-base text-white font-rainbow-buttons-1">
      <div className="absolute top-0 left-0 w-full h-full ">
        <div className="bg-gray w-full h-full" />
        <img
          className="absolute top-[10%] left-0  min-w-full overflow-hidden max-h-full"
          alt=""
          src="/group-1022.svg"
        />
        <div className="absolute top-[26%] left-[20%] w-[60%] h-[50%] text-center">
          <div className="flex flex-row items-start justify-center gap-4">
            <ThinCheckIn
              day={1}
              tp={10}
              imageSrc="/day-1-fan.svg"
              isClaimed={true}
            />
            <ThinCheckIn
              day={2}
              tp={15}
              imageSrc="/day-2-mask.svg"
              isClaimed={true}
              claimedPoints={15}
            />
            <ThinCheckIn
              day={3}
              tp={20}
              imageSrc="/day-3-flower.svg"
              isClaimed={true}
            />
            <ThinCheckIn
              day={4}
              tp={30}
              imageSrc="/day-4-shoes.svg"
              isClaimed={false}
              claimedPoints={30}
            />
          </div>
          {/* Large Check-Ins */}
          <div className="flex flex-row items-start justify-center gap-3 mt-10">
            <LargeCheckIn
              day={5}
              tp={40}
              imageSrc="/day-5-bag.svg"
              isClaimed={false}
            />
            <LargeCheckIn
              day={6}
              tp={50}
              imageSrc="/day-6-ship.svg"
              isClaimed={false}
              claimedPoints={50}
            />
            <LargeCheckIn
              day={7}
              tp={70}
              imageSrc="/day-7-tiger.svg"
              isClaimed={false}
            />
          </div>
        </div>
        <div className="absolute top-[2%] left-[50%] translate-x-[-50%] text-[4vw] leading-[5vw] font-title bg-gradient-to-r from-[#fbd099] via-[#fcefdf] to-[#ffe299] bg-clip-text text-transparent">
          DAILY CHECK-IN
        </div>
        <div className="absolute top-[12%] left-[50%] translate-x-[-50%] text-[2vw] leading-[2.5vw] font-outfit bg-gradient-to-r from-[#fbd099] via-[#fcefdf] to-[#ffe299] bg-clip-text text-transparent">
          Fill in the blank with streak rules and encouragement
        </div>
      </div>
    </div>
  );
};

export default DailyCheckIn;
