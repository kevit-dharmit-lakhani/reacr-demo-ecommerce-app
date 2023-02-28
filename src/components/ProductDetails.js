import { useCallback, useEffect, useState } from "react";
import StarRating from "./StarRating";
import AddToCartButtons from "./AddToCartButtons";
import classes from "./ProductDetails.module.css";
import ImageSlider from "./ImageSlider";
import { Chip, Skeleton } from "@mui/material";

const ProductDetails = (props) => {
  const [imgObj, setImgObj] = useState([]);
  const product = props.product;

  const turnArray = useCallback(async () => {
    if (Object.keys(product).length) {
      setImgObj(product.images);
    }
  }, [product]);

  useEffect(() => {
    turnArray();
  }, [turnArray]);

  return (
    <div className={classes.wrapper}>
      <div>
        {imgObj.length > 0 ? (
          <ImageSlider images={imgObj} />
        ) : (
          <Skeleton variant="rectangular" width="100%" height="100%" />
        )}
      </div>
      {props.isLoading && (
        <div className={classes.skeletonRight}>
          <Skeleton variant="text" sx={{ fontSize: "1.5em" }} />
          <Skeleton variant="text" sx={{ fontSize: "1em" }} />
          <Skeleton variant="text" sx={{ fontSize: "1.25em" }} />
          <Skeleton variant="text" sx={{ fontSize: "1.25em" }} />
          <Skeleton variant="rounded" width={115} height={45} />
        </div>
      )}
      {!props.isLoading && (
        <div className={classes.right}>
          <h1>{product.title}</h1>
          <p>{product.description}</p>
          <div className={classes.reviews}>
            <StarRating rating={product.rating} />
            <h5>
              ({((Math.random() * 100) / Math.random()).toFixed(0)} reviews)
            </h5>
          </div>
          <div className={classes.prices}>
            <h3>${product.discountedPrice}</h3>
            <p>${product.price}</p>
            <Chip
              label={`${product.discountPercentage}% off`}
              color="success"
              size="small"
            />
          </div>
          <div className={classes.actions}>
            <AddToCartButtons item={product} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
