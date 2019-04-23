import React, { Component } from "react";
import PropTypes from "prop-types";
import { Field, propTypes, reduxForm, SubmissionError } from "redux-form";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import compose from "recompose/compose";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";

import { fetchUser, editUser } from "../actions/user";
import PageLayout from "../components/page-layout";
import { FormInput, FormRoleSelect } from "../components/form-controls";

const styles = theme => ({
  content: {
    maxWidth: 600
  },
  input: {
    marginTop: "1em",
    display: "flex"
  },
  roleInput: {
    flex: 1
  },
  goalInput: {
    flex: 1,
    marginLeft: theme.spacing.unit
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

class UserEdit extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;

    this.props.fetchUser(id);
  }

  onSubmit = async user => {
    try {
      const { id } = this.props.match.params;
      await this.props.editUser(id, user);
      this.props.history.push("/users");
    } catch (error) {
      if (error.response) {
        throw new SubmissionError(error.response.data);
      }
    }
  };

  render() {
    const { classes, userState, handleSubmit } = this.props;
    const { isFetching, userToEdit } = userState;

    return (
      <PageLayout>
        <div className={classes.content}>
          {!userToEdit && isFetching && (
            <div>
              <p>Loading user....</p>
            </div>
          )}
          {userToEdit && !isFetching && (
            <form onSubmit={handleSubmit(this.onSubmit)}>
              <div className={classes.input}>
                <Field
                  id="id"
                  name="id"
                  component={FormInput}
                  label="Id"
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
                  id="email"
                  name="email"
                  component={FormInput}
                  label="Email"
                  type="email"
                  disabled={isFetching}
                />
              </div>
              <div className={classes.input}>
                <div className={classes.roleInput}>
                  <Field
                    id="role"
                    name="role"
                    component={FormRoleSelect}
                    label="Role"
                    disabled={isFetching}
                  />
                </div>
                <div className={classes.goalInput}>
                  <Field
                    id="goal"
                    name="goal"
                    component={FormInput}
                    label="Calorie Goal"
                    disabled={isFetching}
                  />
                </div>
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
                  component={Link}
                  to={"/users"}
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

UserEdit.propTypes = {
  ...propTypes,
  classes: PropTypes.object
};

const mapStateToProps = state => ({
  userState: state.user,
  initialValues: state.user.userToEdit
});

const enhance = compose(
  withStyles(styles),
  withRouter,
  connect(
    mapStateToProps,
    { fetchUser, editUser }
  ),
  reduxForm({
    form: "userEdit",
    enableReinitialize: true,
    validate: (values, props) => {
      const errors = {};
      if (!values.fullname) errors.fullname = "Required";
      if (!values.email) errors.email = "Required";
      if (!values.role) errors.role = "Required";
      if (!values.goal) errors.goal = "Required";
      return errors;
    }
  })
);

export default enhance(UserEdit);
