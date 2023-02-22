import classes from "./FilterBar.module.css";

const FilterBar = (props) => {
  return (
    <div className={classes.wrapper}>
      <label htmlFor="categories">Filter by Category:&nbsp;</label>
      <select id="categories" name="categories" onChange={props.onSubmit}>
        <option value="" hidden>
          -- select an option --
        </option>
        <option value="all">all</option>
        {props.categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterBar;
