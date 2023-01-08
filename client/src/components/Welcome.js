import welcome from '../assets/welcome.jpg';
import classes from './Welcome.module.css';

const Welcome = ({ name }) => {
  return (
    <div className={classes.container}>
      <h1>Welcome Back, {name}</h1>
      <div className={classes.welcome}>
        <img src={welcome} alt="welcome" />
      </div>
    </div>
  )
}

export default Welcome