import React, { useMemo, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import JobShopCollectionDispatchContext from './JobShopCollectionDispatchContext';
import {
  getJobSetsBegin,
  getJobSetsSucceed,
  getJobSetsFailed
} from '../store/actionCreators';
import getJobSetsRequest from '../requests/getJobSetsRequest'
import {
  useJobSetIds,
  useGetJobSetIsLoading,
  useGetJobSetFailedMessage
} from '../store/useSelectors';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  tableTitle: {
    marginRight: theme.spacing(3)
  },
  progress: {
    marginRight: theme.spacing(3)
  },
  table: {
    minWidth: 650,
  },
  lightBackground: {
    backgroundColor: "#f5f5f5",
    boxSizing: "border-box",
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  }
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const JobSetHeader = React.memo(({
  id,
  title,
  description
}) => {
  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {id}
      </TableCell>
      <TableCell align="left">{title}</TableCell>
    </TableRow>
  );
});

const JobSetHeaderContainer = ({
  id
}) => {
  return (
    <JobSetHeader
      id={id}
    />
  );
};

const JobSets = React.memo(({
  jobSetIds,
  isLoading,
  failedMessage
}) => {
  const classes = useStyles();
  return (
    <article>
      <h1>Job Sets</h1>
      <Container className={classes.lightBackground}>
        <Paper className={classes.root}>
          <Toolbar>
            <div className={classes.tableTitle}>
              <Typography variant="h6">
                Job Sets
              </Typography>
            </div>
            {isLoading ? <CircularProgress className={classes.progress} /> : null}
            {failedMessage}
          </Toolbar>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell align="left">Title</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {jobSetIds.map(id => (
                <JobSetHeaderContainer key={id} id={id} />
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Container >
    </article>
  );
});

const JobSetsContainer = () => {
  const dispatch = useContext(JobShopCollectionDispatchContext);
  const jobSetsRequest = useMemo(
    () => {
      return getJobSetsRequest(
        () => dispatch(getJobSetsBegin()),
        (...args) => dispatch(getJobSetsSucceed(...args)),
        (...args) => dispatch(getJobSetsFailed(...args))
      );
    },
    [dispatch]
  );

  useEffect(
    () => {
      jobSetsRequest();
    },
    [jobSetsRequest]
  );

  const jobSetIds = useJobSetIds();
  const isLoading = useGetJobSetIsLoading();
  const failedMessage = useGetJobSetFailedMessage();

  return (
    <JobSets
      jobSetIds={jobSetIds}
      isLoading={isLoading}
      failedMessage={failedMessage}
    />
  );
};

export default JobSetsContainer;