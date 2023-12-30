import type { NextPage } from 'next';
import { useMemo, type CSSProperties } from 'react';
import Logo from './logo';
import NavMenu from './nav-menu';
import ConnectMenu from './connect-menu';
import { useMe } from '~/hooks/useMe';
import { useCheckLevelEligibility } from '~/hooks/useCheckLevelEligibility';
import LevelButton from '~/components/LevelButton';

type ContainerType = {
  logoImageName?: string;
  avatarImageName?: string;
  iconImageName?: string;
  burgerIconName?: string;
  button?: boolean;
  showAccountButton?: boolean;
  showButton?: boolean;
  showAccountButton1?: boolean;
  showIconsBurgerLine?: boolean;

  /** Style props */
  propTop?: CSSProperties['top'];
};

const Container: NextPage<ContainerType> = ({
  logoImageName,
  avatarImageName,
  iconImageName,
  burgerIconName,
  button,
  showAccountButton,
  propTop,
  showButton,
  showAccountButton1,
  showIconsBurgerLine,
}) => {
  const property1Variant2Style: CSSProperties = useMemo(() => {
    return {
      top: propTop,
    };
  }, [propTop]);

  const user = useMe();
  const userId = user?.id ?? '';
  const { isEligible, toNextLevel } = useCheckLevelEligibility(userId);

  return (
    <div
      className="fixed z-10 top-0 left-0 right-0 mx-auto w-[97%] h-10 flex flex-row items-center justify-between py-2 px-8 bg-black bg-opacity-70"
      style={property1Variant2Style}
    >
      <Logo iTSCLogo1="/itsclogo-11.svg" />
      <NavMenu />
      {/* Conditionally render the LevelButton if the user is eligible */}
      {isEligible && <LevelButton />}
      <ConnectMenu
        avatar="/avatar1@2x.png"
        icon="/icon1.svg"
        iconsBurgerLine="/iconsburgerline1.svg"
        showButton={false}
        showAccountButton
        showIconsBurgerLine={false}
        connectWalletDisplay="inline-block"
      />
    </div>
  );
};

export default Container;
