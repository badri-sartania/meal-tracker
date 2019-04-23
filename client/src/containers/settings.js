import React, { Component } from "react";
import PropTypes from "prop-types";
import { Field, propTypes, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import compose from "recompose/compose";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";

import { fetchMe, editMe } from "../actions/me";
import PageLayout from "../components/page-layout";
import { FormInput } from "../components/form-controls";

const styles = theme => ({
  content: {
    maxWidth: 600
  },
  input: {
    marginTop: "1em"
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  actions: {
    display: "flex",
    marginTop: "5em"
  },
  cancelButton: {
    marginLeft: "auto"
  }
});

class Settings extends Component {
  componentDidMount() {
    this.props.fetchMe();
  }

  onSubmit = user => {
    this.props.editMe(user);

    this.handleClose();
  };

  handleClose = () => {
    const { location, history } = this.props;
    if (location.state) {
      return history.push(location.state.from);
    }
    history.push("/");
  };

  render() {
    const { classes, meState, handleSubmit } = this.props;
    const { isFetching, meUser } = meState;

    return (
      <PageLayout>
        <div className={classes.content}>
          {!meUser && isFetching && (
            <div>
              <p>Loading settings....</p>
            </div>
          )}
          {meUser && !isFetching && (
            <form onSubmit={handleSubmit(this.onSubmit)}>
              <div className={classes.input}>
                <Field
                  id="email"
                  name="email"
                  component={FormInput}
                  label="Email"
                  type="email"
                  disabled={true}
                />
              </div>
              <div className={classes.input}>
                <Field
                  autoFocus
                  id="fullname"
                  name="fullname"
                  component={FormInput}
                  label="Full Name"
                  disabled={isFetching}
                />
              </div>
              <div className={classes.input}>
                <Field
                  id="role"
                  name="role"
                  component={FormInput}
                  label="Role"
                  disabled={true}
                />
              </div>
              <div className={classes.input}>
                <Field
                  id="goal"
                  name="goal"
                  component={FormInput}
                  label="Calorie Goal"
                  disabled={isFetching}
                />
              </div>
              <div className={classes.actions}>
                <Button
                  variant="contained"
                  type="submit"
                  color="primary"
                  disabled={isFetching}
                >
                  <SaveIcon className={classes.leftIcon} />
                  {"Save"}
                </Button>
                <Button
                  color="primary"
                  disabled={isFetching}
                  className={classes.cancelButton}
                  onClick={this.handleClose}
                >
                  {"Cancel"}
                </Button>
              </div>
            </form>
          )}
        </div>
      </PageLayout>
    );
  }
}

Settings.propTypes = {
  ...propTypes,
  classes: PropTypes.object
};

const mapStateToProps = state => ({
  meState: state.me,
  initialValues: state.me.meUser
});

const enhance = compose(
  withStyles(styles),
  withRouter,
  connect(
    mapStateToProps,
    { fetchMe, editMe }
  ),
  reduxForm({
    form: "settings",
    enableReinitialize: true,
    validate: (values, props) => {
      const errors = {};
      if (!values.fullname) errors.fullname = "Required";
      if (!values.email) errors.email = "Required";
      if (!values.goal) errors.goal = "Required";
      return errors;
    }
  })
);

export default enhance(Settings);
