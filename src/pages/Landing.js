import { Navigate } from "react-router-dom";
import AuthSelector from "../components/AuthSelector";

const LandingPage = () => {
  const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");

  if (storedUserLoggedInInformation !== null) {
    return <Navigate to="/product" />;
  }

  return <AuthSelector />;
};

export default LandingPage;
