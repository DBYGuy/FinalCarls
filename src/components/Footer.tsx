import type { NextPage } from 'next';

const Footer: NextPage = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="w-full h-[564px] relative bg-itsc-black overflow-hidden flex flex-row items-end justify-center pt-[145px] pb-[68px] pr-5 pl-[21px] box-border text-left text-base text-itsc-black font-bold">
      <div className="h-[392px] w-[395px] flex flex-col items-center justify-start relative gap-[26px] text-center text-white-gold-itsc font-outfit">
        <div className="w-[300px] h-28 flex flex-col items-center justify-start gap-[21px]">
          <div className="w-72 flex-1 flex flex-row items-start justify-start z-[6] py-0 px-5 box-border gap-[16px]">
            {/* Icon 1 */}
            <div className="icon-background flex-1 flex justify-center items-center h-14">
              <img
                className="h-10 w-10 object-contain"
                alt=""
                src="/x-logo.svg"
              />
            </div>

            {/* Icon 2 - Middle Icon */}
            <div className="icon-background flex-1 flex justify-center items-center h-14">
              <img
                className="h-10 w-10 object-contain"
                alt=""
                src="/opensea-ship@2x.png"
              />
            </div>

            {/* Icon 3 */}
            <div className="icon-background flex-1 flex justify-center items-center h-14">
              <img
                className="h-10 w-10 object-contain"
                alt=""
                src="/vector@2x.png"
              />
            </div>
          </div>

          <style>{`
            .icon-background {
              background: linear-gradient(
                90deg,
                #fbd099,
                #fcefdf 59.9%,
                #ffe299
              );
              border: 5px solid;
              border-color: #d15454;
              border-radius: 10.75px;
              overflow: hidden;
              display: flex;
              align-items: center;
              justify-content: center;
              width: 55px; // Maintaining the square shape
              height: 55px; // Adjusted height for consistency
            }
          `}</style>
          <div className="self-stretch flex flex-row items-center justify-center">
            <div className="flex-1 relative leading-[18.43px]">
              <span>{`copyright ${currentYear} `}</span>
              <b>Art In Motion</b>
            </div>
          </div>
        </div>
        <img
          className="self-stretch flex-1 relative max-w-full z-[3] overflow-hidden max-h-full"
          loading="eager"
          alt=""
          src="/group-1062.svg"
        />
        <div className="w-[1457px] h-[488px] absolute my-0 mx-[!important] top-[-88px] left-[-543px]">
          <img
            className="absolute top-[0px] left-[0px] w-[1456.9px] h-[468.6px] z-[0] animate-twinkle"
            alt=""
            src="/footer-stars-a.svg"
          />
          <img
            className="absolute top-[22px] left-[104px] w-[1353.3px] h-[466.3px] z-[0] animate-fadeInOut"
            alt=""
            src="/footer-stars-b.svg"
          />
          <img
            className="absolute top-[0px] left-[0px] w-screen h-[468.6px] z-[0] animate-marquee"
            alt=""
            src="flat clouds.svg"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
