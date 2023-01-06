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
          <span>Date</span>
          <span>Time</span>
          <span>isOver</span>
          <span>isAssigned</span>
        </div>
        {appointments && appointments.map(availableDate => {
          return <div className={classes.row} key={availableDate._id} >
            <span>{availableDate.date}</span>
            <span>{availableDate.time}</span>
            <span>{availableDate.isOver.toString()}</span>
            <span>{availableDate.isAssigned.toString()}</span>
          </div>
        })}
      </div> : <h3>You Don't Have Any Appointments!</h3>}
    </div>
  )
}

export default DoctorAppointments;