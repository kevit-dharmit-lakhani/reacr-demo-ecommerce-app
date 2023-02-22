import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import CartItems from "../components/CartItems";
import { notifActions } from "../store/notifSlice";

const CartPage = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

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

  return <CartItems cart={cart} />;
};

export default CartPage;
