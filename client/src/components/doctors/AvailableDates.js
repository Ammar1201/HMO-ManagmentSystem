import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addNewAvailableDateReq, deleteAvailableDateReq, getDoctorAvailability } from "../../api/Api";
import { addAvailableDate, updateAvailableDates, deleteAvailableDate } from "../../redux/features/availableDatesSlice";
import classes from './AvailableDates.module.css';

const AvailableDates = () => {
  const [showAdd, setShowAdd] = useState(false);
  const availableDates = useSelector(state => state.availableDates);
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      const dates = await getDoctorAvailability();
      dispatch(updateAvailableDates(dates));
    };
    getData();
  }, [dispatch]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { date, time } = event.target.elements;
    const newDate = {
      date: date.value,
      time: time.value
    }

    const available = await addNewAvailableDateReq(newDate);
    if (available) {
      dispatch(addAvailableDate(available));
    }
  };

  const handleDelete = async ({ target }) => {
    const appointmentID = target.id;
    const deletedAppointment = await deleteAvailableDateReq(appointmentID);
    if (deletedAppointment.acknowledged) {
      dispatch(deleteAvailableDate(appointmentID))
    }
  };

  return (
    <div className={classes.container}>
      <h1 className={classes.header}>Available Dates</h1>
      <button onClick={() => { setShowAdd(prevState => !prevState) }} >Add New Available Date</button>
      {showAdd && <form className={classes.form} onSubmit={handleSubmit}>
        <div className={classes.formGroup} >
          <label htmlFor="date">Choose Date:</label>
          <input type="date" name="date" />
        </div>
        <div className={classes.formGroup} >
          <label htmlFor="time">Choose Time:</label>
          <input type="time" name="time" />
        </div>
        <input type="submit" value='Add' />
      </form>}
      {availableDates && availableDates.length > 0 ? <div className={classes.table}>
        <div className={classes.tableHeader}>
          <span>Date</span>
          <span>Time</span>
          <span>isOver</span>
          <span>isAssigned</span>
          <span>Delete</span>
        </div>
        {availableDates && availableDates.map(availableDate => {
          return <div className={classes.row} key={availableDate._id} >
            <span>{availableDate.date}</span>
            <span>{availableDate.time}</span>
            <span>{availableDate.isOver.toString()}</span>
            <span>{availableDate.isAssigned.toString()}</span>
            <div><button id={availableDate._id} onClick={handleDelete} >Delete</button></div>
          </div>
        })}
      </div> : <h3>You Didn't Add Any Available Dates!</h3>}
    </div>
  )
}

export default AvailableDates;