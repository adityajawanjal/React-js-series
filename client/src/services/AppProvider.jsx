import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  // const [name , setUsers] = useState([]);
  const [user, setUser] = useState();

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/users`);
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
