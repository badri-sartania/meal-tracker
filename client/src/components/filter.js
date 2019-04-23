import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import FilterForm from "./filter-form";

const styles = {
  form: {}
};

export class Filter extends Component {
  render() {
    const {
      formName,
      classes = {},
      children,
      displayedFilters,
      filterValues,
      showFilter,
      hideFilter,
      ...rest
    } = this.props;

    return (
      <FilterForm
        formName={formName}
        className={classes.form}
        filters={React.Children.toArray(children)}
        hideFilter={hideFilter}
        displayedFilters={displayedFilters}
        initialValues={filterValues}
        {...rest}
      />
    );
  }
}

Filter.propTypes = {
  formName: PropTypes.string.isRequired,
  children: PropTypes.node,
  classes: PropTypes.object,
  displayedFilters: PropTypes.object,
  filterValues: PropTypes.object,
  showFilter: PropTypes.func,
  hideFilter: PropTypes.func
};

Filter.defaultProps = {
  displayedFilters: {},
  filterValues: {}
};

export default withStyles(styles)(Filter);
