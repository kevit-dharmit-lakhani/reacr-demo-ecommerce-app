import { useCallback, useEffect, useState } from "react";
import StarRating from "./StarRating";
// import SimpleImageSlider from "react-simple-image-slider";
import AddToCartButtons from "./AddToCartButtons";
import classes from "./ProductDetails.module.css";
import ImageSlider from "./ImageSlider";

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
        {imgObj.length > 0 && (
          <ImageSlider images={imgObj} />
          // <SimpleImageSlider
          //   images={imgObj}
          //   width={400}
          //   height={400}
          //   showNavs={true}
          //   showBullets={true}
          //   autoPlay={true}
          // />
        )}
      </div>
      <div className={classes.right}>
        <h1>{product.title}</h1>
        <p>{product.description}</p>
        <div className={classes.reviews}>
          <StarRating rating={product.rating} />
          <h5>
            ({((Math.random() * 100) / Math.random()).toFixed(0)} reviews)
          </h5>
        </div>
        <h3>${product.price}</h3>
        <div className={classes.actions}>
          <AddToCartButtons item={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
