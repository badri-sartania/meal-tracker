import React, { Component } from "react";
import PropTypes from "prop-types";
import { Field, propTypes, reduxForm, SubmissionError } from "redux-form";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import compose from "recompose/compose";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";

import { loginUser } from "../actions/authentication";
import { FormInput } from "../components/form-controls";

const styles = () => ({
  form: {
    padding: "0 1em 1em 1em"
  },
  input: {
    marginTop: "1em"
  },
  subtitle: {
    marginTop: "1.5em"
  },
  button: {
    marginTop: "1em",
    width: "100%"
  }
});

class LoginForm extends Component {
  login = async user => {
    try {
      await this.props.loginUser(user);
    } catch (error) {
      if (error.response) {
        throw new SubmissionError(error.response.data);
      }
    }
  };

  render() {
    const { classes, isFetching, handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.login)}>
        <CardContent>
          <div className={classes.input}>
            <Field
              autoFocus
              id="email"
              name="email"
              component={FormInput}
              label="Email"
              type="email"
              disabled={isFetching}
            />
          </div>
          <div className={classes.input}>
            <Field
              id="password"
              name="password"
              component={FormInput}
              label="Password"
              type="password"
              disabled={isFetching}
            />
          </div>
          <Button
            variant="contained"
            type="submit"
            color="primary"
            disabled={isFetching}
            className={classes.button}
          >
            {isFetching && <CircularProgress size={25} thickness={2} />}
            {"Sign In"}
          </Button>
          <Typography className={classes.subtitle} align="center">
            Don't you have an account?
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            disabled={isFetching}
            className={classes.button}
            component={Link}
            to="/register"
          >
            {"Register"}
          </Button>
        </CardContent>
      </form>
    );
  }
}

LoginForm.propTypes = {
  ...propTypes,
  classes: PropTypes.object
};

const mapStateToProps = state => ({
  isFetching: state.auth.isFetching,
  auth: state.auth
});

const enhance = compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { loginUser }
  ),
  reduxForm({
    form: "signIn",
    validate: (values, props) => {
      const errors = {};
      if (!values.email) errors.email = "Required";
      if (!values.password) errors.password = "Required";
      return errors;
    }
  })
);

export default enhance(LoginForm);
