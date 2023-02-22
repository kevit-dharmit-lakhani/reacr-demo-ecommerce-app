import classes from "./NotifModal.module.css";

const NotifModal = (props) => {
  return (
    <div className={classes.wrapper}>
      <p className={props.type === "success" ? classes.success : classes.fail}>
        {props.message}
      </p>
    </div>
  );
};

export default NotifModal;
