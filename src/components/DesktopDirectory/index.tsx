import type { NextPage } from 'next';
import ProfileCard from '../ProfileCard';

const rectangleCardData = Array.from({ length: 12 }, (_, index) => ({
  imageUrl: `/group-10252@2x.png`, // Assuming you have images named image-1@2x, image-2@2x, etc.
  itscNumber: `ITSC # ${1000 + Math.floor(Math.random() * 1000)}`, // Random ITSC number
  holderName: 'Holder Name',
  tagDetails1: index % 2 === 0 ? 'Tag/Detail A' : 'Tag/Detail B',
  tagDetails2: index % 2 === 0 ? 'More Details A' : 'More Details B',
  buttonText: index % 3 === 0 ? 'Claim' : 'See More',
}));

const textStyle = {
  background: 'linear-gradient(90deg, #fbd099, #fcefdf 59.9%, #ffe299)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  textShadow: '4.8px -2.4px 4.81px rgba(0, 0, 0, 0.25)',
  color: 'black', // Fallback color
};

const DesktopDirectory: NextPage = () => {
  return (
    <div className="relative bg-gray-100 w-full h-[1930px] overflow-hidden text-left text-5xl text-white font-outfit">
      <img
        className="absolute top-[258.68px] left-[951.68px] rounded-sm w-[257.53px] h-[286.02px] object-cover"
        alt=""
        src="/snp-04-1@2x.png"
      />
      <div className="absolute top-[572px] left-[calc(50%_-_484px)] flex flex-row items-start justify-start gap-[16px]">
        <div className="relative shadow-[5px_4px_4px_rgba(0,_0,_0,_0.25)] w-[1092px] h-[400px]">
          <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded bg-gray-100 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)_inset]" />
          <div className="absolute top-[0px] left-[calc(50%_-_724px)] grid grid-cols-4 gap-35">
            {rectangleCardData.map((card, index) => (
              <ProfileCard key={index} {...card} />
            ))}
          </div>
        </div>
      </div>
      <div className="absolute top-[1830px] left-[calc(50%_-_96.5px)] shadow-[0px_3.999999761581421px_4px_rgba(0,_0,_0,_0.25)] flex flex-row items-start justify-start text-base text-gray-100 font-bold">
        <div className="rounded-[23.8px] [background:linear-gradient(180deg,_rgba(0,_0,_0,_0.17),_rgba(0,_0,_0,_0)_57.81%,_rgba(0,_0,_0,_0.2)),_#d15454] shadow-[0px_6.800000190734863px_20.4px_rgba(0,_0,_0,_0.1)] h-[68px] flex flex-row items-center justify-start py-[13.600000381469727px] px-[27.200000762939453px] box-border">
          <b className="relative tracking-[0.6px] leading-[20px]">Load More</b>
        </div>
      </div>
      <img
        className="absolute h-[0.28%] w-[3.65%] top-[25.88%] right-[86.57%] bottom-[73.84%] left-[9.78%] max-w-full overflow-hidden max-h-full"
        alt=""
        src="/group.svg"
      />
      <img
        className="absolute h-[2.21%] w-[17.79%] top-[23.08%] right-[77.84%] bottom-[74.71%] left-[4.37%] max-w-full overflow-hidden max-h-full"
        alt=""
        src="/left-gallery-cloud.svg"
      />
      <img
        className="absolute h-[3.62%] w-[16.49%] top-[17.92%] right-[2.69%] bottom-[78.46%] left-[80.82%] max-w-full overflow-hidden max-h-full"
        alt=""
        src="/right-gallery-cloud.svg"
      />
      <div className="absolute top-[521px] left-[132px] flex flex-row items-start justify-start gap-[8px] text-xs text-dimgray font-caption-2">
        <div className="relative w-[400px] h-10">
          <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-17xl [background:linear-gradient(90deg,_#fbd099,_#fcefdf_59.9%,_#ffe299)]" />
          <div className="absolute top-[11.71px] left-[51.89px] leading-[20px] inline-block w-[164.32px] h-[19.51px]">
            Search for anything…
          </div>
          <img
            className="absolute top-[9.71px] left-[16.3px] rounded-sm w-[25.62px] h-[23.51px]"
            alt=""
            src="/icons20pxsearch.svg"
          />
        </div>
        <img className="relative w-11 h-10" alt="" src="/buttons.svg" />
      </div>
      <div
        className="absolute top-[287px] left-[367px] text-inherit tracking-[1.02px] leading-[26px] font-inherit flex items-center w-[375px]"
        style={textStyle}
      >
        <span className="[line-break:anywhere] w-full">
          <p className="m-0">{`Lorem ipsum dolor sit amet, consectetur `}</p>
          <ul className="m-0 pl-8">
            <li className="mb-0">{`adipiscing elit, sed do `}</li>
            <li className="mb-0">{`eiusmod tempor `}</li>
            <li>{`incididunt ut labore et do `}</li>
          </ul>
        </span>
      </div>
      <img
        className="absolute top-[278.12px] left-[766.77px] w-[141.47px] h-[165.77px] overflow-hidden"
        alt=""
        src="/isolation-mode.svg"
      />
      <div className="absolute top-[0.68px] left-[calc(50%_-_1917px)] w-[3250.29px] h-[209.26px] text-center text-45xl font-title">
        <div
          className="absolute top-[0px] left-[calc(50%_-_31.15px)] tracking-[3.4px] leading-[64px] flex items-center w-[647px] h-[119.34px] [text-shadow:6px_-5px_4px_rgba(0,_0,_0,_0.25)]"
          style={textStyle}
        >
          <span className="[line-break:anywhere] w-full">
            <p className="m-0">{`TIGER GALLERY `}</p>
            <p className="m-0">MEMBER DIRECTORY</p>
          </span>
        </div>
        <img
          className="absolute h-[68.79%] w-[52%] top-[31.21%] right-[0%] bottom-[0%] left-[38.75%] max-w-full overflow-hidden max-h-full"
          alt=""
          src="/group-1054.svg"
        />
        <img
          className="absolute h-[68.79%] w-[48.07%] top-[31.21%] right-[16.21%] bottom-[0%] left-[17.72%] max-w-full overflow-hidden max-h-full"
          alt=""
          src="/group-1055.svg"
        />
      </div>
    </div>
  );
};
export default DesktopDirectory;
