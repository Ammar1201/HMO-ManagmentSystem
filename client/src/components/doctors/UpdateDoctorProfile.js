import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateDoctor } from '../../redux/features/doctorSlice';
import { updateDoctorInfoReq } from '../../api/Api';
import classes from './UpdateDoctorProfile.module.css';

const UpdateDoctorProfile = () => {
  const [message, setMessage] = useState('');

  const doctor = useSelector(state => state.doctor);
  const dispatch = useDispatch();


  const handleUpdateDoctor = async (event) => {
    event.preventDefault();
    const { email, password, fullName, phoneNumber, specialization, workCity } = event.target.elements;;
    const profile = {
      email: email.value || doctor.email,
      password: password.value,
      fullName: fullName.value || doctor.fullName,
      phoneNumber: phoneNumber.value || doctor.phoneNumber,
      specialization: specialization.value || doctor.specialization,
      workCity: workCity.value || doctor.workCity
    }

    try {
      //TODO add updateDoctorInfoRequest
      const updatedDoctor = await updateDoctorInfoReq(profile);
      console.log(updatedDoctor);
      if (updatedDoctor) {
        dispatch(updateDoctor(profile));
        // window.location.reload();
      }
    }
    catch (error) {
      console.log(error);
    }
  };

  const handleFocus = () => {
    if (message.trim().length !== 0) {
      setMessage('');
    }
  };

  return (
    <div className={classes.container}>
      <h1>Update Profile</h1>
      <form className={classes.form} onSubmit={handleUpdateDoctor}>
        <div className={classes.formGroup}>
          <label>Email:</label>
          <input id='email' name='email' type="text" placeholder={doctor.email} onFocus={handleFocus} />
        </div>
        <div className={classes.formGroup}>
          <label>Password:</label>
          <input id='password' name='password' type="password" placeholder='keep empty to not change' onFocus={handleFocus} />
        </div>
        <div className={classes.formGroup}>
          <label>Name:</label>
          <input id='fullName' name='fullName' type="text" placeholder={doctor.fullName} onFocus={handleFocus} />
        </div>
        <div className={classes.formGroup}>
          <label>Phone Number:</label>
          <input id='phoneNumber' name='phoneNumber' type="text" placeholder={doctor.phoneNumber} onFocus={handleFocus} />
        </div>
        <div className={classes.formGroup}>
          <label>Specialization:</label>
          <input id='specialization' name='specialization' type="text" placeholder={doctor.specialization} onFocus={handleFocus} />
        </div>
        <div className={classes.formGroup}>
          <label>Work City:</label>
          <input id='workCity' name='workCity' type="text" placeholder={doctor.workCity} onFocus={handleFocus} />
        </div>
        <div>
          <input type="submit" value='Update' />
        </div>
      </form>
      {message && <h1>{message}</h1>}
    </div>
  )
}

export default UpdateDoctorProfile;