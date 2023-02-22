import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { notifActions } from "../store/notifSlice";
import Loader from "../components/Loader";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const formSubmitAction = async (e) => {
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
    setIsLoading(false);
    dispatch(
      notifActions.newNotif({
        type: "success",
        message: "Logged in successfully",
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
      <LoginForm onSubmit={formSubmitAction} />
    </div>
  );
};

export default LoginPage;
