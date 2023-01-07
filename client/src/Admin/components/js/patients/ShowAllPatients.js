import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllPatientsReq } from "../../../../api/AdminApi";
import { updateAppointments } from "../../../../redux/features/appointmentsSlice";
import classes from '../../css/patients/ShowAllPatients.module.css';

const ShowAllPatients = () => {
  const patients = useSelector(state => state.appointments);
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      const patientsData = await getAllPatientsReq();
      dispatch(updateAppointments(patientsData));
    };
    getData();
  }, [dispatch]);

  return (
    <div className={classes.container}>
      <h1 className={classes.header}>All Patients</h1>
      {patients && patients.length > 0 ? <div className={classes.table}>
        <div className={classes.tableHeader}>
          <span>NO.</span>
          <span>ID</span>
          <span>Email</span>
          <span>Full Name</span>
          <span>Phone Number</span>
        </div>
        {patients && patients.map((patient, index) => {
          return <div className={classes.row} key={patient._id} >
            <span>{index + 1}</span>
            <span>{patient._id}</span>
            <span>{patient.email}</span>
            <span>{patient.fullName}</span>
            <span>{patient.phoneNumber}</span>
          </div>
        })}
      </div> : <h3>There is No Patients in The Database!</h3>}
    </div>
  )
}

export default ShowAllPatients;