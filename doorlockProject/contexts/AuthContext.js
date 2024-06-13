import React, {createContext, useContext, useState} from 'react';

const AuthContext = createContext();

export function AuthProvider({children}) {
  const [loginCheck, setLoginCheck] = useState(false);
  const [idText, setIdText] = useState('');

  return (
    <AuthContext.Provider
      value={{
        loginCheck,
        setLoginCheck,
        idText,
        setIdText,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
