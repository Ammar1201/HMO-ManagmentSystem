import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  if (localStorage.getItem('patientToken') || localStorage.getItem('doctorToken')) {
    return children;
  }
  else {
    return <Navigate to='/patients/login' />
  }
}

export default ProtectedRoute;