import { Link } from "react-router-dom";
import classes from "./SignupForm.module.css";

const SignupForm = (props) => {
  return (
    <form
      method="post"
      className={classes.form}
      onSubmit={(e) => {
        e.preventDefault();
        props.onSignup(e);
      }}
    >
      <h1>Create a new account</h1>
      <p>please enter all the necessary details</p>
      <p>
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          pattern="^(?!\s)(?!.*\s$)[a-zA-Z\s]{4,25}$"
          title="4-25 characters, only alphabets and spaces, no leading/trailing spaces"
          required
        ></input>
      </p>
      <p>
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          pattern="^(?!\s)(?!.*\s$)[a-zA-Z\s]{4,25}$"
          title="4-25 characters, only alphabets and spaces, no leading/trailing spaces"
          required
        ></input>
      </p>
      <p>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          pattern="^[a-z]{4,25}$"
          title="4-25 lowercase alphabet characters"
          required
        ></input>
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)[^\s]{8,32}$"
          title="8-32 characters, at least one uppercase, one lowercase, one number, and one special character; no spaces"
          required
        ></input>
      </p>
      <p className={classes.actions}>
        <Link to=".." type="button">
          Cancel
        </Link>
        <button>Submit</button>
      </p>
    </form>
  );
};

export default SignupForm;
