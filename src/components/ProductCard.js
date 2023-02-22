import { Link, useNavigate } from "react-router-dom";
import AddToCartButtons from "./AddToCartButtons";
import StarRating from "./StarRating";
import classes from "./ProductCard.module.css";

const ProductCard = (props) => {
  const navigate = useNavigate();

  const clickHandler = (e) => {
    navigate(e.target.id);
  };

  return (
    <div className={classes.wrapper}>
      {props.products.map((product) => (
        <div className={classes.card} key={product.id}>
          <img
            src={product.thumbnail}
            alt={product.title}
            id={product.id}
            onClick={clickHandler}
          />
          <div className={classes.details}>
            <div className={classes.title}>
              <h1>
                <Link to={`${product.id}`}>{product.title}</Link>
              </h1>
              <h3>${product.price}</h3>
            </div>
            <div className={classes.description}>
              <Link to={`${product.id}`}>{product.description}</Link>
            </div>
            <div className={classes.last}>
              <StarRating rating={product.rating} />
              <AddToCartButtons item={product} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCard;
