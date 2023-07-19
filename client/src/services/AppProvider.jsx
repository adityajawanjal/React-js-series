import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../main";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState();

  const fetchUsers = async () => {
    try {
      const res = await axios.get(BASE_URL);
      setUsers(res?.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <AppContext.Provider value={{ users, setUsers, user, setUser }}>
      {children}
    </AppContext.Provider>
  );
};

export const useUsers = () => {
  return useContext(AppContext);
};
export default AppProvider;
