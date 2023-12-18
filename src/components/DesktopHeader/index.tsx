import type { NextPage } from 'next';
import Container from '../container';
import { useIsAuthenticated } from '../../hooks/useIsAuthenticated';

const DesktopHeader: NextPage = () => {
  const isAuthenticated = useIsAuthenticated();
  return (
    <div className="relative rounded-[5px] box-border w-full h-52 overflow-hidden ">
      {isAuthenticated ? (
        <Container
          logoImageName="/itsclogo-1.svg"
          avatarImageName="/avatar@2x.png"
          iconImageName="/icon.svg"
          burgerIconName="/iconsburgerline.svg"
          button
          showAccountButton={false}
          propTop="16px"
          showButton
          showAccountButton1={false}
          showIconsBurgerLine={false}
        />
      ) : (
        <Container
          logoImageName="/itsclogo-11.svg"
          avatarImageName="/avatar1@2x.png"
          iconImageName="/icon1.svg"
          burgerIconName="/iconsburgerline1.svg"
          button={true}
          showAccountButton
          showButton={false}
          showAccountButton1
          showIconsBurgerLine={false}
        />
      )}
    </div>
  );
};

export default DesktopHeader;
