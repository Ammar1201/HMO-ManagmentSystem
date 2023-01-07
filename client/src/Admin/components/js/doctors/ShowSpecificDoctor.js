import { useState } from 'react';
import { getSpecificDoctorReq } from '../../../../api/AdminApi';
import classes from '../../css/doctors/ShowSpecificDoctor.module.css';

const ShowSpecificDoctor = () => {
  const [message, setMessage] = useState('');
  const [showDoctorInformation, setShowDoctorInformation] = useState(false);
  const [doctorID, setDoctorID] = useState('');
  const [doctor, setDoctor] = useState(null);

  const handleSearchDoctor = async (event) => {
    event.preventDefault();

    const foundDoctor = await getSpecificDoctorReq(doctorID);
    if (foundDoctor.data?.message === undefined || foundDoctor.status === 200) {
      setDoctor(foundDoctor);
      setShowDoctorInformation(true);
    }
    else {
      const message = foundDoctor.data.message || 'Something went wrong!';
      setMessage(message);
    }
  };

  const handleResetForm = async (event) => {
    event.preventDefault();

    setMessage('');
    setShowDoctorInformation(false);
    setDoctorID('');
    setDoctor('');
  };

  const handleInputsChange = ({ target }) => {
    setDoctorID(target.value);
  };

  const handleFocus = () => {
    setMessage('');
  };

  return (
    <div className={classes.container}>
      <h1 className={classes.header} >Show Doctor Information</h1>
      <form className={classes.form} onSubmit={handleSearchDoctor}>
        <div className={classes.formGroup} >
          <label htmlFor="doctorID">Doctor ID:</label>
          <input id='doctorID' type="text" name="doctorID" required disabled={showDoctorInformation} value={doctorID} onChange={handleInputsChange} onFocus={handleFocus} />
        </div>
        <div>
          <input type="submit" value='Search' disabled={showDoctorInformation} />
        </div>
      </form>
      {showDoctorInformation && <form className={classes.form} onSubmit={handleResetForm}>
        <div className={classes.formGroup} >
          <label htmlFor="email">Email:</label>
          <input id='email' type="email" name="email" disabled value={doctor.email} onChange={handleInputsChange} onFocus={handleFocus} />
        </div>
        <div className={classes.formGroup} >
          <label htmlFor="fullName">Full Name:</label>
          <input id='fullName' type="text" name="fullName" disabled value={doctor.fullName} onChange={handleInputsChange} onFocus={handleFocus} />
        </div>
        <div className={classes.formGroup} >
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input id='phoneNumber' type="number" name="phoneNumber" disabled value={doctor.phoneNumber} onChange={handleInputsChange} onFocus={handleFocus} />
        </div>
        <div className={classes.formGroup} >
          <label htmlFor="specialization">Specialization:</label>
          <input id='specialization' type="text" name="specialization" disabled value={doctor.specialization} onChange={handleInputsChange} onFocus={handleFocus} />
        </div>
        <div className={classes.formGroup} >
          <label htmlFor="branch">Branch:</label>
          <input id='branch' type="text" name="branch" disabled value={doctor.branch} onChange={handleInputsChange} onFocus={handleFocus} />
        </div>
        <div>
          <input type="submit" value='Search Again' />
        </div>
      </form>}
      {message && <h3 className={classes.message}>{message}</h3>}
    </div>
  )
}

export default ShowSpecificDoctor;