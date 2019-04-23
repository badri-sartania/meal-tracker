import React, { Component } from "react";
import PropTypes from "prop-types";
import { Field, propTypes, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import compose from "recompose/compose";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";

import { fetchMeal, editMeal } from "../actions/meal";
import PageLayout from "../components/page-layout";
import {
  FormInput,
  FormDatePicker,
  FormTimePicker
} from "../components/form-controls";

const styles = theme => ({
  content: {
    maxWidth: 600
  },
  input: {
    marginTop: "1em",
    display: "flex"
  },
  datePicker: {
    flex: 1
  },
  timePicker: {
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

class MealEdit extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;

    this.props.fetchMeal(id);
  }

  onSubmit = meal => {
    const { id } = this.props.match.params;

    this.props.editMeal(id, meal);
    this.props.history.push("/meals");
  };

  render() {
    const { classes, mealState, handleSubmit } = this.props;
    const { isFetching, mealToEdit } = mealState;

    return (
      <PageLayout>
        <div className={classes.content}>
          {!mealToEdit && isFetching && (
            <div>
              <p>Loading meal....</p>
            </div>
          )}
          {mealToEdit && !isFetching && (
            <form onSubmit={handleSubmit(this.onSubmit)}>
              <div className={classes.input}>
                <Field
                  autoFocus
                  id="name"
                  name="name"
                  component={FormInput}
                  label="Meal Name"
                  disabled={isFetching}
                />
              </div>
              <div className={classes.input}>
                <Field
                  id="userId"
                  name="userId"
                  component={FormInput}
                  label="UserId"
                  disabled={true}
                />
              </div>
              <div className={classes.input}>
                <Field
                  id="calories"
                  name="calories"
                  component={FormInput}
                  label="Calories"
                  disabled={isFetching}
                />
              </div>
              <div className={classes.input}>
                <div className={classes.datePicker}>
                  <Field
                    id="date"
                    name="date"
                    component={FormDatePicker}
                    label="Date"
                    disabled={isFetching}
                  />
                </div>
                <div className={classes.timePicker}>
                  <Field
                    id="time"
                    name="time"
                    component={FormTimePicker}
                    label="Time"
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
                  to={"/meals"}
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

MealEdit.propTypes = {
  ...propTypes,
  classes: PropTypes.object
};

const mapStateToProps = state => ({
  mealState: state.meal,
  initialValues: state.meal.mealToEdit
});

const enhance = compose(
  withStyles(styles),
  withRouter,
  connect(
    mapStateToProps,
    { fetchMeal, editMeal }
  ),
  reduxForm({
    form: "mealEdit",
    enableReinitialize: true,
    validate: (values, props) => {
      const errors = {};
      if (!values.name) errors.name = "Required";
      if (!values.calories) errors.calories = "Required";
      if (!values.date) errors.date = "Required";
      if (!values.time) errors.time = "Required";
      return errors;
    }
  })
);

export default enhance(MealEdit);
