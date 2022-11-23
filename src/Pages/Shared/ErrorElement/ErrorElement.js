import React, { useContext } from "react";
import { useRouteError } from "react-router-dom";
import { AuthContext } from "../../../Contexts/AuthProvider/AuthProvider";

const ErrorElement = () => {
  const error = useRouteError();
  const { logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <p className="text-red-500">Something We Wrong!!!</p>
      <p>{error.statusText || error.message}</p>
      <h4 className="text-2xl">
        Please
        <button onClick={handleLogOut}>Sign Out</button>
        and log in again
      </h4>
    </div>
  );
};

export default ErrorElement;
