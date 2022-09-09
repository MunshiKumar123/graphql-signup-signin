import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import Style from "./Style.css";

import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Main from "./Main";

const PrivateRoute = (props) => {
  const token = localStorage.getItem("Token");
  if (token) {
    return <Route exact={true} path={props.path} component={props.component} />;
  } else {
    return <SignIn {...props} />;
  }
};
const App = () => {
  return (
    <>
      <Switch>
        <Route path="/" component={SignIn} exact={true} />
        <Route exact path="/signIn" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />

        <PrivateRoute exact path="/main" component={Main} />
        <Redirect to="/" />
      </Switch>
    </>
  );
};

export default App;
