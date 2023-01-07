import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminLogin } from '../api/AdminApi';
import classes from './AdminLogin.module.css';

const AdminLogin = () => {
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const loginUser = async (event) => {
    event.preventDefault();
    setMessage('');
    const { email, password } = event.target.elements;
    const credentials = {
      email: email.value,
      password: password.value
    }

    const login = await adminLogin(credentials);
    if (login.token) {
      localStorage.setItem('adminLoginToken', login.token);
      navigate('/hmo/health/management/admin/dashboard')
    }
  };

  const handleFocus = () => {
    if (message.trim().length !== 0) {
      setMessage('');
    }
  };

  return (
    <div className={classes.container}>
      <h1>Login Page - Admin</h1>
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

export default AdminLogin;