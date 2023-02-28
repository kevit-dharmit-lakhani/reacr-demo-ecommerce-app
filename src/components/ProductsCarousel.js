import { useNavigate } from "react-router-dom";
import { Chip } from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import getDiscountedPrice from "../util/getDiscountedPrice";
import classes from "./ProductsCarousel.module.css";

const ProductsCarousel = (props) => {
  const navigate = useNavigate();

  const responsive = {
    superLarge: {
      breakpoint: { max: 4000, min: 2475 },
      items: 7,
    },
    larger: {
      breakpoint: { max: 2475, min: 1785 },
      items: 5,
    },
    large: {
      breakpoint: { max: 1785, min: 1440 },
      items: 4,
    },
    mid: {
      breakpoint: { max: 1440, min: 1075 },
      items: 3,
    },
    small: {
      breakpoint: { max: 1075, min: 720 },
      items: 2,
    },
    smaller: {
      breakpoint: { max: 650, min: 0 },
      items: 1,
    },
  };

  const clickHandler = (e) => {
    props.setIsLoading(true);
    navigate(`../${e.currentTarget.id}`);
  };

  return (
    <div className={classes.wrapper}>
      <h1>You might be interested in</h1>
      <Carousel responsive={responsive}>
        {props.items.map((product) => (
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
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ProductsCarousel;
