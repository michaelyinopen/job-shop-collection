import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: theme.palette.background.default,
    paddingTop: theme.spacing(1),
    height: "100%"
  }
}));

const About = () => {
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <h1>About</h1>
      Michael Yin implemented this application to demonstrate what he learned.
    </Container>
  )
};

export default About;
