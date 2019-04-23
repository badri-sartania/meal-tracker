import React from "react";
import { Route, Redirect } from "react-router-dom";

import Meals from "./meals";
import MealCreate from "./meal-create";
import MealEdit from "./meal-edit";
import Users from "./users";
import UserCreate from "./user-create";
import UserEdit from "./user-edit";
import Settings from "./settings";
import { Role } from "../config";

export default role => {
  let res = [];

  if (role === Role.Admin || role === Role.User) {
    res.push(
      <Route exact key="route_1" path="/meals" component={Meals} />,
      <Route exact key="route_2" path="/meals/create" component={MealCreate} />,
      <Route exact key="route_3" path="/meals/:id" component={MealEdit} />
    );
  }

  if (role === Role.Admin || role === Role.Manager) {
    res.push(
      <Route exact key="route_4" path="/users" component={Users} />,
      <Route exact key="route_5" path="/users/create" component={UserCreate} />,
      <Route exact key="route_6" path="/users/:id" component={UserEdit} />
    );
  }

  res.push(<Route exact key="route_7" path="/settings" component={Settings} />);

  if (role === Role.Admin || role === Role.User) {
    res.push(<Redirect key="route_8" to="/meals" />);
  }
  if (role === Role.Manager) {
    res.push(<Redirect key="route_9" to="/users" />);
  }

  return res;
};
