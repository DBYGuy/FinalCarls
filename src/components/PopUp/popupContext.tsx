import React, { createContext, useContext, useState, ReactNode } from 'react';
import PopUp from './PopUp';

type PopupContextType = {
  showPopup: (
    mainText: string,
    subtitle: string,
    content: string | number,
  ) => void;
  hidePopup: () => void;
};

const PopupContext = createContext<PopupContextType | undefined>(undefined);

export const usePopup = () => {
  const context = useContext(PopupContext);
  if (!context) {
    throw new Error('usePopup must be used within a PopupProvider');
  }
  return context;
};

export const PopupProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [popupContent, setPopupContent] = useState<{
    mainText: string;
    subtitle: string;
    content: string | number;
  } | null>(null);

  const showPopup = (
    mainText: string,
    subtitle: string,
    content: string | number,
  ) => {
    setPopupContent({ mainText, subtitle, content });
    setPopupVisible(true);
  };

  const hidePopup = () => {
    setPopupVisible(false);
    setPopupContent(null);
  };

  return (
    <PopupContext.Provider value={{ showPopup, hidePopup }}>
      {children}
      {isPopupVisible && popupContent && (
        <PopUp
          mainText={popupContent.mainText}
          subtitle={popupContent.subtitle}
          content={popupContent.content}
          onClose={hidePopup}
        />
      )}
    </PopupContext.Provider>
  );
};
