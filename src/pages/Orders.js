import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import OrdersCards from "../components/OrdersCards";
import { notifActions } from "../store/notifSlice";

const Orders = () => {
  const dispatch = useDispatch();

  const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");

  if (storedUserLoggedInInformation === null) {
    dispatch(
      notifActions.newNotif({
        type: "fail",
        message: "Please sign in to your account or create a new account",
      })
    );
    return <Navigate to="/" />;
  }

  const orders = JSON.parse(storedUserLoggedInInformation).orders;

  return <OrdersCards orders={orders} />;
};

export default Orders;
