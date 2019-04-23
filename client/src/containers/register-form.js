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

import { registerUser } from "../actions/authentication";
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

class RegisterForm extends Component {
  register = async user => {
    try {
      await this.props.registerUser(user);
    } catch (error) {
      if (error.response) {
        throw new SubmissionError(error.response.data);
      }
    }
  };

  render() {
    const { classes, isFetching, handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.register)}>
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
              id="fullname"
              name="fullname"
              component={FormInput}
              label="Full Name"
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
            {"Sign Up"}
          </Button>
          <Typography className={classes.subtitle} align="center">
            Already have an account? <Link to="/login">Login</Link>
          </Typography>
        </CardContent>
      </form>
    );
  }
}

RegisterForm.propTypes = {
  ...propTypes,
  classes: PropTypes.object
};

const mapStateToProps = state => ({ isFetching: state.auth.isFetching });

const enhance = compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { registerUser }
  ),
  reduxForm({
    form: "signUp",
    validate: (values, props) => {
      const errors = {};
      if (!values.email) errors.email = "Required";
      if (!values.fullname) errors.fullname = "Required";
      if (!values.password) errors.password = "Required";
      return errors;
    }
  })
);

export default enhance(RegisterForm);
