import { Skeleton } from "@mui/material";
import { useState } from "react";
import { Form } from "react-router-dom";
import classes from "./UserProfileCard.module.css";

const UserProfileCard = (props) => {
  const [edit, setEdit] = useState(false);
  const data = props.data;

  return (
    <Form method="PATCH" className={classes.wrapper}>
      {props.isLoading && (
        <div>
          <Skeleton
            variant="circular"
            height={100}
            width={100}
            sx={{ margin: "auto" }}
          />
          <br />
          <Skeleton variant="rectangular" width="60%" sx={{ margin: "auto" }} />
          <br />
          <Skeleton variant="rectangular" width="40%" sx={{ margin: "auto" }} />
          <br />
          <Skeleton variant="rectangular" width="40%" sx={{ margin: "auto" }} />
        </div>
      )}
      {!props.isLoading && (
        <>
          {!edit && (
            <button
              type="button"
              onClick={() => setEdit(true)}
              className={classes.editButton}
            >
              Edit
            </button>
          )}

          <input
            type="number"
            defaultValue={data.id}
            name="id"
            readOnly
            hidden
          />
          <img
            src={data.image}
            alt="Profile Pic"
            className={classes.profilePic}
          />
          <div className={classes.inputBundle}>
            <div className={classes.singleInput}>
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                defaultValue={data.firstName}
                id="firstName"
                name="firstName"
                placeholder="First Name"
                disabled={!edit}
              />
            </div>
            <div className={classes.singleInput}>
              <label htmlFor="maidenName">Maiden Name</label>
              <input
                type="text"
                defaultValue={data.maidenName}
                id="maidenName"
                name="maidenName"
                placeholder="Maiden Name"
                disabled={!edit}
              />
            </div>
            <div className={classes.singleInput}>
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                defaultValue={data.lastName}
                id="lastName"
                name="lastName"
                placeholder="Last Name"
                disabled={!edit}
              />
            </div>
          </div>
          <div className={classes.inputBundle}>
            <div className={classes.singleInput}>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                defaultValue={data.username}
                id="username"
                name="username"
                placeholder="Username"
                disabled={!edit}
              />
            </div>
            <div className={classes.singleInput}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                defaultValue={data.password}
                id="password"
                name="password"
                placeholder="Password"
                disabled={!edit}
              />
            </div>
          </div>
          <div className={classes.inputBundle}>
            <div className={classes.singleInput}>
              <label htmlFor="email">E-mail</label>
              <input
                type="text"
                defaultValue={data.email}
                id="email"
                name="email"
                placeholder="E-mail"
                disabled={!edit}
              />
            </div>
            <div className={classes.singleInput}>
              <label htmlFor="phone">Phone Number</label>
              <input
                type="text"
                defaultValue={data.phone}
                id="phone"
                name="phone"
                placeholder="Phone Number"
                disabled={!edit}
              />
            </div>
          </div>
          {edit && (
            <button
              onClick={() => props.setIsLoading(true)}
              className={classes.saveButton}
            >
              Save
            </button>
          )}
        </>
      )}
    </Form>
  );
};

export default UserProfileCard;
