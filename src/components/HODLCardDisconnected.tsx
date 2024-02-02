import type { NextPage } from 'next';

type HODLCardDisconnectedType = {
  pointValue?: string;
  framehodlcards?: string;
};

const HODLCardDisconnected: NextPage<HODLCardDisconnectedType> = ({
  pointValue,
  framehodlcards,
}) => {
  return (
    <div className="self-stretch w-[200px] shadow-[2.1px_9.5px_10.53px_rgba(0,_0,_0,_0.25)] shrink-0 flex flex-col items-start justify-start text-center text-3xl text-lightgray font-coda">
      <div className="self-stretch flex-1 relative rounded-lg [background:linear-gradient(180deg,_#424242,_#262626)] shadow-[0px_1px_3px_rgba(0,_0,_0,_0.1),_0px_1px_2px_rgba(0,_0,_0,_0.06)]" />
      <div className="self-stretch flex-[0.9315] flex flex-col items-center justify-start pt-[11px] px-[7px] pb-3 gap-[8px] z-[1] mt-[-336px]">
        <div className="w-[175px] h-[18.3px] relative flex items-center justify-center shrink-0 [text-shadow:5px_6px_4px_rgba(0,_0,_0,_0.25)] mq450:text-lg">
          {pointValue}
        </div>
        <img
          className="self-stretch flex-1 relative rounded-lg max-w-full overflow-hidden max-h-full object-cover"
          loading="eager"
          alt=""
          src={framehodlcards}
        />
        <button className="cursor-pointer [border:none] pt-2 pb-[7px] pr-3 pl-4 bg-purple-500 h-10 rounded-md flex flex-row items-center justify-center box-border gap-[8px]">
          <img
            className="h-4 w-4 relative overflow-hidden shrink-0 hidden"
            alt=""
            src="/lefticon.svg"
          />
          <div className="relative text-base leading-[24px] font-semibold font-text-md-lineheight-6-font-semibold text-carl-frost-white text-left">
            Sign in to Claim
          </div>
          <img
            className="h-4 w-4 relative overflow-hidden shrink-0 hidden"
            alt=""
            src="/lefticon.svg"
          />
        </button>
      </div>
    </div>
  );
};

export default HODLCardDisconnected;
