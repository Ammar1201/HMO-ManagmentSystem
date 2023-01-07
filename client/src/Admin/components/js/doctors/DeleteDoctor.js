import { useState } from 'react';
import { removeDoctorReq } from '../../../../api/AdminApi';
import classes from '../../css/doctors/DeleteDoctor.module.css';

const DeleteDoctor = () => {
  const [message, setMessage] = useState('');
  const [doctor, setDoctor] = useState(null);
  const [doctorIdInput, setDoctorIdInput] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const deletedDoctor = await removeDoctorReq(doctorIdInput);
    if (deletedDoctor.deletedDoctor?.acknowledged) {
      setDoctor(deletedDoctor.doctor);
    }
    else {
      const message = deletedDoctor.message || 'Something went wrong!';
      setMessage(message);
    }
    setDoctorIdInput('');
  };

  const handleInputChange = ({ target }) => {
    setDoctorIdInput(target.value);
  };

  const handleResetMessage = () => {
    setMessage('');
    setDoctor(null);
  };

  return (
    <div className={classes.container}>
      <h1 className={classes.header}>Delete Doctor</h1>
      <form className={classes.form} onSubmit={handleSubmit}>
        <div className={classes.formGroup} >
          <label htmlFor="doctorID">Doctor ID:</label>
          <input type="text" name="doctorID" required value={doctorIdInput} onChange={handleInputChange} onFocus={handleResetMessage} />
        </div>
        <input type="submit" value='Delete' />
      </form>
      {message && <h3 className={classes.message}>{message}</h3>}
      {doctor && doctor._id && <h4 className={classes.message}>Doctor with the ID: <span style={{ color: 'red' }}>{doctor?._id}</span> deleted Successfully!</h4>}
    </div>
  )
}

export default DeleteDoctor;