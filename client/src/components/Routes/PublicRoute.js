import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  if (localStorage.getItem('patientToken')) {
    return <Navigate to='/patients/dashboard' />
  }
  else if (localStorage.getItem('doctorToken')) {
    return <Navigate to='/doctors/dashboard' />
  }
  else {
    return children;
  }
}

export default PublicRoute;