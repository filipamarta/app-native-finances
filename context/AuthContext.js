import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useState } from 'react';

const defaultValues = {
  token: '',
  isAuthenticated: false,
  authenticate: (token) => {},
  logout: () => {},
};

export const AuthContext = createContext(defaultValues);

export function useAuth() {
  return useContext(AuthContext);
}

const AuthContextProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState('');
  const [authRefreshToken, setAuthRefreshToken] = useState('');

  const storeDataLocalStorage = async (token) => {
    try {
      await AsyncStorage.setItem('token', String(token));
    } catch (e) {
      console.error(
        'an error occurred while storing data in localStorage: ',
        e
      );
    }
  };

  const removeDataLocalStorage = async () => {
    try {
      await AsyncStorage.removeItem('token');
    } catch (e) {
      console.error(
        'an error occurred while removing data in localStorage: ',
        e
      );
    }
  };

  const authenticate = (token, refreshToken) => {
    setAuthToken(token);
    setAuthRefreshToken(refreshToken);
    storeDataLocalStorage(token);
  };

  const logout = () => {
    setAuthToken(null);
    removeDataLocalStorage();
  };

  return (
    <AuthContext.Provider
      value={{
        authenticate,
        logout,
        token: authToken,
        isAuthenticated: !!authToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
