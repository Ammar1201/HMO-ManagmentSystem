import { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { loginRequest, verifyTokenRequest } from '../api/Api';
import classes from './Login.module.css';

const Login = () => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (user && (user.token !== undefined || user.token !== null)) {
      const verifyUserReq = async () => {
        const verified = await verifyTokenRequest(user.token, user.email);
        if (verified === 'authorized') {
          navigate('/dashboard');
        }
      };
      verifyUserReq();
    }
  }, [navigate]);

  const loginUser = async (event) => {
    event.preventDefault();
    // const { email, password } = event.target.elements;
    // const credentials = {
    //   email: email.value,
    //   password: password.value
    // }

    const login = await loginRequest({ email, password });
    if (login.message === undefined) {
      sessionStorage.setItem('user', JSON.stringify({ token: login.token, email: login.patient.email }));
      setUser(login);
    }
    else {
      setMessage(login.message);
    }
  };

  const handleFocus = () => {
    if (message.trim().length !== 0) {
      setMessage('');
    }
  };

  const handleChange = ({ target }) => {
    if (target.id === 'email') {
      setEmail(target.value);
      return;
    }
    if (target.id === 'password') {
      setPassword(target.value);
      return;
    }
  };

  return (
    <div className={classes.container}>
      <h1>Login Page</h1>
      <form className={classes.form} onSubmit={loginUser}>
        <div className={classes.formGroup}>
          <label>Email:</label>
          <input id='email' name='email' type="text" value={email} onFocus={handleFocus} onChange={handleChange} />
        </div>
        <div className={classes.formGroup}>
          <label>Password:</label>
          <input id='password' name='password' type="password" value={password} onFocus={handleFocus} onChange={handleChange} />
        </div>
        <div>
          <input type="submit" value='Login' />
        </div>
      </form>
      {message && <h1>{message}</h1>}
      {user && <Navigate to='/dashboard' />}
    </div>
  )
}

export default Login;