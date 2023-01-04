import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
          localStorage.setItem('token', login.token);
          login.appointments = login.appointments || [];
          dispatch(updatePatient(login.patient));
          navigate('/patients/dashboard');
        }
        if (pathname === '/doctors/login') {
          localStorage.setItem('token', login.token);
          dispatch(updateDoctor(login.doctor));
          navigate('/doctors/dashboard');
        }
      }
      else {
        setMessage(login.message);
        localStorage.removeItem('token');
      }
    }
    catch (err) {
      localStorage.removeItem('token');
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
      <h1>Login Page</h1>
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
      {message && <h1>{message}</h1>}
    </div>
  )
}

export default Login;