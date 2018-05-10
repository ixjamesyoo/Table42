import React from "react";
import { Route, Switch } from "react-router-dom";
import { ProtectedRoute } from "../util/route_util";
import Modal from "./modal/modal_container";
import NavBar from "./navbar/navbar_container";
import HomePage from "./home_page/home_page";

const App = () => (
  <div>
    <Modal />
    <Route path="/" component={ NavBar }/>
    <Switch>
      <Route exact path="/" component={ HomePage }/>
    </Switch>
  </div>
);

export default App;
