import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { notifActions } from "../store/notifSlice";
import Loader from "../components/Loader";
import SignupForm from "../components/SignupForm";

const SignupPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const formSubmitAction = async (e) => {
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
    navigate("/");
  };

  const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");

  if (storedUserLoggedInInformation !== null) {
    dispatch(
      notifActions.newNotif({
        type: "success",
        message: "You are already logged in",
      })
    );
    return <Navigate to="/product" />;
  }

  return (
    <div>
      {isLoading && <Loader />}
      <SignupForm onSignup={formSubmitAction} />;
    </div>
  );
};

export default SignupPage;
