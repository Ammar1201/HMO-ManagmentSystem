import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { updateAppointments } from "../../../../redux/features/appointmentsSlice";
import { getAllAvailableAppointmentsReq } from '../../../../api/AdminApi';
import classes from '../../css/appointments/ShowAllAppointments.module.css';

const ShowAllAppointments = () => {
  const appointments = useSelector(state => state.appointments);
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      const dates = await getAllAvailableAppointmentsReq();
      dispatch(updateAppointments(dates));
    };
    getData();
  }, [dispatch]);

  return (
    <div className={classes.container}>
      <h1 className={classes.header}>All Appointments</h1>
      {appointments && appointments.length > 0 ? <div className={classes.table}>
        <div className={classes.tableHeader}>
          <span className={classes.first}>No.</span>
          <span className={classes.small}>Date</span>
          <span className={classes.small}>Time</span>
          <span className={classes.big}>Doctor ID</span>
          <span className={classes.big}>Patient ID</span>
          <span className={classes.small}>Assigned</span>
          <span className={classes.small}>Expired</span>
        </div>
        {appointments && appointments.map((appointment, index) => {
          return <div className={classes.row} key={appointment._id} >
            <span className={classes.first}>{index + 1}</span>
            <span className={classes.small}>{appointment.date}</span>
            <span className={classes.small}>{appointment.time}</span>
            <span className={classes.big}>{appointment.doctorID}</span>
            <span className={classes.big}>{appointment.patientID._id}</span>
            <span className={classes.small}>{appointment.isAssigned ? 'V' : 'X'}</span>
            <span className={classes.small}>{appointment.isOver ? 'V' : 'X'}</span>
          </div>
        })}
      </div> : <h3>There is No Appointments in The Database!</h3>}
    </div>
  )
}

export default ShowAllAppointments;