import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { updateAvailableDates } from "../../../../redux/features/availableDatesSlice";
import { getAllAvailableDatesReq } from '../../../../api/AdminApi';
import classes from '../../css/appointments/ShowAllAvailableDates.module.css';

const ShowAllAvailableDates = () => {
  const availableDates = useSelector(state => state.availableDates);
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      const availableDatesData = await getAllAvailableDatesReq();
      dispatch(updateAvailableDates(availableDatesData));
    };
    getData();
  }, [dispatch]);

  return (
    <div className={classes.container}>
      <h1 className={classes.header}>All Available Dates</h1>
      {availableDates && availableDates.length > 0 ? <div className={classes.table}>
        <div className={classes.tableHeader}>
          <span className={classes.first}>NO.</span>
          <span>Date</span>
          <span>Time</span>
          <span>Doctor Name</span>
          <span>Doctor Specialization</span>
          <span>Branch</span>
          <span>Assigned</span>
          <span>Expired</span>
        </div>
        {availableDates && availableDates.map((availableDate, index) => {
          return <div className={classes.row} key={availableDate._id} >
            <span className={classes.first}>{index + 1}</span>
            <span>{availableDate.date}</span>
            <span>{availableDate.time}</span>
            <span>{availableDate.doctorID.fullName}</span>
            <span>{availableDate.doctorID.specialization}</span>
            <span>{availableDate.doctorID.branch}</span>
            <span>{availableDate.isAssigned ? 'V' : 'X'}</span>
            <span>{availableDate.isOver ? 'V' : 'X'}</span>
          </div>
        })}
      </div> : <h3>There is No Available Dates in The Database!</h3>}
    </div>
  )
}

export default ShowAllAvailableDates;