import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { notifActions } from "../store/notifSlice";
import Loader from "../components/Loader";
import AuthSelector from "../components/AuthSelector";

const LandingPage = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const loginAction = async (e) => {
    setIsLoading(true);
    const loginDetails = {
      username: e.target.username.value,
      password: e.target.password.value,
    };
    const response = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginDetails),
    });
    if (response.ok) {
      const res = await response.json();
      localStorage.setItem("isLoggedIn", JSON.stringify(res));
      // console.log(res);
    }
    dispatch(
      notifActions.newNotif({
        type: "success",
        message: "Logged in successfully",
      })
    );
    setIsLoading(false);
    navigate("/");
  };

  const signupAction = async (e) => {
    setIsLoading(true);

    const data = {
      username: e.target.username.value,
      password: e.target.password.value,
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
    };
    const response = await fetch("https://dummyjson.com/users/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const res = await response.json();
    console.log(res);
    setIsLoading(false);
    dispatch(
      notifActions.newNotif({
        type: "success",
        message: "New account successfully created",
      })
    );
    navigate("/login");
  };

  const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");

  if (storedUserLoggedInInformation !== null) {
    return <Navigate to="/product" />;
  }

  return (
    <>
      {isLoading && <Loader />}
      <AuthSelector
        onLogin={loginAction}
        onSignup={signupAction}
        landingPage={props.landingPage}
      />
      ;
    </>
  );
};

export default LandingPage;
