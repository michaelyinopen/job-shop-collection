import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

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
  rightButton: {
    marginLeft: "auto"
  },
  container: {
    flex: "1 1 auto"
  }
}));

const JobSetsLink = React.forwardRef((props, ref) => (
  <Link innerRef={ref} to="/job-sets/" {...props} />
));

const Layout = props => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="relative">
        <Toolbar>
          <Link to="/" className={classes.title}>
            <Typography variant="h5">
              Job Shop Collection
            </Typography>
          </Link>
          <Button className={classes.button} component={JobSetsLink} color="inherit">Job Sets</Button>
          <Button className={classes.rightButton} color="inherit">About</Button>{/*todo change to link component*/}
        </Toolbar>
      </AppBar>
      <div className={classes.container}>
        {props.children}
      </div>
    </div>
  );
};

export default Layout
