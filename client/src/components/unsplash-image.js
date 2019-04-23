import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";

const styles = {
  main: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    height: "1px",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundImage: "url('https://source.unsplash.com/1600x900/daily?calorie')"
  }
};

const UnsplashImage = ({ classes, children }) => (
  <div className={classes.main}>{children}</div>
);

UnsplashImage.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(UnsplashImage);
