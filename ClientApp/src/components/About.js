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
      <h2> Releases </h2>
      <h3> 1.0.0-alpha.4 (18 Oct 2019)</h3>
      <ul>
        <li>View Entire Job Set</li>
      </ul>
      <h3> 1.0.0-alpha.3 (16 Oct 2019)</h3>
      <ul>
        <li>View Job Set</li>
        <li>Disable delete</li>
      </ul>
      <h3> 1.0.0-alpha.2 (15 Oct 2019)</h3>
      <ul>
        <li>Front page explaining the job shop problem</li>
        <li>About page added Release</li>
        <li>Added sample data to database</li>
        <li>Remove non-functional parts</li>
      </ul>
      <h3> 1.0.0-alpha.1 (12 Oct 2019)</h3>
      Published app and database to azure.
    </Container>
  )
};

export default About;