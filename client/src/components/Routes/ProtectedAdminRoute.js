import { Navigate } from "react-router-dom";

const ProtectedAdminRoute = ({ children }) => {
  if (localStorage.getItem('adminLoginToken')) {
    return children;
  }
  else {
    return <Navigate to={`${process.env.REACT_APP_ADMIN_LOGIN_ROUTE}`} />
  }
}

export default ProtectedAdminRoute;