import type { NextPage } from 'next';

const Footer: NextPage = () => {
  return (
    <div className="relative bg-itsc-black w-full h-[255px] overflow-hidden text-left text-[27.2px] text-itsc-black font-bold">
      <div className="absolute top-[517px] left-[calc(50%_-_615.45px)] shadow-[0px_3.999999761581421px_4px_rgba(0,_0,_0,_0.25)] hidden flex-row items-start justify-start">
        <div className="rounded-[23.8px] [background:linear-gradient(180deg,_rgba(0,_0,_0,_0.17),_rgba(0,_0,_0,_0)_57.81%,_rgba(0,_0,_0,_0.2)),_#d15454] shadow-[0px_6.800000190734863px_20.4px_rgba(0,_0,_0,_0.1)] h-[68px] flex flex-row items-center justify-start py-[13.600000381469727px] px-[27.200000762939453px] box-border">
          <b className="relative tracking-[1.02px] leading-[34px]">
            See All Missions
          </b>
        </div>
      </div>
      <div className="absolute top-[105px] left-[calc(50%_-_150px)] flex flex-col items-center justify-start gap-[21px] text-center text-base text-white-gold-itsc font-outfit">
        <div className="shrink-0 flex flex-row items-start justify-start gap-[16px]">
          <div className="relative w-[72px] h-[72px]">
            <div className="absolute top-[0px] left-[0px] rounded-[15.75px] [background:linear-gradient(90deg,_#fbd099,_#fcefdf_59.9%,_#ffe299)] box-border w-[72px] h-[72px] overflow-hidden border-[4px] border-solid border-indianred" />
            <img
              className="absolute top-[17px] left-[15px] w-[41.78px] h-[37.81px] object-cover"
              alt=""
              src="/x-logo@2x.png"
            />
          </div>
          <div className="relative w-[72px] h-[72px]">
            <div className="absolute top-[0px] left-[0px] rounded-[15.75px] [background:linear-gradient(90deg,_#fbd099,_#fcefdf_59.9%,_#ffe299)] box-border w-[72px] h-[72px] overflow-hidden border-[4px] border-solid border-indianred" />
            <img
              className="absolute top-[13px] left-[5px] w-[61px] h-[47px] object-cover"
              alt=""
              src="/opensea-ship@2x.png"
            />
          </div>
          <div className="relative w-[72px] h-[72px]">
            <div className="absolute top-[0px] left-[0px] rounded-[15.75px] [background:linear-gradient(90deg,_#fbd099,_#fcefdf_59.9%,_#ffe299)] box-border w-[72px] h-[72px] overflow-hidden border-[4px] border-solid border-indianred" />
            <img
              className="absolute top-[21px] left-[16px] w-[39.46px] h-[30.25px] object-cover"
              alt=""
              src="/vector@2x.png"
            />
          </div>
        </div>
        <div className="shrink-0 flex flex-col items-center justify-start">
          <div className="relative leading-[18.43px] inline-block w-[300px] h-[19px] shrink-0">
            <span>{`copyright 2024 `}</span>
            <b>Art In Motion</b>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
