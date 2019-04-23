import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import compose from "recompose/compose";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";

import { resetError } from "../actions/error";
import UnsplashImage from "../components/unsplash-image";
import CustomSnackbarContent from "../components/custom-snack-bar-content";
import RegisterForm from "./register-form";

const styles = {
  card: {
    minWidth: 300,
    marginTop: "6em"
  },
  heading: {
    margin: "1em 1em 0"
  }
};

class Register extends Component {
  state = {
    showError: false,
    errorMessage: ""
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  componentDidUpdate() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }

    const { error } = this.props.errorState;
    if (error && error.message) {
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

  render() {
    const { classes } = this.props;

    return (
      <UnsplashImage>
        <Card className={classes.card}>
          <Typography className={classes.heading} variant="h5" align="center">
            Welcome!
          </Typography>
          <RegisterForm />
        </Card>
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
      </UnsplashImage>
    );
  }
}

Register.propTypes = {
  auth: PropTypes.object.isRequired,
  classes: PropTypes.object
};

const mapStateToProps = state => ({
  auth: state.auth,
  errorState: state.error
});

const enhance = compose(
  withStyles(styles),
  withRouter,
  connect(
    mapStateToProps,
    { resetError }
  )
);

export default enhance(Register);
