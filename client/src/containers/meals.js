import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getFormValues } from "redux-form";

import { deleteMeal, deleteMeals, displayMealFilter } from "../actions/meal";
import DataTable from "../components/data-table";
import PageLayout from "../components/page-layout";
import { Filter } from "../components/filter";
import { FormDatePicker, FormTimePicker } from "../components/form-controls";
import { isGEDate, isLEDate, isGETime, isLETime } from "../utils/date";
import { isEmpty } from "../utils/json";
import { Role } from "../config";

class Meals extends Component {
  componentWillMount() {
    const { meUser } = this.props.meState;

    this.rows = [
      { id: "name", numeric: false, label: "Meal" },
      { id: "calories", numeric: true, label: "Calories" },
      { id: "date", numeric: false, label: "Date" },
      { id: "time", numeric: false, label: "Time" }
    ];

    if (meUser.role === Role.Admin) {
      // insert item into index
      this.rows.splice(1, 0, { id: "userName", numeric: false, label: "User" });
    }
  }

  handleDeleteClick = (e, id) => {
    e.preventDefault();
    this.props.deleteMeal(id);
  };

  handleMultiDeleteClick = (e, ids) => {
    e.preventDefault();
    this.props.deleteMeals(ids);
  };

  displayFilter = visible => id => {
    this.props.displayMealFilter(id, visible);
  };

  getColors = () => {
    const { meals } = this.props.mealState;
    const { meUser } = this.props.meState;
    const { users } = this.props.userState;

    const totalCalories = {};
    for (const meal of meals) {
      if (!totalCalories[meal.userId]) {
        totalCalories[meal.userId] = {};
      }
      if (!totalCalories[meal.userId][meal.date]) {
        totalCalories[meal.userId][meal.date] = meal.calories;
      } else {
        totalCalories[meal.userId][meal.date] += meal.calories;
      }
    }

    const colors = {};
    const setColorsOfUser = user => {
      if (!user) return;
      colors[user.id] = {};
      for (const date in totalCalories[user.id]) {
        colors[user.id][date] =
          totalCalories[user.id][date] > user.goal ? "red" : "green";
      }
    };
    if (!isEmpty(meUser)) {
      if (meUser.role === Role.Admin) {
        for (const userId in totalCalories) {
          const user = users.find(u => u.id === userId);
          setColorsOfUser(user);
        }
      } else {
        setColorsOfUser(meUser);
      }
    }
    return colors;
  };

  getUserNames = () => {
    const { meUser } = this.props.meState;
    const { users } = this.props.userState;

    let userNames = {};
    if (!isEmpty(meUser)) {
      if (meUser.role === Role.Admin) {
        for (const user of users) {
          userNames[user.id] = user.fullname;
        }
      } else {
        userNames[meUser.id] = meUser.fullname;
      }
    }
    return userNames;
  };

  render() {
    const { filterValues, mealState } = this.props;
    const { meals, isFetching, displayedFilters } = mealState;
    const { date_from, date_to, time_from, time_to } = filterValues;
    const userNames = this.getUserNames();
    const colors = this.getColors();

    const filteredMeals = meals
      ? meals
          .filter(
            meal =>
              !(
                (displayedFilters["date_from"] &&
                  date_from &&
                  !isGEDate(meal.date, date_from)) ||
                (displayedFilters["date_to"] &&
                  date_to &&
                  !isLEDate(meal.date, date_to)) ||
                (displayedFilters["time_from"] &&
                  time_from &&
                  !isGETime(meal.time, time_from)) ||
                (displayedFilters["time_to"] &&
                  time_to &&
                  !isLETime(meal.time, time_to))
              )
          )
          .map(meal => ({
            ...meal,
            userName: userNames[meal.userId],
            color:
              (colors[meal.userId] && colors[meal.userId][meal.date]) || "black"
          }))
      : [];

    const filter = (
      <Filter
        formName="mealFilterForm"
        displayedFilters={displayedFilters}
        showFilter={this.displayFilter(true)}
        hideFilter={this.displayFilter(false)}
      >
        <FormDatePicker name="date_from" label="Date from" />
        <FormDatePicker name="date_to" label="Date to" />
        <FormTimePicker name="time_from" label="Time from" />
        <FormTimePicker name="time_to" label="Time to" />
      </Filter>
    );

    return (
      <>
        {!meals && isFetching && (
          <PageLayout>
            <p>Loading meals....</p>
          </PageLayout>
        )}
        {meals && !isFetching && (
          <DataTable
            title="Meals"
            rows={this.rows}
            data={filteredMeals}
            filter={filter}
            onDeleteClick={this.handleDeleteClick}
            onMultiDeleteClick={this.handleMultiDeleteClick}
          />
        )}
      </>
    );
  }
}

Meals.propTypes = {
  filterValues: PropTypes.object
};

Meals.defaultProps = {
  filterValues: {}
};

const mapStateToProps = state => ({
  mealState: state.meal,
  userState: state.user,
  meState: state.me,
  filterValues: getFormValues("mealFilterForm")(state)
});

export default connect(
  mapStateToProps,
  { deleteMeal, deleteMeals, displayMealFilter }
)(Meals);
