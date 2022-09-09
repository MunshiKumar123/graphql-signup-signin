import React from "react";
import DataShow from "./DataShow";
const Main = (props) => {
  const logout = () => {
    localStorage.removeItem("Token");
    props.history.push("/");
  };
  return (
    <>
      <div className="container mt-3">
        <button className="btn btn-primary" onClick={logout}>
          Logout
        </button>
        <h4>Welcome Home Page!👌</h4>
        <DataShow />
      </div>
    </>
  );
};

export default Main;
