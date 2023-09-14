// Libraries
import { Navigate, Outlet } from "react-router-dom";

// context
import { UserContext } from "../../context/User";

// react
import { useContext } from "react";
import useTokenLocalStorage from "../../hooks/user/useTokenLocalStorage ";

function ProtectedRoute({ children, redirectTo = "/" }) {
  const { getToken } = useTokenLocalStorage("userToken");

  const token = getToken();

  if (!token) {
    return <Navigate to={redirectTo} />;
  }
  return children ? children : <Outlet />;
}

export default ProtectedRoute;
