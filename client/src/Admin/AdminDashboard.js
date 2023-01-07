import { useState } from 'react';
import classes from './AdminDashboard.module.css';
import AddDoctor from './components/js/doctors/AddDoctor';
import AddPatient from './components/js/patients/AddPatient';

const AdminDashboard = () => {
  const [operation, setOperation] = useState('welcome');

  const clickHandle = ({ target }) => {
    switch (target.id) {
      case 'addPatient':
        setOperation('addPatient');
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
          <button id="addPatient" onClick={clickHandle}>addPatient</button>
          <button id="updatePatient" onClick={clickHandle} >updatePatient</button>
          <button id="showSpecificPatient" onClick={clickHandle}>showSpecificPatient</button>
          <button id="deletePatient" onClick={clickHandle}>deletePatient</button>
          <hr />
          <button id="addDoctor" onClick={clickHandle}>addDoctor</button>
          <button id="updateDoctor" onClick={clickHandle}>updateDoctor</button>
          <button id="showSpecificDoctor" onClick={clickHandle}>showSpecificDoctor</button>
          <button id="deleteDoctor" onClick={clickHandle}>deleteDoctor</button>
          <hr />
          <button id="showAllAppointments" onClick={clickHandle}>showAllAppointments</button>
          <button id="showAllAvailableDates" onClick={clickHandle}>showAllAvailableDates</button>
          <button id="showSpecificAppointment" onClick={clickHandle}>showSpecificAppointment</button>
          <button id="showSpecificAvailableDate" onClick={clickHandle}>showSpecificAvailableDate</button>
          <hr />
          <button id="logout" onClick={clickHandle}>Logout</button>
        </div>
        <div className={classes.main}>
          {operation && operation === 'welcome' && <h1>Welcome Back, Admin</h1>}
          {/* ------------------------------------------------------------------------------------------------*/}
          {operation && operation === 'addPatient' && <AddPatient />}
          {operation && operation === 'updatePatient' && <h1>updatePatient</h1>}
          {operation && operation === 'showSpecificPatient' && <h1>showSpecificPatient</h1>}
          {operation && operation === 'deletePatient' && <h1>deletePatient</h1>}
          {/* ------------------------------------------------------------------------------------------------*/}
          {operation && operation === 'addDoctor' && <AddDoctor />}
          {operation && operation === 'updateDoctor' && <h1>updateDoctor</h1>}
          {operation && operation === 'showSpecificDoctor' && <h1>showSpecificDoctor</h1>}
          {operation && operation === 'deleteDoctor' && <h1>deleteDoctor</h1>}
          {/* ------------------------------------------------------------------------------------------------*/}
          {operation && operation === 'showAllAppointments' && <h1>showAllAppointments</h1>}
          {operation && operation === 'showAllAvailableDates' && <h1>showAllAvailableDates</h1>}
          {operation && operation === 'showSpecificAppointment' && <h1>showSpecificAppointment</h1>}
          {operation && operation === 'showSpecificAvailableDate' && <h1>showSpecificAvailableDate</h1>}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard;