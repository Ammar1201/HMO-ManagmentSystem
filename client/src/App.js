import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PublicRoute from "./components/Routes/PublicRoute";
import ProtectedRoute from "./components/Routes/ProtectedRoute";
import DoctorDashboard from "./pages/DoctorDashboard";
import AdminLogin from "./Admin/AdminLogin";
import AdminDashboard from "./Admin/AdminDashboard";
// import Header from "./components/Header";

console.log(process.env.REACT_APP_ADMIN_ROUTE);

const App = () => {
  return (
    <div>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/patients/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/doctors/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/patients/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/doctors/dashboard" element={<ProtectedRoute><DoctorDashboard /></ProtectedRoute>} />
        <Route path='/hmo/health/management/admin/login' element={<AdminLogin />} />
        <Route path='/hmo/health/management/admin/dashboard' element={<AdminDashboard />} />
      </Routes>
    </div>
  );
}

export default App;