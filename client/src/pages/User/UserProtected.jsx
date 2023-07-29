import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useToken } from "../../services/AppProvider";
import { UserProtectedApi } from "../../services/api";
import Spinner from "../../components/Spinner";

const UserProtected = () => {
  const { token, user } = useToken();
  const [isUser, setIsUser] = useState(false);

  const UserCheck = async () => {
    const res = await UserProtectedApi();
    if (res.user === true) {
      setIsUser(true);
    }
  };

  useEffect(() => {
    if (token && user) {
      UserCheck();
    }
  }, [token , localStorage]);

  return isUser ? <Outlet /> : <Spinner/>
};

export default UserProtected;
