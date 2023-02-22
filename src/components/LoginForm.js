import { Link } from "react-router-dom";
import classes from "./LoginForm.module.css";

const LoginForm = (props) => {
  return (
    <form
      method="post"
      className={classes.form}
      onSubmit={(e) => {
        e.preventDefault();
        props.onSubmit(e);
      }}
    >
      <h1>Login to an existing account</h1>
      <p>please enter all the necessary details</p>
      <p>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          defaultValue="aaughtonx"
          required
        ></input>
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          defaultValue="Vzwc72RhNGu"
          required
        ></input>
      </p>
      <p className={classes.actions}>
        <Link to="..">Cancel</Link>
        <button>Submit</button>
      </p>
    </form>
  );
};

export default LoginForm;
