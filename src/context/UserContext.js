import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [contextUserStatus, setContextUserStatus] = useState('guest');

  const updateUserStatusInContext = (status) => setContextUserStatus(status);

  return (
    <UserContext.Provider
      value={{ contextUserStatus, updateUserStatusInContext }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
