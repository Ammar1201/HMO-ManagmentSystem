import { useState } from 'react';
import { addDoctorReq } from '../../../api/AdminApi';
import classes from '../css/AddDoctor.module.css';

const AddDoctor = () => {
  const [message, setMessage] = useState('');
  const [doctor, setDoctor] = useState(null);
  const [inputs, setInputs] = useState({
    email: '',
    fullName: '',
    phoneNumber: '',
    specialization: '',
    branch: ''
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newDoctor = await addDoctorReq(inputs);
    if (newDoctor._id) {
      setDoctor(newDoctor);
      setMessage('Doctor added successfully!');
    }
    else {
      setMessage('Something went wrong!');
    }

    setInputs({
      email: '',
      fullName: '',
      phoneNumber: '',
      specialization: '',
      branch: ''
    });
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

  const handleResetMessage = () => {
    setMessage('');
  };

  return (
    <div className={classes.container}>
      <h1 className={classes.header}>Add Doctor</h1>
      <form className={classes.form} onSubmit={handleSubmit}>
        <div className={classes.formGroup} >
          <label htmlFor="email">Email:</label>
          <input id='email' type="email" name="email" required onChange={handleInputsChange} onFocus={handleResetMessage} />
        </div>
        <div className={classes.formGroup} >
          <label htmlFor="fullName">Full Name:</label>
          <input id='fullName' type="text" name="fullName" required onChange={handleInputsChange} onFocus={handleResetMessage} />
        </div>
        <div className={classes.formGroup} >
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input id='phoneNumber' type="number" name="phoneNumber" required onChange={handleInputsChange} onFocus={handleResetMessage} />
        </div>
        <div className={classes.formGroup} >
          <label htmlFor="specialization">Specialization:</label>
          <input id='specialization' type="text" name="specialization" required onChange={handleInputsChange} onFocus={handleResetMessage} />
        </div>
        <div className={classes.formGroup} >
          <label htmlFor="branch">Branch:</label>
          <input id='branch' type="text" name="branch" required onChange={handleInputsChange} onFocus={handleResetMessage} />
        </div>
        <input type="submit" value='Add' />
      </form>
      {message && <h3 className={classes.message}>{message}</h3>}
      {message && doctor && doctor._id && <h4 className={classes.message}>doctor's password is: <span style={{ color: 'red' }}>{doctor?.password}</span></h4>}
    </div>
  )
}

export default AddDoctor;