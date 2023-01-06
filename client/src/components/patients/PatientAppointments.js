import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cancelAppointmentReq, getPatientAppointmentsReq } from "../../api/Api";
import { updateAppointments, deleteAppointment } from "../../redux/features/appointmentsSlice";
import { addAvailableDate } from "../../redux/features/availableDatesSlice";
import classes from './PatientAppointments.module.css';

const PatientAppointments = () => {
  const appointments = useSelector(state => state.appointments);
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      const dates = await getPatientAppointmentsReq();
      dispatch(updateAppointments(dates));
    };
    getData();
  }, [dispatch]);

  const handleCancel = async ({ target }) => {
    const appointmentID = target.id;
    const canceledAppointment = await cancelAppointmentReq(appointmentID);
    if (canceledAppointment) {
      dispatch(deleteAppointment(appointmentID));
      dispatch(addAvailableDate(canceledAppointment));
    }
  };

  return (
    <div className={classes.container}>
      <h1 className={classes.header}>My Appointments</h1>
      {appointments && appointments.length > 0 ? <div className={classes.table}>
        <div className={classes.tableHeader}>
          <span>Date</span>
          <span>Time</span>
          <span>isOver</span>
          <span>Cancel</span>
        </div>
        {appointments && appointments.map(appointment => {
          return <div className={classes.row} key={appointment._id} >
            <span>{appointment.date}</span>
            <span>{appointment.time}</span>
            <span>{appointment.isOver.toString()}</span>
            <div><button id={appointment._id} onClick={handleCancel} >Cancel</button></div>
          </div>
        })}
      </div> : <h3>You Don't Have Any Appointments!</h3>}
    </div>
  )
}

export default PatientAppointments;