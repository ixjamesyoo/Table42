import React from "react";
import { Route } from "react-router-dom";
import Modal from "./modal/modal_container";
import NavBar from "./navbar/navbar_container";

const App = () => (
  <div>
    <Modal />
    <Route path="/" component={ NavBar }/>
  </div>
);

export default App;
