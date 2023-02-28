import { Link, useNavigate } from "react-router-dom";
import AddToCartButtons from "./AddToCartButtons";
import classes from "./CartItems.module.css";

const CartItems = ({ cart }) => {
  const navigate = useNavigate();

  const clickHandler = () => navigate("/checkout");

  return (
    <div className={classes.wrapper}>
      <h1>Your Shopping Cart</h1>
      {cart.items.length > 0 && (
        <>
          {cart.items.map((item) => (
            <div className={classes.items} key={item.id}>
              <div className={classes.top}>
                <Link to={`/product/${item.id}`}>{item.name}</Link>$
                {item.totalPrice}
              </div>
              <div className={classes.bottom}>
                (${item.discountedPrice}/item)
                <AddToCartButtons item={item} />
              </div>
            </div>
          ))}
          <div className={classes.total}>
            <h2>Total Quantity: {cart.totalQuantity}</h2>
            <h2>Total Amount: ${cart.totalAmount}</h2>
          </div>
          <div className={classes.checkoutDiv}>
            <button className={classes.checkout} onClick={clickHandler}>
              Checkout
            </button>
          </div>
        </>
      )}
      {!cart.items.length && <h1>Your cart is empty</h1>}
    </div>
  );
};

export default CartItems;
