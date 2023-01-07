import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllDoctorsReq } from "../../../../api/AdminApi";
import { updateAppointments } from "../../../../redux/features/appointmentsSlice";
import classes from '../../css/doctors/ShowAllDoctors.module.css';

const ShowAllDoctors = () => {
  const doctors = useSelector(state => state.appointments);
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      const doctorsData = await getAllDoctorsReq();
      dispatch(updateAppointments(doctorsData));
    };
    getData();
  }, [dispatch]);

  return (
    <div className={classes.container}>
      <h1 className={classes.header}>All Doctors</h1>
      {doctors && doctors.length > 0 ? <div className={classes.table}>
        <div className={classes.tableHeader}>
          <span>NO.</span>
          <span>ID</span>
          <span>Email</span>
          <span>Full Name</span>
          <span>Specialization</span>
          <span>Branch</span>
          <span>Phone Number</span>
        </div>
        {doctors && doctors.map((doctor, index) => {
          return <div className={classes.row} key={doctor._id} >
            <span>{index + 1}</span>
            <span>{doctor._id}</span>
            <span>{doctor.email}</span>
            <span>{doctor.fullName}</span>
            <span>{doctor.specialization}</span>
            <span>{doctor.branch}</span>
            <span>{doctor.phoneNumber}</span>
          </div>
        })}
      </div> : <h3>There is No Patients in The Database!</h3>}
    </div>
  )
}

export default ShowAllDoctors