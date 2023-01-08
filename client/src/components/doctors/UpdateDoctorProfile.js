import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateDoctorAction } from '../../redux/features/doctorSlice';
import { updateDoctorInfoReq } from '../../api/Api';
import classes from './UpdateDoctorProfile.module.css';

const UpdateDoctorProfile = () => {
  const [message, setMessage] = useState('');
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    fullName: '',
    phoneNumber: ''
  });

  const doctor = useSelector(state => state.doctor);
  const dispatch = useDispatch();


  const handleUpdateDoctor = async (event) => {
    event.preventDefault();
    let allowUpdate = false;
    for (let info of Object.values(inputs)) {
      if (info.trim().length !== 0) {
        allowUpdate = true;
      }
    }

    if (!allowUpdate) {
      setMessage('You have to fill at least one field!');
      return;
    }

    if (inputs.email === doctor.email) {
      setMessage('You Entered Your Email!');
      setInputs({
        email: '',
        password: '',
        fullName: '',
        phoneNumber: ''
      });
      return;
    }

    const updatedDoctor = await updateDoctorInfoReq(inputs);

    if (updatedDoctor.includes('duplicate key')) {
      setMessage('Email already in use! Please Choose a different one!');
      return;
    }

    if (updatedDoctor) {
      dispatch(updateDoctorAction(updatedDoctor));
      setInputs({
        email: '',
        password: '',
        fullName: '',
        phoneNumber: ''
      });
      setMessage('Profile updated successfully!');
    }
    else {
      setInputs({
        email: '',
        password: '',
        fullName: '',
        phoneNumber: ''
      });
      setMessage('Something went wrong!');
    }
  };

  const handleInputsChange = ({ target }) => {
    switch (target.id) {
      case 'email':
        setInputs(prevState => { return { ...prevState, email: target.value } });
        break;
      case 'password':
        setInputs(prevState => { return { ...prevState, password: target.value } });
        break;
      case 'fullName':
        setInputs(prevState => { return { ...prevState, fullName: target.value } });
        break;
      case 'phoneNumber':
        setInputs(prevState => { return { ...prevState, phoneNumber: target.value } });
        break;
      default:
        break;
    }
  };

  const handleFocus = () => {
    setMessage('');
  };

  return (
    <div className={classes.container}>
      <h1 className={classes.header}>Update Profile</h1>
      <form className={classes.form} onSubmit={handleUpdateDoctor}>
        <div className={classes.formGroup}>
          <label>Email:</label>
          <input id='email' name='email' type="text" placeholder={doctor.email} value={inputs.email} onChange={handleInputsChange} onFocus={handleFocus} />
        </div>
        <div className={classes.formGroup}>
          <label>Password:</label>
          <input id='password' name='password' type="password" placeholder='keep empty to not change' value={inputs.password} onChange={handleInputsChange} onFocus={handleFocus} />
        </div>
        <div className={classes.formGroup}>
          <label>Name:</label>
          <input id='fullName' name='fullName' type="text" placeholder={doctor.fullName} value={inputs.fullName} onChange={handleInputsChange} onFocus={handleFocus} />
        </div>
        <div className={classes.formGroup}>
          <label>Phone Number:</label>
          <input id='phoneNumber' name='phoneNumber' type="text" placeholder={doctor.phoneNumber} value={inputs.phoneNumber} onChange={handleInputsChange} onFocus={handleFocus} />
        </div>
        <div>
          <input type="submit" value='Update' />
        </div>
      </form>
      {message && <h1 className={classes.message}>{message}</h1>}
    </div>
  )
}

export default UpdateDoctorProfile;