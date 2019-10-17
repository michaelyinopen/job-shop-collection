import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Container from '@material-ui/core/Container';
import * as fromRoutePaths from '../routePaths';

const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: theme.palette.background.default,
    paddingTop: theme.spacing(1),
    height: "100%"
  },
  examplesLink: {
    margin: theme.spacing(2),
  }
}));

const ExamplesLink = React.forwardRef((props, ref) => (
  <Link innerRef={ref} to={fromRoutePaths.jobSets} {...props} />
));

const Home = () => {
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <h1>Job Shop Collection</h1>
      <p>
        Welcome to Job Shop Collection where you can find examples of the The Job Shop Scheduling Problem.<br />
        <Fab
          component={ExamplesLink}
          variant="extended"
          size="medium"
          color="primary"
          className={classes.examplesLink}
        >
          View the examples now
        </Fab>
      </p>
      <h3>About The Job Shop Scheduling Problem</h3>
      <p>
        The Job Shop Problem is a scheduling problem, in which multiple jobs are processed on several machines.
        Each job consists of a sequence of tasks, which must be performed in a given order, and each task must be processed on a specific machine.
      </p>
      <p>
        The solution of the problem is a schedule, which describes clearly how the tasks are scheduled on the machines. This schedule provides visibility and control over the production process and ultimately boost production efficiency.
      </p>
      <p>
        References
      </p>
      <ul>
        <li><a href='https://en.wikipedia.org/wiki/Job_shop_scheduling'>Wikipedia</a></li>
        <li><a href='https://developers.google.com/optimization/scheduling/job_shop'>Google OR-Tools</a></li>
      </ul>
      <h3>This application is built with</h3>
      <ul>
        <li><a href='https://facebook.github.io/react/'>React</a> for client-side code</li>
        <li><a href='https://get.asp.net/'>ASP.NET Core</a> and <a href='https://msdn.microsoft.com/en-us/library/67ef8sbd.aspx'>C#</a> for server-side code</li>
        <li><a href='https://material-ui.com/'>Material-ui</a> for layout and styling</li>
        <li><a href='https://azure.microsoft.com/'>Azure</a> for hosting Web App and database</li>
      </ul>
    </Container>
  );
}

export default Home;