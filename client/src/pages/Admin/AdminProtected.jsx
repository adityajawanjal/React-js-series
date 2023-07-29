import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useToken } from "../../services/AppProvider";
import { AdminProtectedApi } from "../../services/api";
import Spinner from "../../components/Spinner";

const AdminProtected = () => {
  const { token, user } = useToken();
  const [isAdmin, setIsAdmin] = useState(false);

  const AdminCheck = async () => {
    const res = await AdminProtectedApi();
    if (res.admin === true) {
      setIsAdmin(true);
    }
  };

  useEffect(() => {
    if (token && user) {
      AdminCheck();
    }
  }, [token , localStorage]);

  return isAdmin ? <Outlet /> : <Spinner/>
};

export default AdminProtected;
