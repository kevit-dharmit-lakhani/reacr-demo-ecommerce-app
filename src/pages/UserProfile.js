import { useNavigate, redirect } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { notifActions } from "../store/notifSlice";
import UserProfileCard from "../components/UserProfileCard";

const UserProfilePage = () => {
  const dispatch = useDispatch();

  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUserData = useCallback(async () => {
    const storedUserLoggedInInformation = JSON.parse(
      localStorage.getItem("isLoggedIn")
    );

    if (storedUserLoggedInInformation === null) {
      dispatch(
        notifActions.newNotif({
          type: "fail",
          message: "Please sign in to your account or create a new account",
        })
      );
      navigate("/");
    } else {
      setIsLoading(true);
      let res = await fetch(
        `https://dummyjson.com/users/${storedUserLoggedInInformation.id}`
      );
      res = await res.json();
      console.log(res);
      setUserData(res);
      setIsLoading(false);
    }
  }, [navigate, dispatch]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  return (
    <>
      <UserProfileCard
        data={userData}
        setData={setUserData}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    </>
  );
};

export default UserProfilePage;

export const action = async ({ request }) => {
  const method = request.method;
  const data = await request.formData();

  const eventData = {
    firstName: data.get("firstName"),
    maidenName: data.get("maidenName"),
    lastName: data.get("lastName"),
    username: data.get("username"),
    password: data.get("password"),
    email: data.get("email"),
    phone: data.get("phone"),
  };

  let res = await fetch(`https://dummyjson.com/users/${data.get("id")}`, {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(eventData),
  });

  res = await res.json();
  console.log(res);
  return redirect("/");
};
