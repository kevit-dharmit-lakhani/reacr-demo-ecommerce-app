import { useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
import classes from "./AuthSelector.module.css";

const AuthSelector = (props) => {
  // const navigate = useNavigate();
  const container = useRef();
  const loginBtn = useRef();
  const SignupBtn = useRef();

  const loginHandler = (e) => {
    e.preventDefault();
    props.onLogin(e);
  };

  const signupHandler = (e) => {
    e.preventDefault();
    props.onSignup(e);
  };

  useEffect(() => {
    SignupBtn.current.addEventListener("click", () => {
      container.current.classList.add(classes.rightPanelActive);
    });

    loginBtn.current.addEventListener("click", () => {
      container.current.classList.remove(classes.rightPanelActive);
    });

    if (props.landingPage === "signup") {
      container.current.classList.add(classes.rightPanelActive);
    }

    if (props.landingPage === "login") {
      container.current.classList.remove(classes.rightPanelActive);
    }
  }, [props.landingPage]);

  return (
    <div className={classes.wrapper}>
      <div className={classes.container} ref={container}>
        <div className={`${classes.formContainer} ${classes.signupContainer}`}>
          <form onSubmit={signupHandler}>
            <h1>Create Account</h1>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="First Name"
              pattern="^(?!\s)(?!.*\s$)[a-zA-Z\s]{4,25}$"
              title="4-25 characters, only alphabets and spaces, no leading/trailing spaces"
              required
            />
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Last Name"
              pattern="^(?!\s)(?!.*\s$)[a-zA-Z\s]{4,25}$"
              title="4-25 characters, only alphabets and spaces, no leading/trailing spaces"
              required
            />
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              pattern="^[a-z]{4,25}$"
              title="4-25 lowercase alphabet characters"
              required
            />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)[^\s]{8,32}$"
              title="8-32 characters, at least one uppercase, one lowercase, one number, and one special character; no spaces"
              required
            />
            <button>Sign Up</button>
          </form>
        </div>

        <div className={`${classes.formContainer} ${classes.loginContainer}`}>
          <form onSubmit={loginHandler}>
            <h1>Log in</h1>
            <input
              type="text"
              id="username"
              name="username"
              defaultValue="aaughtonx"
              required
            />
            <input
              type="password"
              id="password"
              name="password"
              defaultValue="Vzwc72RhNGu"
              required
            />
            <button>Log in</button>
          </form>
        </div>

        <div className={classes.overlayContainer}>
          <div className={classes.overlay}>
            <div className={`${classes.overlayPanel} ${classes.overlayLeft}`}>
              <h1>Create a new account</h1>
              <p>please enter all the necessary details</p>
              <button className={classes.ghost} ref={loginBtn}>
                Log In
              </button>
            </div>
            <div className={`${classes.overlayPanel} ${classes.overlayRight}`}>
              <h1>Login to an existing account</h1>
              <p>please enter all the necessary details</p>
              <button className={classes.ghost} ref={SignupBtn}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthSelector;
