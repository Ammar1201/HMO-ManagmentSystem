import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSpecificDoctorReq, updateSpecificDoctorReq } from '../../../../api/AdminApi';
import { updateDoctorAction, resetDoctor } from '../../../../redux/features/doctorSlice';
import classes from '../../css/doctors/UpdateDoctor.module.css';

const UpdateDoctor = () => {
  const [message, setMessage] = useState('');
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [inputs, setInputs] = useState({
    doctorID: '',
    email: '',
    fullName: '',
    phoneNumber: '',
    specialization: '',
    branch: ''
  });

  const doctor = useSelector(state => state.doctor);
  const dispatch = useDispatch();

  const handleSearchDoctor = async (event) => {
    event.preventDefault();

    const foundDoctor = await getSpecificDoctorReq(inputs.doctorID);
    if (foundDoctor.data?.message === undefined || foundDoctor.status === 200) {
      dispatch(updateDoctorAction(foundDoctor));
      setShowUpdateForm(true);
    }
    else {
      const message = foundDoctor.data.message || 'Something went wrong!';
      setMessage(message);
    }
  };

  const handleUpdateDoctor = async (event) => {
    event.preventDefault();

    const { doctorID, email, fullName, phoneNumber, specialization, branch } = inputs;
    const updatedDoctor = await updateSpecificDoctorReq(doctorID, { email, fullName, phoneNumber, specialization, branch });
    if (updatedDoctor._id) {
      setMessage('Doctor updated successfully!');
      setShowUpdateForm(false);
      setInputs({
        doctorID: '',
        email: '',
        fullName: '',
        phoneNumber: '',
        specialization: '',
        branch: ''
      });
      dispatch(resetDoctor());
    }
    else {
      const message = updatedDoctor.message || 'Something went wrong!';
      setMessage(message);
      dispatch(resetDoctor());
    }
  };

  const handleInputsChange = ({ target }) => {
    switch (target.id) {
      case 'doctorID':
        setInputs(prevState => { return { ...prevState, doctorID: target.value } });
        break;
      case 'email':
        setInputs(prevState => { return { ...prevState, email: target.value } });
        break;
      case 'fullName':
        setInputs(prevState => { return { ...prevState, fullName: target.value } });
        break;
      case 'phoneNumber':
        setInputs(prevState => { return { ...prevState, phoneNumber: target.value } });
        break;
      case 'specialization':
        setInputs(prevState => { return { ...prevState, specialization: target.value } });
        break;
      case 'branch':
        setInputs(prevState => { return { ...prevState, branch: target.value } });
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
      <h1 className={classes.header} >Update Doctor Information</h1>
      <form className={classes.form} onSubmit={handleSearchDoctor}>
        <div className={classes.formGroup} >
          <label htmlFor="doctorID">Doctor ID:</label>
          <input id='doctorID' type="text" name="doctorID" required disabled={showUpdateForm} value={inputs.doctorID} onChange={handleInputsChange} onFocus={handleFocus} />
        </div>
        <div>
          <input type="submit" value='Search' disabled={showUpdateForm} />
        </div>
      </form>
      {showUpdateForm && <form className={classes.form} onSubmit={handleUpdateDoctor}>
        <div className={classes.formGroup} >
          <label htmlFor="email">Email:</label>
          <input id='email' type="email" name="email" placeholder={doctor.email} value={inputs.email} onChange={handleInputsChange} onFocus={handleFocus} />
        </div>
        <div className={classes.formGroup} >
          <label htmlFor="fullName">Full Name:</label>
          <input id='fullName' type="text" name="fullName" placeholder={doctor.fullName} value={inputs.fullName} onChange={handleInputsChange} onFocus={handleFocus} />
        </div>
        <div className={classes.formGroup} >
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input id='phoneNumber' type="number" name="phoneNumber" placeholder={doctor.phoneNumber} value={inputs.phoneNumber} onChange={handleInputsChange} onFocus={handleFocus} />
        </div>
        <div className={classes.formGroup} >
          <label htmlFor="specialization">Specialization:</label>
          <input id='specialization' type="text" name="specialization" placeholder={doctor.specialization} value={inputs.specialization} onChange={handleInputsChange} onFocus={handleFocus} />
        </div>
        <div className={classes.formGroup} >
          <label htmlFor="branch">Branch:</label>
          <input id='branch' type="text" name="branch" placeholder={doctor.branch} value={inputs.branch} onChange={handleInputsChange} onFocus={handleFocus} />
        </div>
        <div>
          <input type="submit" value='Update' />
        </div>
      </form>}
      {message && <h3 className={classes.message}>{message}</h3>}
    </div>
  )
}

export default UpdateDoctor;