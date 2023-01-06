import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDoctorAppointmentsReq } from "../../api/Api";
import { updateAppointments } from "../../redux/features/appointmentsSlice";
import classes from './DoctorAppointments.module.css';

const DoctorAppointments = () => {
  const appointments = useSelector(state => state.appointments);
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      const dates = await getDoctorAppointmentsReq();
      dispatch(updateAppointments(dates));
    };
    getData();
  }, [dispatch]);

  return (
    <div className={classes.container}>
      <h1 className={classes.header}>My Appointments</h1>
      {appointments && appointments.length > 0 ? <div className={classes.table}>
        <div className={classes.tableHeader}>
          <span>No.</span>
          <span>Date</span>
          <span>Time</span>
          <span>Patient Name</span>
          <span>Assigned</span>
          <span>Expired</span>
        </div>
        {appointments && appointments.map((availableDate, index) => {
          return <div className={classes.row} key={availableDate._id} >
            <span>{index + 1}</span>
            <span>{availableDate.date}</span>
            <span>{availableDate.time}</span>
            <span>{availableDate.patientID.fullName}</span>
            <span>{availableDate.isAssigned ? 'V' : 'X'}</span>
            <span>{availableDate.isOver ? 'V' : 'X'}</span>
          </div>
        })}
      </div> : <h3>You Don't Have Any Appointments!</h3>}
    </div>
  )
}

export default DoctorAppointments;