import type { NextPage } from 'next';

const CardContainer: NextPage = () => {
  return (
    <div className="w-[1231px] flex flex-row items-center justify-start py-0 pr-[21px] pl-5 box-border [row-gap:20px] max-w-full text-left text-66xl text-white font-uniform mq1050:flex-wrap">
      <div className="w-[537px] flex flex-col items-start justify-start py-2 px-0 box-border gap-[16px] min-w-[537.1px] max-w-full mq750:min-w-full mq1050:flex-1">
        <h1 className="m-0 h-[70px] relative text-inherit leading-[85px] font-normal font-inherit inline-block shrink-0 [text-shadow:8.6px_10.3px_6.87px_rgba(0,_0,_0,_0.25)] max-w-full mq1050:text-23xl mq1050:leading-[51px] mq450:text-6xl mq450:leading-[34px]">
          THE CRAZY
        </h1>
        <h1 className="m-0 h-[154px] relative text-161xl leading-[180px] font-normal font-inherit inline-block shrink-0 [text-shadow:8.6px_10.3px_6.87px_rgba(0,_0,_0,_0.25)] max-w-full mq1050:text-53xl mq1050:leading-[108px] mq450:text-26xl mq450:leading-[72px]">
          CARL
        </h1>
        <h1 className="m-0 h-[61px] relative text-59xl leading-[75.6px] font-normal font-inherit inline-block shrink-0 [text-shadow:8.6px_10.3px_6.87px_rgba(0,_0,_0,_0.25)] max-w-full mq1050:text-43xl mq1050:leading-[60px] mq450:text-28xl mq450:leading-[45px]">
          COLLECTIVE
        </h1>
        <div className="w-[514px] relative text-lg font-coda text-light-purp-carl inline-block max-w-full">
          <p className="m-0">
            The Crazy Carl Collective is a group of pseudonymous collectors,
            artists, and builders in Web3 that all take on the name Carl.
          </p>
          <p className="m-0">&nbsp;</p>
          <p className="m-0">
            Our mission is to create a decentralized group identity focused
            around uplifting one another, learning, and building in Web3.
          </p>
          <p className="m-0">&nbsp;</p>
          <p className="m-0">Watch us, then join us!</p>
        </div>
        <h1 className="m-0 self-stretch relative text-29xl leading-[48px] font-normal font-covered-by-your-grace text-center [text-shadow:5px_6px_4px_rgba(0,_0,_0,_0.25)] mq1050:text-19xl mq1050:leading-[38px] mq450:text-10xl mq450:leading-[29px]">
          -CARLs
        </h1>
      </div>
      <div className="flex-1 flex flex-row items-center justify-center min-w-[425px] max-w-full ml-[-1px] mq750:min-w-full mq1050:ml-0">
        <div className="h-[661px] flex-1 relative max-w-full">
          <img
            className="absolute top-[85px] left-[41.1px] w-[590.9px] h-[576px]"
            alt=""
            src="/carl-hero-bg.svg"
          />
          <div className="absolute top-[0px] left-[0px] w-[653.7px] h-[561.5px] z-[1]">
            <img
              className="absolute top-[0px] left-[0px] w-[653.7px] h-[538px] object-cover"
              alt=""
              src="/carl@2x.png"
            />
            <img
              className="absolute h-[6.34%] w-[63.71%] top-[93.66%] right-[16.2%] bottom-[0%] left-[20.09%] max-w-full overflow-hidden max-h-full z-[1]"
              loading="eager"
              alt=""
              src="/vector.svg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardContainer;
