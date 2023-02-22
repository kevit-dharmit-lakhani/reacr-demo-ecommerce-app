import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cartActions } from "../store/cartSlice";
import { notifActions } from "../store/notifSlice";
import NotifModal from "./NotifModal";
import classes from "./MainHeader.module.css";

const MainHeader = () => {
  const [message, setMessage] = useState(null);
  const [classType, setClassType] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");
  const itemsInCart = useSelector((state) => state.cart.totalQuantity);
  const notif = useSelector((state) => state.notif);

  useEffect(() => {
    if (notif.isShown) {
      setClassType(notif.type);
      setMessage(notif.message);
      setTimeout(() => {
        setClassType(null);
        setMessage(null);
        dispatch(notifActions.resetState());
      }, 3000);
    }
  }, [notif, dispatch]);

  function navigateHandler() {
    navigate("/");
  }

  const logoutHandler = () => {
    dispatch(cartActions.resetState());
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  return (
    <header className={classes.header}>
      {message && <NotifModal type={classType} message={message} />}
      <h1 className={classes.h1} onClick={navigateHandler}>
        The Shop
      </h1>
      {storedUserLoggedInInformation && (
        <div className={classes.userButtons}>
          <svg
            width="64px"
            height="64px"
            viewBox="0 0 24 24"
            fill="none"
            className={classes.profileIcon}
            onClick={() => navigate("./user-profile")}
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M16.9696 19.5047C16.7257 17.5293 15.0414 16 13 16H11C8.95858 16 7.27433 17.5293 7.03036 19.5047M16.9696 19.5047C19.3986 17.893 21 15.1335 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 15.1335 4.60137 17.893 7.03036 19.5047M16.9696 19.5047C15.5456 20.4496 13.8371 21 12 21C10.1629 21 8.45441 20.4496 7.03036 19.5047M15 10C15 11.6569 13.6569 13 12 13C10.3431 13 9 11.6569 9 10C9 8.34315 10.3431 7 12 7C13.6569 7 15 8.34315 15 10Z"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </g>
          </svg>
          <div className={classes.cartIcon} onClick={() => navigate("/cart")}>
            <svg height="64px" width="64px" viewBox="0 0 512 512">
              <g strokeWidth="0"></g>
              <g strokeLinecap="round" strokeLinejoin="round"></g>
              <g>
                <g>
                  <path d="M494.364,133.438c-11.525-15.738-29.351-25.678-48.804-27.219L126.243,80.918l-3.129-17.749 c-5.253-29.676-28.858-52.657-58.672-57.066L24.59,0.187c-9.5-1.396-18.34,5.172-19.752,14.658 c-1.409,9.512,5.158,18.356,14.657,19.761v-0.008l39.861,5.907c14.97,2.218,26.868,13.785,29.497,28.71l54.013,306.134 c5.073,28.735,30.027,49.669,59.207,49.678h221.97c9.599,0,17.39-7.792,17.39-17.39c0-9.607-7.791-17.398-17.39-17.398h-221.97 c-12.282,0.009-22.814-8.836-24.946-20.934l-5-28.349h244.879c31.243,0,58.35-21.55,65.372-52.005l23.254-100.767 c1.148-5,1.721-10.06,1.721-15.086C507.352,158.962,502.875,145.04,494.364,133.438z M296.499,229.855v82.118h-72.469v-82.118 H296.499z M224.031,206.652v-88.899l72.469,5.746v83.154H224.031z M319.685,229.855h72.469v82.118h-72.469V229.855z M319.685,206.652V125.33l72.469,5.745v75.577H319.685z M200.839,115.911v90.74h-52.408l-16.983-96.237L200.839,115.911z M152.524,229.855h48.315v82.118h-33.828L152.524,229.855z M454.131,282.444c-3.981,17.278-19.385,29.53-37.125,29.53h-1.653 v-82.118h50.91L454.131,282.444z M477.385,181.668l-6.969,30.207v-5.223h-55.063v-73.736l27.921,2.208 c11.045,0.866,21.166,6.516,27.707,15.447c4.837,6.592,7.388,14.495,7.388,22.526C478.369,175.949,478.027,178.809,477.385,181.668 z"></path>
                  <path d="M215.344,450.165c-17.077,0-30.909,13.853-30.909,30.926c0,17.073,13.832,30.909,30.909,30.909 c17.077,0,30.926-13.836,30.926-30.909C246.27,464.018,232.421,450.165,215.344,450.165z"></path>
                  <path d="M381.537,450.165c-17.073,0-30.914,13.853-30.914,30.926c0,17.073,13.84,30.909,30.914,30.909 c17.077,0,30.922-13.836,30.922-30.909C412.459,464.018,398.615,450.165,381.537,450.165z"></path>
                </g>
              </g>
            </svg>
            {itemsInCart > 0 && (
              <span className={classes.badge}>{itemsInCart}</span>
            )}
          </div>
          <button onClick={logoutHandler}>Logout</button>
        </div>
      )}
    </header>
  );
};

export default MainHeader;
