import { Link } from "react-router-dom";
import Header from "../components/Header";
import classes from './Home.module.css';


const Home = () => {
  return (
    <div className={classes.root}>
      <Header />
      <div className={classes.container}>
        <h1>Welcome To Our HMO</h1>
        <h2>Please Login To Start</h2>
        <Link to='/patients/login'>Login</Link>
      </div>
    </div>
  )
}

export default Home;