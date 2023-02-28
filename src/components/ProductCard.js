import { useNavigate } from "react-router-dom";
import { Chip, Skeleton } from "@mui/material";
import classes from "./ProductCard.module.css";
import StarRating from "./StarRating.js";
import getDiscountedPrice from "../util/getDiscountedPrice";

const arr = [1, 2, 3, 4, 5];

const ProductCard = (props) => {
  const navigate = useNavigate();

  const clickHandler = (e) => {
    navigate(e.currentTarget.id);
  };

  return (
    <div className={classes.wrapper}>
      {!props.products.length &&
        arr.map((x) => (
          <div className={classes.loaderCard} key={x}>
            <Skeleton
              variant="rounded"
              width={300}
              height={300}
              className={classes.img}
            />
            <div className={classes.details}>
              <Skeleton variant="text" sx={{ fontSize: "1.5em" }} />
              <Skeleton variant="text" sx={{ fontSize: "1.5em" }} />
              <Skeleton variant="text" sx={{ fontSize: "1.5em" }} />
            </div>
          </div>
        ))}

      {props.products.length > 0 &&
        props.products.map((product) => (
          <div
            className={classes.card}
            key={product.id}
            id={product.id}
            onClick={clickHandler}
          >
            <img src={product.thumbnail} alt={product.title} />
            <div className={classes.details}>
              <h2>{product.title}</h2>
              <div className={classes.prices}>
                <h3>
                  $
                  {getDiscountedPrice(
                    product.price,
                    product.discountPercentage
                  )}
                </h3>
                <p>${product.price}</p>
                <Chip
                  label={`${product.discountPercentage}% off`}
                  color="success"
                  size="small"
                />
              </div>
              <StarRating rating={product.rating} />
            </div>
          </div>
        ))}
      {props.hasMore && (
        <div className={classes.loaderCard}>
          <Skeleton
            variant="rounded"
            width={300}
            height={300}
            className={classes.img}
          />
          <div className={classes.details}>
            <Skeleton variant="text" sx={{ fontSize: "1.5em" }} />
            <Skeleton variant="text" sx={{ fontSize: "1.5em" }} />
            <Skeleton variant="text" sx={{ fontSize: "1.5em" }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
