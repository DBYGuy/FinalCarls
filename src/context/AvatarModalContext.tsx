import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from 'react';
import AvatarSelectionModal from '~/components/AvatarSelectionModal';
import { NftProps } from '~/hooks/useTigerNfts';

type AvatarModalContextType = {
  showAvatarModal: () => void;
  hideAvatarModal: () => void;
  selectedAvatar: NftProps | null;
  setSelectedAvatar: (nft: NftProps | null) => void;
};

const AvatarModalContext = createContext<AvatarModalContextType | undefined>(
  undefined,
);

export const useAvatarModal = () => {
  const context = useContext(AvatarModalContext);
  if (!context) {
    throw new Error('useAvatarModal must be used within a AvatarModalProvider');
  }
  return context;
};

type AvatarModalProviderProps = {
  children: ReactNode;
};

export const AvatarModalProvider: React.FC<AvatarModalProviderProps> = ({
  children,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState<NftProps | null>(null);

  const showAvatarModal = useCallback(() => {
    setIsVisible(true);
  }, []);

  const hideAvatarModal = useCallback(() => {
    setIsVisible(false);
  }, []);

  return (
    <AvatarModalContext.Provider
      value={{
        showAvatarModal,
        hideAvatarModal,
        selectedAvatar,
        setSelectedAvatar,
      }}
    >
      {children}
      {isVisible && <AvatarSelectionModal onClose={hideAvatarModal} />}
    </AvatarModalContext.Provider>
  );
};
