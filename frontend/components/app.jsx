import React from "react";
import { Route, Switch } from "react-router-dom";
import { ProtectedRoute } from "../util/route_util";
import Modal from "./modal/modal_container";
import NavBar from "./navbar/navbar_container";
import HomePage from "./home_page/home_page";
import RestaurantIndex from "./restaurant_index/restaurant_index_container";


// complete homepage

// need routes for
// 1. search results (restaurant index) --  /restaurants/search
// 2. restaurant show page -- /restaurants/:id
// 3. profile page  -- /my/profile  backend users :show with validation
// my/profile/reviews  my/profile/reservations




const App = () => (
  <div>
    <Modal />
    <Route path="/" component={ NavBar }/>
    <Switch>
      <Route exact path="/" component={ HomePage }/>
      <Route path="/restaurants/search" component={ RestaurantIndex }/>
    </Switch>
  </div>
);

export default App;
