import type { NextPage } from 'next';
import Button from './button';
import { useMe } from '~/hooks/useMe';

const HomeScreen: NextPage = () => {
  const { user } = useMe();
  return (
    <div className="bg-itsc-black w-full h-[75vh] overflow-hidden object-contain text-center text-[90px] relative">
      {/* Background SVG */}
      <img
        src="/BG ELEMENTS STARS A.svg"
        alt="Background Stars"
        className="absolute top-0 left-0 w-full z-0 h-full object-cover animate-fadeInOut"
      />
      <img
        src="/stars b.svg"
        alt="Twinkling Stars"
        className="absolute top-0 left-0 w-full h-full object-cover z-0 animate-twinkle"
      />
      <img
        src="/BG ELEMENTS CLOUDS.svg"
        alt="Clouds"
        className="absolute top-[-24px] left-0 w-screen h-auto min-h-[85%] z-1 animate-marquee"
      />
      <img
        src="/megacloud.svg"
        alt="Mega Cloud"
        className="absolute z-2 top-[35%] left-[10%] transform -translate-x-1/2 -translate-y-1/2 w-[18vw] h-[163px] animate-megaCloudAnimation"
      />
      <img
        src="/hero tigers.png"
        alt="Hero Tigers"
        className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 z-5 w-[46vw] lg:w-[48vw] h-auto hidden md3:block max-w-[800px] max-h-[600px]"
      />
      <div className="absolute top-[5%] left-[20%] w-[60vw] h-[60vh] hidden lg:block"></div>

      <div className="absolute top-[210px] z-3 left-0 right-0 mx-auto slideDownAnimation animate-gradientTitle text-[5vw] lg:text-[70px] font-omegle text-transparent bg-clip-text bg-gradient-to-r from-text-gold-start via-text-gold-middle to-text-gold-end">
        IMPATIENT TIGER SOCIAL CLUB
      </div>

      <div className="absolute bottom-[30%] right-[30px] mb-4 mr-4 w-[330px] text-right text-[22px] lg:text-[22px] font-open-sans bg-clip-text text-transparent bg-gradient-to-r from-text-gold-start via-text-gold-middle to-text-gold-end hidden md2:block">
        <span>
          Welcome to <b>next generation</b> ITSC blockchain rewards
        </span>
      </div>

      {!user && (
        <div className="absolute top-[55%] left-[5vw] w-[224px] h-[15vh] text-left font-outfit">
          <Button />
          <div className="absolute top-1 left-[73%] text-[30px] lg:text-[30px] bg-clip-text text-transparent bg-gradient-to-r from-text-gold-start via-text-gold-middle to-text-gold-end hidden md2:block">
            to claim
          </div>
          <div className="absolute top-[74%] left-[32%] text-[32px] lg:text-[32px] bg-clip-text text-transparent bg-gradient-to-r from-text-gold-start via-text-gold-middle to-text-gold-end hidden md2:block">
            <span>join the</span>
            <b> club</b>
          </div>
          <div className="absolute top-[27%] left-[10%] text-[36px] lg:text-[36px] bg-clip-text text-transparent bg-gradient-to-r from-text-gold-start via-text-gold-middle to-text-gold-end hidden md2:block">
            <span>daily </span>
            <b>rewards </b>
            <span>& </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeScreen;
