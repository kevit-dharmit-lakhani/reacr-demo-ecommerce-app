import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { cartActions } from "../store/cartSlice";
import { notifActions } from "../store/notifSlice";
import NotifModal from "./NotifModal";
import classes from "./MainHeader.module.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";

const MainHeader = () => {
  const [message, setMessage] = useState(null);
  const [classType, setClassType] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchTextRef = useRef();
  const searchBarRef = useRef();
  const searchIconRef = useRef();

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

  const logoutHandler = () => {
    dispatch(cartActions.resetState());
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  const searchIconClickHandler = (e) => {
    e.currentTarget.style.display = "none";
    searchBarRef.current.style.display = "flex";
    searchTextRef.current.focus();
  };

  const searchSubmitHandler = (e) => {
    const query = e.target.search.value;
    e.preventDefault();
    inputBlurHandler();
    navigate(`/product/?searchQuery=${query}`);
  };

  const inputBlurHandler = () => {
    searchBarRef.current.style.display = "none";
    searchTextRef.current.value = "";
    searchIconRef.current.style.display = "block";
  };

  return (
    <header className={classes.header}>
      {message && <NotifModal type={classType} message={message} />}

      <h1 className={classes.h1} onClick={() => navigate("/")}>
        The Shop
      </h1>

      {storedUserLoggedInInformation && (
        <div className={classes.userButtons}>
          <SearchIcon
            fontSize="large"
            className={classes.searchIcon}
            onClick={searchIconClickHandler}
            ref={searchIconRef}
          />
          <form
            onSubmit={searchSubmitHandler}
            className={classes.searchBar}
            ref={searchBarRef}
          >
            <SearchIcon fontSize="large" className={classes.searchInputIcon} />
            <input
              type="text"
              ref={searchTextRef}
              name="search"
              className={classes.searchInput}
              onBlur={inputBlurHandler}
            />
          </form>

          <div className={classes.cartIcon} onClick={() => navigate("/cart")}>
            <ShoppingCartIcon fontSize="large" />
            {itemsInCart > 0 && (
              <span className={classes.badge}>{itemsInCart}</span>
            )}
          </div>

          <div className={classes.userMenu}>
            <AccountCircleIcon
              fontSize="large"
              className={classes.profileIcon}
            />

            <div className={classes.dropDown}>
              <Link to="/user-profile">Profile</Link>
              <Link to="/orders">Orders</Link>
              <button className={classes.logoutBtn} onClick={logoutHandler}>
                Log out
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default MainHeader;
