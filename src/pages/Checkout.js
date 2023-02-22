import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { notifActions } from "../store/notifSlice";
import CheckoutSuccess from "../components/CheckoutSuccess";

const CheckoutPage = () => {
  const dispatch = useDispatch();

  const cartItem = useSelector((state) => state.cart);
  const [cart, setCart] = useState(cartItem);

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

  if (cart.totalQuantity < 1) {
    dispatch(
      notifActions.newNotif({
        type: "fail",
        message: "Your cart is empty",
      })
    );

    return <Navigate to="/" />;
  }

  return <CheckoutSuccess cart={cart} setCart={setCart} />;
};

export default CheckoutPage;
