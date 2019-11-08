import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from '@material-ui/core';
import { Icon as IconifyIcon } from "@iconify/react";
import githubCircle from '@iconify/icons-mdi/github-circle';
import * as fromRoutePaths from '../routePaths';

const useStyles = makeStyles(theme => ({
  root: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  title: {
    color: "inherit",
    textDecoration: "none",
    marginRight: theme.spacing(3)
  },
  button: {
    margin: theme.spacing(1),
  },
  separator: { flexGrow: 1 },
  container: {
    flex: "1 1 auto",
    position: "relative"
  },
  icon: {
    fontSize: "1.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const JobSetsLink = React.forwardRef((props, ref) => (
  <Link innerRef={ref} to={fromRoutePaths.jobSets} {...props} />
));

const AboutLink = React.forwardRef((props, ref) => (
  <Link innerRef={ref} to={fromRoutePaths.about} {...props} />
));

const Layout = props => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="relative">
        <Toolbar>
          <Link to={fromRoutePaths.home} className={classes.title}>
            <Typography variant="h5">
              Job Shop Collection
            </Typography>
          </Link>
          <Button
            className={classes.button}
            component={JobSetsLink}
            color="inherit"
            variant="outlined"
          >
            Job Sets
              </Button>
          <div className={classes.separator} />
          <IconButton
            className={classes.button}
            color="inherit"
            href="https://github.com/michaelyinopen/job-shop-collection"
            variant="outlined"
          >
            <div className={classes.icon}>
              <IconifyIcon icon={githubCircle} />
            </div>
          </IconButton>
          <Button
            className={classes.button}
            component={AboutLink}
            color="inherit"
            variant="outlined"
          >
            About
            </Button>
        </Toolbar>
      </AppBar>
      <div className={classes.container}>
        {props.children}
      </div>
    </div>
  );
};

export default Layout
