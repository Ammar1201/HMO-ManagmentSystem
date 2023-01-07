import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './AdminDashboard.module.css';
import AddDoctor from './components/js/doctors/AddDoctor';
import DeleteDoctor from './components/js/doctors/DeleteDoctor';
import ShowAllDoctors from './components/js/doctors/ShowAllDoctors';
import ShowSpecificDoctor from './components/js/doctors/ShowSpecificDoctor';
import UpdateDoctor from './components/js/doctors/UpdateDoctor';
import AddPatient from './components/js/patients/AddPatient';
import DeletePatient from './components/js/patients/DeletePatient';
import ShowAllPatients from './components/js/patients/ShowAllPatients';
import ShowSpecificPatient from './components/js/patients/ShowSpecificPatient';
import UpdatePatient from './components/js/patients/UpdatePatient';

const AdminDashboard = () => {
  const [operation, setOperation] = useState('welcome');

  const navigate = useNavigate();

  const clickHandle = ({ target }) => {
    switch (target.id) {
      case 'addPatient':
        setOperation('addPatient');
        break;
      case 'showAllPatients':
        setOperation('showAllPatients');
        break;
      case 'updatePatient':
        setOperation('updatePatient');
        break;
      case 'showSpecificPatient':
        setOperation('showSpecificPatient');
        break;
      case 'deletePatient':
        setOperation('deletePatient');
        break;
      case 'addDoctor':
        setOperation('addDoctor');
        break;
      case 'showAllDoctors':
        setOperation('showAllDoctors');
        break;
      case 'updateDoctor':
        setOperation('updateDoctor');
        break;
      case 'showSpecificDoctor':
        setOperation('showSpecificDoctor');
        break;
      case 'deleteDoctor':
        setOperation('deleteDoctor');
        break;
      case 'showAllAppointments':
        setOperation('showAllAppointments');
        break;
      case 'showAllAvailableDates':
        setOperation('showAllAvailableDates');
        break;
      case 'showSpecificAppointment':
        setOperation('showSpecificAppointment');
        break;
      case 'showSpecificAvailableDate':
        setOperation('showSpecificAvailableDate');
        break;
      case 'logout':
        localStorage.removeItem('adminLoginToken');
        navigate('/hmo/health/management/admin/login');
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <div className={classes.header}>
        <h1>Admin Dash Board</h1>
      </div>
      <div className={classes.container}>
        <div className={classes.sidebar}>
          <button id="addPatient" onClick={clickHandle}>Add Patient</button>
          <button id="showAllPatients" onClick={clickHandle}>Show All Patients</button>
          <button id="updatePatient" onClick={clickHandle} >Update Patient</button>
          <button id="showSpecificPatient" onClick={clickHandle}>Show Specific Patient</button>
          <button id="deletePatient" onClick={clickHandle}>Delete Patient</button>
          <hr />
          <button id="addDoctor" onClick={clickHandle}>Add Doctor</button>
          <button id="showAllDoctors" onClick={clickHandle}>Show All Doctors</button>
          <button id="updateDoctor" onClick={clickHandle}>Update Doctor</button>
          <button id="showSpecificDoctor" onClick={clickHandle}>Show Specific Doctor</button>
          <button id="deleteDoctor" onClick={clickHandle}>Delete Doctor</button>
          <hr />
          <button id="showAllAppointments" onClick={clickHandle}>Show All Appointments</button>
          <button id="showAllAvailableDates" onClick={clickHandle}>Show All Available Dates</button>
          {/* <button id="showSpecificAppointment" onClick={clickHandle}>showSpecificAppointment</button> */}
          {/* <button id="showSpecificAvailableDate" onClick={clickHandle}>showSpecificAvailableDate</button> */}
          <hr />
          <button id="logout" onClick={clickHandle}>Logout</button>
        </div>
        <div className={classes.main}>
          {operation && operation === 'welcome' && <h1>Welcome Back, Admin</h1>}
          {/* ------------------------------------------------------------------------------------------------*/}
          {operation && operation === 'addPatient' && <AddPatient />}
          {operation && operation === 'updatePatient' && <UpdatePatient />}
          {operation && operation === 'showAllPatients' && <ShowAllPatients />}
          {operation && operation === 'showSpecificPatient' && <ShowSpecificPatient />}
          {operation && operation === 'deletePatient' && <DeletePatient />}
          {/* ------------------------------------------------------------------------------------------------*/}
          {operation && operation === 'addDoctor' && <AddDoctor />}
          {operation && operation === 'showAllDoctors' && <ShowAllDoctors />}
          {operation && operation === 'updateDoctor' && <UpdateDoctor />}
          {operation && operation === 'showSpecificDoctor' && <ShowSpecificDoctor />}
          {operation && operation === 'deleteDoctor' && <DeleteDoctor />}
          {/* ------------------------------------------------------------------------------------------------*/}
          {operation && operation === 'showAllAppointments' && <h1>showAllAppointments</h1>}
          {operation && operation === 'showAllAvailableDates' && <h1>showAllAvailableDates</h1>}
          {/* {operation && operation === 'showSpecificAppointment' && <h1>showSpecificAppointment</h1>} */}
          {/* {operation && operation === 'showSpecificAvailableDate' && <h1>showSpecificAvailableDate</h1>} */}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard;