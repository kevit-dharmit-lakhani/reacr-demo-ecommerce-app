import { useNavigate } from "react-router-dom";
import classes from "./AuthSelector.module.css";

const AuthSelector = () => {
  const navigate = useNavigate();

  const loginHandler = () => {
    navigate("/login");
  };

  const signupHandler = () => {
    navigate("/signup");
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.left}>
        <h1>Welcome to 'The Shop'</h1>
        <h3>A one stop shop for all your needs</h3>
        <p>Please sign in to your account or create a new account</p>
      </div>
      <div className={classes.right}>
        <button className={classes.button} onClick={loginHandler}>
          Log In
        </button>
        <button className={classes.button} onClick={signupHandler}>
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default AuthSelector;
