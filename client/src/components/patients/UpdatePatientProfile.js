import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updatePatient } from '../../redux/features/patientSlice';
import { updatePatientInfoReq } from '../../api/Api';
import classes from './UpdatePatientProfile.module.css';

const UpdatePatientProfile = () => {
  const [message, setMessage] = useState('');

  const patient = useSelector(state => state.patient);
  const dispatch = useDispatch();


  const handleUpdatePatient = async (event) => {
    event.preventDefault();
    const { email, password, fullName, phoneNumber } = event.target.elements;;
    const profile = {
      email: email.value || patient.email,
      password: password.value,
      fullName: fullName.value || patient.fullName,
      phoneNumber: phoneNumber.value || patient.phoneNumber
    }

    try {
      const updatedPatient = await updatePatientInfoReq(profile);
      console.log(updatedPatient);
      if (updatedPatient) {
        dispatch(updatePatient(profile));
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
      <form className={classes.form} onSubmit={handleUpdatePatient}>
        <div className={classes.formGroup}>
          <label>Email:</label>
          <input id='email' name='email' type="text" placeholder={patient.email} onFocus={handleFocus} />
        </div>
        <div className={classes.formGroup}>
          <label>Password:</label>
          <input id='password' name='password' type="password" placeholder='keep empty to not change' onFocus={handleFocus} />
        </div>
        <div className={classes.formGroup}>
          <label>Name:</label>
          <input id='fullName' name='fullName' type="text" placeholder={patient.fullName} onFocus={handleFocus} />
        </div>
        <div className={classes.formGroup}>
          <label>Phone Number:</label>
          <input id='phoneNumber' name='phoneNumber' type="text" placeholder={patient.phoneNumber} onFocus={handleFocus} />
        </div>
        <div>
          <input type="submit" value='Update' />
        </div>
      </form>
      {message && <h1>{message}</h1>}
    </div>
  )
}

export default UpdatePatientProfile;