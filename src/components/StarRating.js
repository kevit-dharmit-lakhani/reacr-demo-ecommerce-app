import classes from "./StarRating.module.css";

const StarRating = (props) => {
  return (
    <div className={classes.ratingBar}>
      <span className={classes.filledStar}>★</span>
      <span className={props.rating > 1.5 ? classes.filledStar : undefined}>
        {props.rating > 1.5 ? "★" : "☆"}
      </span>
      <span className={props.rating > 2.5 ? classes.filledStar : undefined}>
        {props.rating > 2.5 ? "★" : "☆"}
      </span>
      <span className={props.rating > 3.5 ? classes.filledStar : undefined}>
        {props.rating > 3.5 ? "★" : "☆"}
      </span>
      <span className={props.rating > 4.5 ? classes.filledStar : undefined}>
        {props.rating > 4.5 ? "★" : "☆"}
      </span>
    </div>
  );
};

export default StarRating;
