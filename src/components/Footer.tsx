import type { NextPage } from 'next';

const Footer: NextPage = () => {
  return (
    <footer className="w-full h-[564px] relative bg-itsc-black overflow-hidden flex flex-row items-end justify-center pt-[105px] pb-[68px] pr-5 pl-[21px] box-border text-left text-base text-itsc-black font-bold">
      <div className="h-[392px] w-[395px] flex flex-col items-center justify-start relative gap-[26px] text-center text-white-gold-itsc font-outfit">
        <div className="w-[300px] h-28 flex flex-col items-center justify-start gap-[21px]">
          <div className="w-72 flex-1 flex flex-row items-start justify-start py-0 px-5 box-border gap-[16px]">
            <div className="self-stretch flex-1 flex flex-row items-center justify-start py-0 pr-[15px] pl-0">
              <div className="self-stretch flex-1 rounded-[15.75px] [background:linear-gradient(90deg,_#fbd099,_#fcefdf_59.9%,_#ffe299)] overflow-hidden border-[4px] border-solid border-dusty-red" />
              <img
                className="h-[37.8px] w-[41.8px] relative z-4 ml-[-57px]"
                loading="eager"
                alt=""
                src="/x-logo.svg"
              />
            </div>
            <button className="cursor-pointer [border:none] py-0 pr-1.5 pl-0 bg-[transparent] self-stretch flex-1 flex flex-row items-center justify-start">
              <div className="self-stretch flex-1 rounded-[15.75px] [background:linear-gradient(90deg,_#fbd099,_#fcefdf_59.9%,_#ffe299)] overflow-hidden border-[4px] border-solid border-dusty-red" />
              <img
                className="h-[47px] w-[52px] relative z-4 ml-[-57px]"
                alt=""
                src="/opensea-ship@2x.png"
              />
            </button>
            <button className="cursor-pointer [border:none] py-0 pr-4 pl-0 bg-[transparent] self-stretch flex-1 flex flex-row items-center justify-start">
              <div className="self-stretch flex-1 rounded-[15.75px] [background:linear-gradient(90deg,_#fbd099,_#fcefdf_59.9%,_#ffe299)] overflow-hidden border-[4px] border-solid border-dusty-red" />
              <img
                className="h-[30.2px] w-[41.5px] relative z-4 ml-[-57px]"
                alt=""
                src="/vector@2x.png"
              />
            </button>
          </div>
          <div className="self-stretch flex flex-row items-center justify-center">
            <div className="flex-1 relative leading-[18.43px]">
              <span>{`copyright 2024 `}</span>
              <b>Art In Motion</b>
            </div>
          </div>
        </div>
        <img
          className="self-stretch flex-1 relative max-w-full z-3 overflow-hidden max-h-full"
          loading="eager"
          alt=""
          src="/group-1062.svg"
        />
        <div className="w-[1457px] h-[488px] absolute my-0 mx-[!important] top-[-88px] left-[-543px]">
          <img
            className="absolute top-[0px] left-[0px] w-[1456.9px] h-[468.6px] z-1 animate-twinkle"
            alt=""
            src="/footer-stars-a.svg"
          />
          <img
            className="absolute top-[22px] left-[104px] w-[1353.3px] h-[466.3px] z-1 animate-fadeInOut"
            alt=""
            src="/footer-stars-b.svg"
          />
          <img
            className="absolute top-[0px] left-[0px] w-screen h-[468.6px] z-[1] animate-marquee"
            alt=""
            src="flat clouds.svg"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
