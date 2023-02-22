import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cartActions } from "../store/cartSlice";

import classes from "./CheckoutSuccess.module.css";

const CheckoutSuccess = (props) => {
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();

  const checkoutHandler = () => {
    setSuccess(true);
    dispatch(cartActions.resetState());
  };

  return (
    <>
      {!success && (
        <div className={classes.button}>
          <button onClick={checkoutHandler}>Complete Checkout</button>
        </div>
      )}
      {success && (
        <>
          <div className={classes.message}>
            <p>Your order have been placed successfully</p>
          </div>
          <div className={classes.orderDetails}>
            <h1>Your Order</h1>
            {props.cart.items.map((item) => (
              <div className={classes.items} key={item.id}>
                <div className={classes.itemName}>
                  <Link to={`/product/${item.id}`}>{item.name}</Link>
                  <div className={classes.quantity}>x{item.quantity}</div>
                </div>
                <div>${item.totalPrice}</div>
              </div>
            ))}
            <div className={classes.total}>
              <h2>Total Quantity: {props.cart.totalQuantity}</h2>
              <h2>Total Amount: ${props.cart.totalAmount}</h2>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CheckoutSuccess;
