import type { NextPage } from 'next';

type LogoType = {
  iTSCLogo1?: string;
};

const Logo: NextPage<LogoType> = ({ iTSCLogo1 }) => {
  return (
    <div className="rounded-76xl h-[50px] flex flex-row items-center justify-center p-2 box-border gap-[8px] text-left text-base text-gray font-button-1">
      <img
        className="relative rounded-[4.28px] w-[44.11px] h-[39px] overflow-hidden shrink-0"
        alt=""
        src={iTSCLogo1}
      />
      <b className="relative leading-[16px] hidden">ITSC</b>
    </div>
  );
};

export default Logo;
