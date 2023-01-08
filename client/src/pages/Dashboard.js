import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updatePatient, resetPatient } from "../redux/features/patientSlice";
import { getPatientData } from "../api/Api";
import UpdatePatientProfile from "../components/patients/UpdatePatientProfile";
import classes from './Dashboard.module.css';
import PatientAppointments from "../components/patients/PatientAppointments";
import BookAppointment from "../components/patients/BookAppointment";
import Welcome from "../components/Welcome";

const Dashboard = () => {
  const [operation, setOperation] = useState('welcome');
  const patient = useSelector(state => state.patient);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const userData = async () => {
      const patientInfo = await getPatientData();
      patientInfo.appointments = patientInfo.appointments || [];
      if (patientInfo.expiredAt === undefined) {
        dispatch(updatePatient(patientInfo));
        return;
      }

      navigate('/patients/login');
    };
    userData();
  }, [dispatch, navigate]);

  const clickHandle = ({ target }) => {
    switch (target.id) {
      case 'welcome':
        setOperation('welcome');
        break;
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
        localStorage.removeItem('patientToken');
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
        <h1>DashBoard</h1>
      </div>
      <div className={classes.container}>
        <div className={classes.sidebar}>
          <button id="welcome" onClick={clickHandle}>Welcome</button>
          <button id="myAppointments" onClick={clickHandle}>My Appointments</button>
          <button id="newAppointment" onClick={clickHandle} >New Appointment</button>
          <button id="updateProfile" onClick={clickHandle}>Update Profile</button>
          <button id="logout" onClick={clickHandle}>Logout</button>
        </div>
        <div className={classes.main}>
          {operation && operation === 'welcome' && <Welcome name={patient?.fullName} />}
          {operation && operation === 'myAppointments' && <PatientAppointments />}
          {operation && operation === 'newAppointment' && <BookAppointment />}
          {operation && operation === 'updateProfile' && <UpdatePatientProfile />}
        </div>
      </div>
    </div>
  )
}

export default Dashboard;