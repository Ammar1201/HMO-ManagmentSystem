import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { loginRequest } from '../api/Api';
import { useDispatch } from 'react-redux';
import { updatePatient } from '../redux/features/patientSlice';
import { updateDoctor } from '../redux/features/doctorSlice';
import classes from './Login.module.css';

const Login = () => {
  const dispatch = useDispatch()
  const [message, setMessage] = useState('');

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const loginUser = async (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    const credentials = {
      email: email.value,
      password: password.value
    }

    try {
      const login = await loginRequest(credentials, pathname);
      if (login.message === undefined) {
        if (pathname === '/patients/login') {
          localStorage.setItem('patientToken', login.token);
          login.appointments = login.appointments || [];
          dispatch(updatePatient(login.patient));
          navigate('/patients/dashboard');
        }
        if (pathname === '/doctors/login') {
          localStorage.setItem('doctorToken', login.token);
          dispatch(updateDoctor(login.doctor));
          navigate('/doctors/dashboard');
        }
      }
      else {
        setMessage(login.message);
        localStorage.removeItem('patientToken');
        localStorage.removeItem('doctorToken');
      }
    }
    catch (err) {
      localStorage.removeItem('patientToken');
      localStorage.removeItem('doctorToken');
      console.log(err);
    }
  };

  const handleFocus = () => {
    if (message.trim().length !== 0) {
      setMessage('');
    }
  };

  return (
    <div className={classes.container}>
      {pathname === '/patients/login' ? <h1>Login Page</h1> : <h1>Login Page - Doctors</h1>}
      <form className={classes.form} onSubmit={loginUser}>
        <div className={classes.formGroup}>
          <label>Email:</label>
          <input id='email' name='email' type="text" onFocus={handleFocus} />
        </div>
        <div className={classes.formGroup}>
          <label>Password:</label>
          <input id='password' name='password' type="password" onFocus={handleFocus} />
        </div>
        <div>
          <input type="submit" value='Login' />
        </div>
      </form>
      {pathname === '/patients/login' && <div className={classes.doctorLogin}>
        <h2>You A Doctor ? Login </h2>
        <Link to='/doctors/login'>Here</Link>
      </div>}
      {message && <h1>{message}</h1>}
    </div>
  )
}

export default Login;