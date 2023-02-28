import classes from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={classes.loading_animation_wrapper}>
      <div className={classes.loading_animation}></div>
    </div>
  );
};

export default Loader;
