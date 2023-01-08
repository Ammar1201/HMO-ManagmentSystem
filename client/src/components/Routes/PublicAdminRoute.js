import { Navigate } from "react-router-dom";

const PublicAdminRoute = ({ children }) => {
  if (localStorage.getItem('adminLoginToken')) {
    return <Navigate to={`${process.env.REACT_APP_ADMIN_LOGIN_ROUTE}`} />
  }
  else {
    return children;
  }
}

export default PublicAdminRoute;