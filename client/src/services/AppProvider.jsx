import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {

  const [token , setToken] = useState();
  const [user , setUser] = useState();

  const [cartItems , setCartItems] = useState([]);

  useEffect(()=>{
    const token = localStorage.getItem('token');
    const localUser = localStorage.getItem('user');
    const allItems = localStorage.getItem('cart');
    const cart = allItems ? JSON.parse(allItems) :'';
    const localSavedUser = JSON.parse(localUser);
    setToken(token);
    setUser(localSavedUser);
    setCartItems(cart);
  },[])
  return (
    <AppContext.Provider value={{token , setToken, user , setUser , cartItems , setCartItems}}>
      {children}
    </AppContext.Provider>
  );
};

export const useToken = () => {
  return useContext(AppContext);
};
export const useCart = () => {
  return useContext(AppContext);
};

export default AppProvider;
