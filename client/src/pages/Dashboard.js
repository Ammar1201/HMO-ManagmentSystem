import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { verifyTokenRequest } from "../api/Api";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (user && (user.token !== undefined || user.token !== null)) {
      const verifyUserReq = async () => {
        const verified = await verifyTokenRequest(user.token, user.email);
        if (verified === 'unauthorized') {
          navigate('/login');
        }
      };
      verifyUserReq();
    }
    else {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <>
      <div>Dashboard</div>
    </>
  )
}

export default Dashboard;