import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from 'react';
import EditProfileModal from '../components/EditProfileModal'; // Ensure this path is correct
import { PopupProvider } from '~/components/PopUp/popupContext';

// Define the type for our context state
type EditProfileModalContextType = {
  openModal: () => void;
  closeModal: () => void;
};

// Creating our context with an undefined default value
const EditProfileModalContext = createContext<
  EditProfileModalContextType | undefined
>(undefined);

// Hook for child components to get the modal object ... and rethrow if it's not found.
export const useEditProfileModal = () => {
  const context = useContext(EditProfileModalContext);
  if (context === undefined) {
    throw new Error(
      'useEditProfileModal must be used within an EditProfileModalProvider',
    );
  }
  return context;
};

// Create a provider for components to consume and subscribe to changes
type EditProfileModalProviderProps = {
  children: ReactNode;
};

export const EditProfileModalProvider: React.FC<
  EditProfileModalProviderProps
> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Function to open the modal
  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  // Function to close the modal
  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <PopupProvider>
      <EditProfileModalContext.Provider value={{ openModal, closeModal }}>
        {children}

        {isModalOpen && <EditProfileModal />}
      </EditProfileModalContext.Provider>
    </PopupProvider>
  );
};
