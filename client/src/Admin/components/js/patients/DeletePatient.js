import { useState } from 'react';
import { removePatientReq } from '../../../../api/AdminApi';
import classes from '../../css/patients/DeletePatient.module.css';

const DeletePatient = () => {
  const [message, setMessage] = useState('');
  const [patient, setPatient] = useState(null);
  const [patientIdInput, setPatientIdInput] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const deletedPatient = await removePatientReq(patientIdInput);
    if (deletedPatient.deletedPatient?.acknowledged) {
      setPatient(deletedPatient.patient);
    }
    else {
      const message = deletedPatient.message || 'Something went wrong!';
      setMessage(message);
    }
    setPatientIdInput('');
  };

  const handleInputChange = ({ target }) => {
    setPatientIdInput(target.value);
  };

  const handleResetMessage = () => {
    setMessage('');
    setPatient(null);
  };

  return (
    <div className={classes.container}>
      <h1 className={classes.header}>Delete Patient</h1>
      <form className={classes.form} onSubmit={handleSubmit}>
        <div className={classes.formGroup} >
          <label htmlFor="patientID">Patient ID:</label>
          <input type="text" name="patientID" required value={patientIdInput} onChange={handleInputChange} onFocus={handleResetMessage} />
        </div>
        <input type="submit" value='Delete' />
      </form>
      {message && <h3 className={classes.message}>{message}</h3>}
      {patient && patient._id && <h4 className={classes.message}>Patient with the ID: <span style={{ color: 'red' }}>{patient?._id}</span> deleted Successfully!</h4>}
    </div>
  )
}

export default DeletePatient;