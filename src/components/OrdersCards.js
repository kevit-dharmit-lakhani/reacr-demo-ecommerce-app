import { Link } from "react-router-dom";
import classes from "./OrdersCards.module.css";

const OrdersCards = ({ orders }) => {
  return (
    <div className={classes.wrapper}>
      <h1>Your Orders</h1>
      {orders && (
        <>
          {orders.map((order, index) => (
            <div className={classes.card} key={index}>
              <div className={classes.total}>
                <h2>Total Quantity: {order.totalQuantity}</h2>
                <h2>Total Amount: ${order.totalAmount}</h2>
              </div>
              <ul>
                {order.items.map((item) => (
                  <li className={classes.items} key={item.id}>
                    <div className={classes.left}>
                      <Link to={`/product/${item.id}`}>{item.name}</Link>
                      <>x{item.quantity}</>
                    </div>
                    <div>(${item.discountedPrice}/item)</div>
                    <div>{item.totalPrice}</div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </>
      )}
      {!orders && <h1>You have not placed any orders yet</h1>}
    </div>
  );
};

export default OrdersCards;
