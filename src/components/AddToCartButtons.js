import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../store/cartSlice";

import classes from "./AddToCartButtons.module.css";

const AddToCartButtons = (props) => {
  const dispatch = useDispatch();

  const addItemHandler = () => {
    dispatch(cartActions.addItemToCart(props.item));
  };

  const removeItemHandler = () => {
    dispatch(cartActions.removeItemFromCart(props.item.id));
  };

  const itemsInCart = useSelector((state) => state.cart.items);
  const existingItem = itemsInCart.find((item) => item.id === props.item.id);

  if (existingItem) {
    return (
      <div className={classes.wrapper}>
        <button className={classes.removeItem} onClick={removeItemHandler}>
          -
        </button>
        <span className={classes.itemsInCart}>{existingItem.quantity}</span>
        <button className={classes.addItem} onClick={addItemHandler}>
          +
        </button>
      </div>
    );
  }

  return (
    <button className={classes.addToCart} onClick={addItemHandler}>
      Add to Cart
    </button>
  );
};

export default AddToCartButtons;
