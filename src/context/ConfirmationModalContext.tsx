// context/ConfirmationModalContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from 'react';
import ConfirmationModal from '~/components/ConfirmationModal';

type ConfirmationModalContextType = {
  showConfirmation: (text: string, onConfirm: () => void) => void;
  hideConfirmation: () => void;
};

const ConfirmationModalContext = createContext<
  ConfirmationModalContextType | undefined
>(undefined);

export const useConfirmationModal = () => {
  const context = useContext(ConfirmationModalContext);
  if (!context) {
    throw new Error(
      'useConfirmationModal must be used within a ConfirmationModalProvider',
    );
  }
  return context;
};

type ConfirmationModalProviderProps = {
  children: ReactNode;
};

export const ConfirmationModalProvider: React.FC<
  ConfirmationModalProviderProps
> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [text, setText] = useState('');
  // Initialize onConfirm as a function that does nothing
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const [onConfirm, setOnConfirm] = useState<() => void>(() => {});

  const showConfirmation = useCallback(
    (newText: string, newOnConfirm: () => void) => {
      setText(newText);
      setOnConfirm(() => newOnConfirm); // Update onConfirm with the new function
      setIsVisible(true);
    },
    [],
  );

  const hideConfirmation = useCallback(() => {
    setIsVisible(false);
  }, []);

  return (
    <ConfirmationModalContext.Provider
      value={{ showConfirmation, hideConfirmation }}
    >
      {children}
      {isVisible && (
        <ConfirmationModal
          text={text}
          onConfirm={() => {
            onConfirm(); // Invoke the onConfirm function
            hideConfirmation(); // Hide the modal after confirmation
          }}
          onClose={hideConfirmation}
        />
      )}
    </ConfirmationModalContext.Provider>
  );
};
