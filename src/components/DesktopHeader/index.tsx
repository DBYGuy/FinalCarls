import type { NextPage } from 'next';
import Container from '../container';
import { useIsAuthenticated } from '../../hooks/useIsAuthenticated';

const DesktopHeader: NextPage = () => {
  const isAuthenticated = useIsAuthenticated();
  return (
    <div className="relative rounded-[5px] box-border w-full overflow-hidden ">
      {isAuthenticated ? <Container propTop="16px" /> : <Container />}
    </div>
  );
};

export default DesktopHeader;
