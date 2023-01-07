import { useState } from 'react';
import { addPatientReq } from '../../../../api/AdminApi';
import classes from '../../css/patients/AddPatient.module.css';

const AddPatient = () => {
  const [message, setMessage] = useState('');
  const [patient, setPatient] = useState(null);
  const [inputs, setInputs] = useState({
    email: '',
    fullName: '',
    phoneNumber: null
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newPatient = await addPatientReq(inputs);
    if (newPatient._id) {
      setInputs({
        email: '',
        fullName: '',
        phoneNumber: null
      });
      setPatient(newPatient);
      setMessage('Patient added successfully!');
    }
    else {
      setInputs({
        email: '',
        fullName: '',
        phoneNumber: null
      });
      setMessage('Something went wrong!');
    }
  };

  const handleInputsChange = ({ target }) => {
    switch (target.id) {
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

  const handleResetMessage = () => {
    setMessage('');
  };

  return (
    <div className={classes.container}>
      <h1 className={classes.header}>Add Patient</h1>
      <form className={classes.form} onSubmit={handleSubmit}>
        <div className={classes.formGroup} >
          <label htmlFor="email">Email:</label>
          <input id='email' type="email" name="email" required value={inputs.email} onChange={handleInputsChange} onFocus={handleResetMessage} />
        </div>
        <div className={classes.formGroup} >
          <label htmlFor="fullName">Full Name:</label>
          <input id='fullName' type="text" name="fullName" required value={inputs.fullName} onChange={handleInputsChange} onFocus={handleResetMessage} />
        </div>
        <div className={classes.formGroup} >
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input id='phoneNumber' type="number" name="phoneNumber" required value={inputs.phoneNumber} onChange={handleInputsChange} onFocus={handleResetMessage} />
        </div>
        <input type="submit" value='Add' />
      </form>
      {message && <h3 className={classes.message}>{message}</h3>}
      {message && patient && patient._id && <h4 className={classes.message}>patients password is: <span style={{ color: 'green' }}>{patient?.password}</span></h4>}
    </div>
  )
}

export default AddPatient;