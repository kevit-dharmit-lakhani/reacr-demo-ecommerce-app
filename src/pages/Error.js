import { useDispatch } from "react-redux";
import { Navigate, useRouteError } from "react-router-dom";
import { notifActions } from "../store/notifSlice";

const ErrorPage = () => {
  const dispatch = useDispatch();
  const error = useRouteError();

  let message = "Something went wrong!";

  if (error.status === 500) {
    message = error.data.message;
  }

  if (error.status === 404) {
    message = "Could not find resource or page";
  }

  dispatch(
    notifActions.newNotif({
      type: "fail",
      message,
    })
  );

  return <Navigate to="/" />;
};

export default ErrorPage;
