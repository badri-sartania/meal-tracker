import React from "react";
import PropTypes from "prop-types";
import { Field } from "redux-form";
import IconButton from "@material-ui/core/IconButton";
import ActionHide from "@material-ui/icons/HighlightOff";

const FilterFormInput = ({ filterElement, handleHide, classes }) => (
  <div data-source={filterElement.props.name} className={classes.body}>
    <IconButton
      className="hide-filter"
      onClick={handleHide}
      data-key={filterElement.props.name}
      tooltip={"Remove filter"}
    >
      <ActionHide />
    </IconButton>

    <Field
      {...filterElement.props}
      name={filterElement.props.name}
      component={filterElement.type}
    />

    <div className={classes.spacer}>&nbsp;</div>
  </div>
);

FilterFormInput.propTypes = {
  filterElement: PropTypes.node,
  handleHide: PropTypes.func,
  classes: PropTypes.object
};

export default FilterFormInput;
