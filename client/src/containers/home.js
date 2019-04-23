import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Switch } from "react-router-dom";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import PeopleIcon from "@material-ui/icons/People";
import Snackbar from "@material-ui/core/Snackbar";

import MainLayout from "../components/main-layout";
import CustomSnackbarContent from "../components/custom-snack-bar-content";
import HomeRoutes from "./home-routes";
import { logoutUser } from "../actions/authentication";
import { fetchMeals } from "../actions/meal";
import { fetchUsers } from "../actions/user";
import { fetchMe } from "../actions/me";
import { resetError } from "../actions/error";
import { Role, ErrorCode } from "../config";

const { INVALID_TOKEN } = ErrorCode;

class Home extends Component {
  state = {
    showError: false,
    errorMessage: ""
  };

  async componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      return this.props.history.push("/login");
    }

    const reducer = await this.props.fetchMe();
    if (reducer && reducer.action && reducer.action.payload.data) {
      const meUser = reducer.action.payload.data;
      if (meUser.role === Role.Admin || meUser.role === Role.User) {
        await this.props.fetchMeals();
      }
      if (meUser.role === Role.Admin || meUser.role === Role.Manager) {
        await this.props.fetchUsers();
      }
    } else {
      setTimeout(() => this.props.logoutUser(), 2000);
    }
  }

  componentDidUpdate() {
    if (!this.props.auth.isAuthenticated) {
      return this.props.history.push("/login");
    }

    const { error } = this.props.errorState;
    if (error && error.message) {
      if (error.code && error.code === INVALID_TOKEN) {
        setTimeout(() => this.props.logoutUser(), 2000);
      }

      this.setState({
        showError: true,
        errorMessage: error.message
      });
      this.props.resetError();
    }
  }

  handleCloseError = (_, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ showError: false });
  };

  handleClickMeals = () => {
    this.props.fetchMeals();
  };

  handleClickUsers = () => {
    this.props.fetchUsers();
  };

  getDrawerItems = () => {
    const { meUser } = this.props.meState;
    let drawerItems = [];

    if (meUser.role === Role.Admin || meUser.role === Role.User) {
      drawerItems.push({
        icon: <RestaurantIcon />,
        text: "Meals",
        to: "/meals",
        onClick: this.handleClickMeals
      });
    }
    if (meUser.role === Role.Admin || meUser.role === Role.Manager) {
      drawerItems.push({
        icon: <PeopleIcon />,
        text: "Users",
        to: "/users",
        onClick: this.handleClickUsers
      });
    }

    return drawerItems;
  };

  render() {
    const { meUser } = this.props.meState;

    return (
      <MainLayout drawerItems={this.getDrawerItems()}>
        <Switch>{HomeRoutes(meUser.role)}</Switch>

        <Snackbar
          open={this.state.showError}
          autoHideDuration={3000}
          onClose={this.handleCloseError}
        >
          <CustomSnackbarContent
            onClose={this.handleCloseError}
            variant="error"
            message={this.state.errorMessage}
          />
        </Snackbar>
      </MainLayout>
    );
  }
}

Home.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  meState: state.me,
  errorState: state.error
});

export default connect(
  mapStateToProps,
  { logoutUser, fetchMeals, fetchUsers, fetchMe, resetError }
)(Home);
