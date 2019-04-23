import React, { Component } from "react";
import PropTypes from "prop-types";
import { propTypes, reduxForm } from "redux-form";
import classnames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import compose from "recompose/compose";
import withProps from "recompose/withProps";

import FilterFormInput from "./filter-form-input";

const styles = theme => ({
  form: {
    display: "flex",
    alignItems: "flex-end",
    flexWrap: "wrap"
  },
  body: { display: "flex", alignItems: "flex-end" },
  spacer: { width: theme.spacing.unit },
  icon: { color: "#00bcd4", paddingBottom: 0 },
  clearFix: { clear: "right" }
});

export class FilterForm extends Component {
  getShownFilters() {
    const { filters, displayedFilters } = this.props;

    return filters.filter(
      filterElement => displayedFilters[filterElement.props.name]
    );
  }

  handleHide = event => {
    this.props.hideFilter(event.currentTarget.dataset.key);
  };

  render() {
    const { classes, className } = this.props;

    return (
      <div className={classnames(className, classes.form)}>
        {this.getShownFilters().map(filterElement => (
          <FilterFormInput
            key={filterElement.props.name}
            filterElement={filterElement}
            handleHide={this.handleHide}
            classes={classes}
          />
        ))}
        <div className={classes.clearFix} />
      </div>
    );
  }
}

FilterForm.propTypes = {
  ...propTypes,
  formName: PropTypes.string.isRequired,
  classes: PropTypes.object,
  className: PropTypes.string,
  filters: PropTypes.arrayOf(PropTypes.node).isRequired,
  displayedFilters: PropTypes.object.isRequired
};

const enhance = compose(
  withStyles(styles),
  withProps(props => ({ form: props.formName })),
  reduxForm({
    destroyOnUnmount: false // do not destroy to preserve state across navigation
  })
);

export default enhance(FilterForm);
