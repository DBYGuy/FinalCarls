import React, { useState, useEffect, useMemo, CSSProperties } from 'react';
import type { NextPage } from 'next';
import Logo from './logo';
import NavMenu from './nav-menu';
import ConnectMenu from './connect-menu';
import { useMe } from '~/hooks/useMe';
import { useCheckLevelEligibility } from '~/hooks/useCheckLevelEligibility';
import LevelButton from '~/components/LevelButton';

type ContainerType = {
  /** Style props */
  propTop?: CSSProperties['top'];
};

const Container: NextPage<ContainerType> = ({ propTop }) => {
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const property1Variant2Style: CSSProperties = useMemo(() => {
    return {
      top: propTop,
    };
  }, [propTop]);

  const { user, isLoading } = useMe();
  const userId = user?.id ?? '';
  const { isEligible } = useCheckLevelEligibility(userId);

  useEffect(() => {
    // Function to update the state with the current window width
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Set the initial width
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      className="fixed z-10 top-0 left-[-36px] right-0 mx-4 w-[100%] h-10 flex flex-row items-center justify-between py-2 px-8 bg-black bg-opacity-70 pr-4" // Added pr-4 for padding-right
      style={property1Variant2Style}
    >
      <Logo iTSCLogo1="/itsclogo-11.svg" />
      {windowWidth > 1175 && (
        <div>
          <NavMenu />
        </div>
      )}
      {/* Conditionally render the LevelButton if the user is eligible */}
      {windowWidth > 610 && isEligible && (
        <div>
          <LevelButton />
        </div>
      )}

      <ConnectMenu
        avatar="/avatar1@2x.png"
        icon="/icon1.svg"
        iconsBurgerLine="/iconsburgerline1.svg"
        showAccountButton
        showIconsBurgerLine={false}
      />
    </div>
  );
};

export default Container;
