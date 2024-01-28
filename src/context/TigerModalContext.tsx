import React, { createContext, useContext, useState, ReactNode } from 'react';

interface TigerModalContextType {
  isTigerModalOpen: boolean;
  openTigerModal: (userId: string) => void;
  closeTigerModal: () => void;
  userId: string | null;
}

const TigerModalContext = createContext<TigerModalContextType | undefined>(
  undefined,
);

export const TigerModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isTigerModalOpen, setIsTigerModalOpen] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  const openTigerModal = (userId: string) => {
    setUserId(userId);
    setIsTigerModalOpen(true);
  };

  const closeTigerModal = () => {
    setIsTigerModalOpen(false);
    setUserId(null);
  };

  return (
    <TigerModalContext.Provider
      value={{ isTigerModalOpen, openTigerModal, closeTigerModal, userId }}
    >
      {children}
    </TigerModalContext.Provider>
  );
};

export const useTigerModal = () => {
  const context = useContext(TigerModalContext);
  if (!context) {
    throw new Error('useTigerModal must be used within a TigerModalProvider');
  }
  return context;
};
