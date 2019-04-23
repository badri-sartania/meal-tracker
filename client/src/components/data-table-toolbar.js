import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import compose from "recompose/compose";
import { Link, withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import { lighten } from "@material-ui/core/styles/colorManipulator";
import PlusIcon from "@material-ui/icons/Add";

import { DataTableContext } from "./data-table-context";
import { FilterButton } from "./filter-button";

const styles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
    justifyContent: "space-between"
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  actions: {
    display: "flex",
    color: theme.palette.text.secondary,
    flexWrap: "wrap"
  },
  margin: {
    margin: theme.spacing.unit
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  }
});

class DataTableToolbar extends Component {
  render() {
    const { numSelected, classes } = this.props;
    const { filter } = this.context;

    return (
      <Toolbar
        className={classNames(classes.root, {
          [classes.highlight]: numSelected > 0
        })}
      >
        <div className={classes.title}>
          {numSelected > 0 ? (
            <Typography color="inherit" variant="subtitle1">
              {numSelected} selected
            </Typography>
          ) : (
            filter
          )}
        </div>

        <span />
        <div className={classes.actions}>
          {numSelected > 0 ? (
            <Tooltip title="Delete">
              <IconButton
                aria-label="Delete"
                onClick={this.props.onMultiDeleteClick}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <>
              <FilterButton />
              <Button
                color="primary"
                size="medium"
                className={classes.margin}
                component={Link}
                to={this.props.match.path + "/create"}
              >
                <PlusIcon className={classes.leftIcon} />
                Create
              </Button>
            </>
          )}
        </div>
      </Toolbar>
    );
  }
}

DataTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onMultiDeleteClick: PropTypes.func
};

const enhance = compose(
  withStyles(styles),
  withRouter
);

export default enhance(DataTableToolbar);

DataTableToolbar.contextType = DataTableContext;
