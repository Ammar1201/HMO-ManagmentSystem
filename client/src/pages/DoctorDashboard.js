import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import UpdateDoctorProfile from "../components/doctors/UpdateDoctorProfile";
import { getDoctorData } from "../api/Api";
import { updateDoctorAction, resetDoctor } from "../redux/features/doctorSlice";
import AvailableDates from "../components/doctors/AvailableDates";
import DoctorAppointments from "../components/doctors/DoctorAppointments";
import classes from './Dashboard.module.css';
import Welcome from "../components/Welcome";

const DoctorDashboard = () => {
  const [operation, setOperation] = useState('welcome');
  const doctor = useSelector(state => state.doctor);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const userData = async () => {
      const doctorInfo = await getDoctorData();
      if (doctorInfo.expiredAt === undefined) {
        dispatch(updateDoctorAction(doctorInfo));
        return;
      }

      navigate('/doctors/login');
    };
    userData();
  }, [dispatch, navigate]);

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
        <h1>DashBoard</h1>
      </div>
      <div className={classes.container}>
        <div className={classes.sidebar}>
          <button id="myAppointments" onClick={clickHandle}>My Appointments</button>
          <button id="availableDates" onClick={clickHandle} >Available Dates</button>
          <button id="updateProfile" onClick={clickHandle}>Update Profile</button>
          <button id="logout" onClick={clickHandle}>Logout</button>
        </div>
        <div className={classes.main}>
          {operation && operation === 'welcome' && <Welcome name={doctor?.fullName} />}
          {operation && operation === 'myAppointments' && <DoctorAppointments />}
          {operation && operation === 'availableDates' && <AvailableDates />}
          {operation && operation === 'updateProfile' && <UpdateDoctorProfile />}
        </div>
      </div>
    </div>
  )
}

export default DoctorDashboard;