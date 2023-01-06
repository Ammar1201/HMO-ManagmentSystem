import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import UpdateDoctorProfile from "../components/doctors/UpdateDoctorProfile";
import { resetDoctor } from "../redux/features/doctorSlice";
import classes from './Dashboard.module.css';

const DoctorDashboard = () => {
  const [operation, setOperation] = useState('welcome');
  const doctor = useSelector(state => state.doctor);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const clickHandle = ({ target }) => {
    switch (target.id) {
      case 'availableDates':
        setOperation('availableDates');
        break;
      case 'myAppointments':
        setOperation('myAppointments');
        break;
      case 'updateProfile':
        setOperation('updateProfile');
        break;
      case 'logout':
        localStorage.removeItem('doctorToken');
        localStorage.removeItem('patientToken');
        dispatch(resetDoctor())
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
          <button id="availableDates" onClick={clickHandle} >Available Dates</button>
          <button id="updateProfile" onClick={clickHandle}>Update Profile</button>
          <button id="logout" onClick={clickHandle}>Logout</button>
        </div>
        <div className={classes.main}>
          {operation && operation === 'welcome' && <h1>Welcome Back, {doctor?.fullName}</h1>}
          {operation && operation === 'myAppointments' && <h1>My Appointments</h1>}
          {operation && operation === 'availableDates' && <h1>Available Dates</h1>}
          {operation && operation === 'updateProfile' && <UpdateDoctorProfile />}
        </div>
      </div>
    </div>
  )
}

export default DoctorDashboard;