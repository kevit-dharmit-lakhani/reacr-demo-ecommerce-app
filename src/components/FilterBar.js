import classes from "./FilterBar.module.css";
import { Link } from "react-router-dom";
import { Skeleton } from "@mui/material";

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const FilterBar = (props) => {
  return (
    <div className={classes.wrapper}>
      <h1>Filter by Category</h1>
      {!props.categories.length &&
        arr.map((x) => (
          <Skeleton
            variant="text"
            key={x}
            width="60%"
            sx={{ margin: "10px", fontSize: "1em" }}
          />
        ))}
      {props.categories.length > 0 && (
        <>
          <Link to="/product?category=all">all</Link>
          {props.categories.map((cat) => (
            <Link to={`/product?category=${cat}`} key={cat}>
              {cat}
            </Link>
          ))}
        </>
      )}
    </div>
  );
};

export default FilterBar;
