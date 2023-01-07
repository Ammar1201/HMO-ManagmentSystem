import { useState } from 'react';
import { getSpecificPatientReq } from '../../../../api/AdminApi';
import classes from '../../css/patients/ShowSpecificPatient.module.css';

const ShowSpecificPatient = () => {
  const [message, setMessage] = useState('');
  const [showPatientInformation, setShowPatientInformation] = useState(false);
  const [patientID, setPatientID] = useState('');
  const [patient, setPatient] = useState(null);

  const handleSearchPatient = async (event) => {
    event.preventDefault();

    const foundPatient = await getSpecificPatientReq(patientID);
    if (foundPatient.message === undefined) {
      setPatient(foundPatient);
      setShowPatientInformation(true);
    }
    else {
      const message = foundPatient.message || 'Something went wrong!';
      setMessage(message);
    }
  };

  const handleResetForm = (event) => {
    event.preventDefault();

    setMessage('');
    setShowPatientInformation(false);
    setPatientID('');
    setPatient('');
  };

  const handleInputsChange = ({ target }) => {
    setPatientID(target.value);
  };

  const handleFocus = () => {
    setMessage('');
  };

  return (
    <div className={classes.container}>
      <h1 className={classes.header} >Show Patient Information</h1>
      <form className={classes.form} onSubmit={handleSearchPatient}>
        <div className={classes.formGroup} >
          <label htmlFor="patientID">Patient ID:</label>
          <input id='patientID' type="text" name="patientID" required disabled={showPatientInformation} value={patientID} onChange={handleInputsChange} onFocus={handleFocus} />
        </div>
        <div>
          <input type="submit" value='Search' disabled={showPatientInformation} />
        </div>
      </form>
      {showPatientInformation && <form className={classes.form} onSubmit={handleResetForm} >
        <div className={classes.formGroup} >
          <label htmlFor="email">Email:</label>
          <input id='email' type="email" name="email" disabled value={patient.email} onChange={handleInputsChange} onFocus={handleFocus} />
        </div>
        <div className={classes.formGroup} >
          <label htmlFor="fullName">Full Name:</label>
          <input id='fullName' type="text" name="fullName" disabled value={patient.fullName} onChange={handleInputsChange} onFocus={handleFocus} />
        </div>
        <div className={classes.formGroup} >
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input id='phoneNumber' type="number" name="phoneNumber" disabled value={patient.phoneNumber} onChange={handleInputsChange} onFocus={handleFocus} />
        </div>
        <div>
          <input type="submit" value='Search Again' />
        </div>
      </form>}
      {message && <h3 className={classes.message}>{message}</h3>}
    </div>
  )
}

export default ShowSpecificPatient;