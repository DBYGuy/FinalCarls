import { createContext, useContext } from 'react';

export const initContext = {
  isAuthed: false,
};

export const AuthContext = createContext(initContext);
export const useAuth = () => useContext(AuthContext);
