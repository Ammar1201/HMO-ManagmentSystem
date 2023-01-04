import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifyTokenRequest } from "../api/Api";
import classes from './Dashboard.module.css';

const Dashboard = () => {
  const [operation, setOperation] = useState('');
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

  const clickHandle = ({ target }) => {
    switch (target.id) {
      case 'newAppointment':
        setOperation('newAppointment');
        break;
      case 'myAppointments':
        setOperation('myAppointments');
        break;
      case 'updateProfile':
        setOperation('updateProfile');
        break;
      case 'logout':
        sessionStorage.removeItem('user');
        navigate('/');
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <div className={classes.header}>
        <h1>Dash Board</h1>
      </div>
      <div className={classes.container}>
        <div className={classes.sidebar}>
          <button id="newAppointment" onClick={clickHandle} >New Appointment</button>
          <button id="myAppointments" onClick={clickHandle}>My Appointments</button>
          <button id="updateProfile" onClick={clickHandle}>Update Profile</button>
          <button id="logout" onClick={clickHandle}>Logout</button>
        </div>
        <div className={classes.main}>
          {operation && operation === 'newAppointment' && <h1>New Appointment</h1>}
          {operation && operation === 'myAppointments' && <h1>My Appointments</h1>}
          {operation && operation === 'updateProfile' && <h1>Update Profile</h1>}
        </div>
      </div>
    </div>
  )
}

export default Dashboard;