import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {

  const [token , setToken] = useState();
  const [user , setUser] = useState();

  useEffect(()=>{
    const token = localStorage.getItem('token');
    const localUser = localStorage.getItem('user');
    const localSavedUser = JSON.parse(localUser);
    setToken(token);
    setUser(localSavedUser);
  },[])
  return (
    <AppContext.Provider value={{token , setToken, user , setUser}}>
      {children}
    </AppContext.Provider>
  );
};

export const useToken = () => {
  return useContext(AppContext);
};

export default AppProvider;
