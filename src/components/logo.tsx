import type { NextPage } from 'next';
import { useRouter } from 'next/router';

type LogoType = {
  iTSCLogo1?: string;
};

const Logo: NextPage<LogoType> = ({ iTSCLogo1 }) => {
  const router = useRouter();

  const handleClick = () => {
    if (router.pathname === '/') {
      // If on the index page, scroll to the top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // If not, navigate to the index page
      router.push('/');
    }
  };

  return (
    <div
      className="rounded-76xl h-[50px] flex flex-row items-center justify-center p-2 box-border gap-[8px] text-left text-base text-gray font-button-1 cursor-pointer"
      onClick={handleClick}
    >
      <img
        className="relative rounded-[4.28px] w-[44.11px] h-[39px] overflow-hidden shrink-0"
        alt="ITSC Logo"
        src={iTSCLogo1}
      />
      <b className="relative leading-[16px] hidden">ITSC</b>
    </div>
  );
};

export default Logo;
