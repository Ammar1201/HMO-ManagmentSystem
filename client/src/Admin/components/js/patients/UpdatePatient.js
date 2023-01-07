import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSpecificPatientReq, updateSpecificPatientReq } from '../../../../api/AdminApi';
import { updatePatient, resetPatient } from '../../../../redux/features/patientSlice';
import classes from '../../css/patients/UpdatePatient.module.css';

const UpdatePatient = () => {
  const [message, setMessage] = useState('');
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [inputs, setInputs] = useState({
    patientID: '',
    email: '',
    fullName: '',
    phoneNumber: ''
  });

  const patient = useSelector(state => state.patient);
  const dispatch = useDispatch();

  const handleSearchPatient = async (event) => {
    event.preventDefault();

    const foundPatient = await getSpecificPatientReq(inputs.patientID);
    if (foundPatient.message === undefined) {
      dispatch(updatePatient(foundPatient));
      setShowUpdateForm(true);
    }
    else {
      const message = foundPatient.message || 'Something went wrong!';
      setMessage(message);
    }
  };

  const handleUpdatePatient = async (event) => {
    event.preventDefault();

    const { patientID, email, fullName, phoneNumber } = inputs;
    const updatedPatient = await updateSpecificPatientReq(patientID, { email, fullName, phoneNumber });
    if (updatedPatient._id) {
      setMessage('Patient updated successfully!');
      setShowUpdateForm(false);
      setInputs({
        patientID: '',
        email: '',
        fullName: '',
        phoneNumber: ''
      });
      dispatch(resetPatient());
    }
    else {
      const message = updatedPatient.message || 'Something went wrong!';
      setMessage(message);
      dispatch(resetPatient());
    }
  };

  const handleInputsChange = ({ target }) => {
    switch (target.id) {
      case 'patientID':
        setInputs(prevState => { return { ...prevState, patientID: target.value } });
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
      default:
        break;
    }
  };

  const handleFocus = () => {
    setMessage('');
  };

  return (
    <div className={classes.container}>
      <h1 className={classes.header} >Update Patient Information</h1>
      <form className={classes.form} onSubmit={handleSearchPatient}>
        <div className={classes.formGroup} >
          <label htmlFor="patientID">Patient ID:</label>
          <input id='patientID' type="text" name="patientID" required disabled={showUpdateForm} value={inputs.patientID} onChange={handleInputsChange} onFocus={handleFocus} />
        </div>
        <div>
          <input type="submit" value='Search' disabled={showUpdateForm} />
        </div>
      </form>
      {showUpdateForm && <form className={classes.form} onSubmit={handleUpdatePatient}>
        <div className={classes.formGroup} >
          <label htmlFor="email">Email:</label>
          <input id='email' type="email" name="email" placeholder={patient.email} value={inputs.email} onChange={handleInputsChange} onFocus={handleFocus} />
        </div>
        <div className={classes.formGroup} >
          <label htmlFor="fullName">Full Name:</label>
          <input id='fullName' type="text" name="fullName" placeholder={patient.fullName} value={inputs.fullName} onChange={handleInputsChange} onFocus={handleFocus} />
        </div>
        <div className={classes.formGroup} >
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input id='phoneNumber' type="number" name="phoneNumber" placeholder={patient.phoneNumber} value={inputs.phoneNumber} onChange={handleInputsChange} onFocus={handleFocus} />
        </div>
        <div>
          <input type="submit" value='Update' />
        </div>
      </form>}
      {message && <h3 className={classes.message}>{message}</h3>}
    </div>
  )
}

export default UpdatePatient;