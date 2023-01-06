import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { bookNewAppointmentReq, getAllAvailableAppointmentsReq } from "../../api/Api";
import { addAppointment } from "../../redux/features/appointmentsSlice";
import { deleteAvailableDate, updateAvailableDates } from "../../redux/features/availableDatesSlice";
import classes from './BookAppointment.module.css';

const BookAppointment = () => {
  const availableDates = useSelector(state => state.availableDates);
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      const dates = await getAllAvailableAppointmentsReq();
      dispatch(updateAvailableDates(dates));
    };
    getData();
  }, [dispatch]);

  const handleBooking = async ({ target }) => {
    const appointmentID = target.id;

    const newAppointment = await bookNewAppointmentReq(appointmentID);
    if (newAppointment) {
      dispatch(addAppointment(newAppointment));
      dispatch(deleteAvailableDate(newAppointment._id));
    }
  };

  return (
    <div className={classes.container}>
      <h1 className={classes.header}>All Available Appointments</h1>
      {availableDates && availableDates.length > 0 ? <div className={classes.table}>
        <div className={classes.tableHeader}>
          <span>Date</span>
          <span>Time</span>
          <span>Doctor Name</span>
          <span>Doctor Specialization</span>
          <span>Branch</span>
          <span>Book</span>
        </div>
        {availableDates && availableDates.map(appointment => {
          return <div className={classes.row} key={appointment._id} >
            <span>{appointment.date}</span>
            <span>{appointment.time}</span>
            <span>{appointment.doctorID.fullName}</span>
            <span>{appointment.doctorID.specialization}</span>
            <span>{appointment.doctorID.branch}</span>
            <div><button id={appointment._id} onClick={handleBooking} >Book</button></div>
          </div>
        })}
      </div> : <h3>No Available Appointments At The Moment!</h3>}
    </div>
  )
}

export default BookAppointment;