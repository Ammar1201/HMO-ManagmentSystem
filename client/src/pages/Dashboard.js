import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetPatient } from "../redux/features/patientSlice";
import UpdatePatientProfile from "../components/patients/UpdatePatientProfile";
import classes from './Dashboard.module.css';

const Dashboard = () => {
  const [operation, setOperation] = useState('welcome');
  const patient = useSelector(state => state.patient);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
        localStorage.removeItem('token');
        dispatch(resetPatient())
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
          <button id="myAppointments" onClick={clickHandle}>My Appointments</button>
          <button id="newAppointment" onClick={clickHandle} >New Appointment</button>
          <button id="updateProfile" onClick={clickHandle}>Update Profile</button>
          <button id="logout" onClick={clickHandle}>Logout</button>
        </div>
        <div className={classes.main}>
          {operation && operation === 'welcome' && <h1>Welcome Back, {patient?.fullName}</h1>}
          {operation && operation === 'myAppointments' && <h1>My Appointments</h1>}
          {operation && operation === 'newAppointment' && <h1>New Appointment</h1>}
          {operation && operation === 'updateProfile' && <UpdatePatientProfile />}
        </div>
      </div>
    </div>
  )
}

export default Dashboard;