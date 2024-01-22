import type { NextPage } from 'next';
import { useConnectModal } from '@rainbow-me/rainbowkit';

const Button: NextPage = () => {
  const { openConnectModal } = useConnectModal();

  return (
    <button
      onClick={openConnectModal}
      type="button"
      className="rounded-xl bg-gradient-to-r from-gold-start via-gold-end to-gold-start shadow-lg h-10 flex items-center justify-center px-4 text-black text-base font-semibold animate-gradientConnect cursor-pointer"
    >
      Connect Wallet
    </button>
  );
};

export default Button;
