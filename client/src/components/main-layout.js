import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter, NavLink, Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import compose from "recompose/compose";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

import grey from "@material-ui/core/colors/grey";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitIcon from "@material-ui/icons/PowerSettingsNew";

import { logoutUser } from "../actions/authentication";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex"
  },
  grow: {
    flexGrow: 1
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  drawerPaper: {
    width: drawerWidth
  },
  active: {
    backgroundColor: grey[200]
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  content: {
    flexGrow: 1,
    overflow: "scroll",
    padding: theme.spacing.unit * 3
  },
  toolbar: theme.mixins.toolbar
});

class MainLayout extends Component {
  state = {
    anchorEl: null,
    mobileOpen: false
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleLogout = () => {
    this.handleClose();

    this.props.logoutUser();
  };

  render() {
    const { classes, children, drawerItems } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    const appBar = (
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="Menu"
          onClick={this.handleDrawerToggle}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" color="inherit" className={classes.grow}>
          Meal Tracker
        </Typography>

        <>
          <IconButton
            aria-owns={open ? "menu-appbar" : undefined}
            aria-haspopup="true"
            onClick={this.handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
            open={open}
            onClose={this.handleClose}
          >
            <MenuItem
              onClick={this.handleClose}
              component={Link}
              to={{
                pathname: "/settings",
                state: { from: this.props.location.pathname }
              }}
            >
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText inset primary="Settings" />
            </MenuItem>
            <MenuItem onClick={this.handleLogout}>
              <ListItemIcon>
                <ExitIcon />
              </ListItemIcon>
              <ListItemText inset primary="Logout" />
            </MenuItem>
          </Menu>
        </>
      </Toolbar>
    );

    const drawer = (
      <>
        <Hidden xsDown>
          <div className={classes.toolbar} />
        </Hidden>

        <List>
          {drawerItems.map(drawerItem => (
            <ListItem
              key={drawerItem.text}
              button
              component={NavLink}
              to={drawerItem.to}
              activeClassName={classes.active}
              onClick={drawerItem.onClick}
            >
              <ListItemIcon>{drawerItem.icon}</ListItemIcon>
              <ListItemText primary={drawerItem.text} />
            </ListItem>
          ))}
        </List>
      </>
    );

    return (
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.appBar}>
          {appBar}
        </AppBar>

        <nav className={classes.drawer}>
          <Hidden smUp>
            <Drawer
              container={this.props.container}
              variant="temporary"
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown>
            <Drawer
              classes={{
                paper: classes.drawerPaper
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>

        <main className={classes.content}>
          <div className={classes.toolbar} />
          {children}
        </main>
      </div>
    );
  }
}

MainLayout.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  drawerItems: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.node.isRequired,
      text: PropTypes.string.isRequired,
      to: PropTypes.string.isRequired
    })
  ).isRequired
};

const mapStateToProps = state => ({});

const enhance = compose(
  withStyles(styles),
  withRouter,
  connect(
    mapStateToProps,
    { logoutUser }
  )
);

export default enhance(MainLayout);
