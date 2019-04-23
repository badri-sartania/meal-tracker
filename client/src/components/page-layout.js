import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2
  }
});

class PageLayout extends Component {
  render() {
    const { classes, children } = this.props;
    return <Paper className={classes.root}>{children}</Paper>;
  }
}

export default withStyles(styles)(PageLayout);
