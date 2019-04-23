import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../theme";

import Home from "./home";
import Register from "./register";
import Login from "./login";

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <>
          <CssBaseline />
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route component={Home} />
          </Switch>
        </>
      </MuiThemeProvider>
    );
  }
}

export default App;
