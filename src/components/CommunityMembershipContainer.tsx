import type { NextPage } from 'next';

type CommunityMembershipContainerType = {
  httpsapplottiefilescomani?: string;
  community?: string;
  membership?: string;
  joinTheCCCAndReceiveFullA?: string;
};

const CommunityMembershipContainer: NextPage<
  CommunityMembershipContainerType
> = ({
  httpsapplottiefilescomani,
  community,
  membership,
  joinTheCCCAndReceiveFullA,
}) => {
  return (
    <div className="flex-1 bg-darkslateblue flex flex-col items-center justify-start p-2 box-border gap-[8px] min-w-[202px] max-w-[268px] text-center text-5xl text-white font-uniform">
      <img
        className="w-[50px] h-[51px] relative overflow-hidden shrink-0 object-contain"
        loading="eager"
        alt=""
        src={httpsapplottiefilescomani}
      />
      <h3 className="m-0 self-stretch relative text-inherit font-normal font-inherit mq450:text-lgi">
        <p className="m-0">{community}</p>
        <p className="m-0">{membership}</p>
      </h3>
      <div className="self-stretch h-[92px] relative text-base font-coda inline-block">
        {joinTheCCCAndReceiveFullA}
      </div>
    </div>
  );
};

export default CommunityMembershipContainer;
