import { Link, useNavigate } from "react-router-dom";
import AddToCartButtons from "./AddToCartButtons";
import classes from "./CartItems.module.css";

const CartItems = (props) => {
  const navigate = useNavigate();

  const clickHandler = () => navigate("/checkout");

  return (
    <div className={classes.wrapper}>
      <h1>Your Shopping Cart</h1>
      {props.cart.items.length > 0 && (
        <>
          {props.cart.items.map((item) => (
            <div className={classes.items} key={item.id}>
              <div className={classes.top}>
                <Link to={`/product/${item.id}`}>{item.name}</Link>$
                {item.totalPrice}
              </div>
              <div className={classes.bottom}>
                (${item.price}/item)
                <AddToCartButtons item={item} />
              </div>
            </div>
          ))}
          <div className={classes.total}>
            <h2>Total Quantity: {props.cart.totalQuantity}</h2>
            <h2>Total Amount: ${props.cart.totalAmount}</h2>
          </div>
          <button className={classes.checkout} onClick={clickHandler}>
            Checkout
          </button>
        </>
      )}
      {!props.cart.items.length && <h1>Your cart is empty</h1>}
    </div>
  );
};

export default CartItems;
