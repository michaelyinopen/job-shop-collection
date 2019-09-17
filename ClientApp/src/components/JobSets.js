import React, { useMemo, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
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
  useGetJobSetFailedMessage,
  useJobSetHeader
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
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  }
}));

const JobSetHeader = React.memo(({
  id,
  title,
  description
}) => {
  return (
    <TableRow>
      <TableCell padding="checkbox">
        <Checkbox
          checked={false}
        />
      </TableCell>
      <TableCell component="th" scope="row" padding="none">
        {id}
      </TableCell>
      <TableCell align="left">
        {title}
      </TableCell>
      <TableCell align="left">
        <div style={{ width: "700px" }}>
          <Typography noWrap>
            {description}
          </Typography>
        </div>
      </TableCell>
    </TableRow>
  );
});

const JobSetHeaderContainer = ({
  id
}) => {
  const { title, description, eTag } = useJobSetHeader(id);
  return (
    <JobSetHeader
      id={id}
      title={title}
      description={description}
    />
  );
};


const EnhancedTableHead = ({
  classes,
  onSelectAllClick,
  order,
  orderBy,
  numSelected,
  rowCount,
  onRequestSort
}) => {
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    {/*<TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={order}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
              */}
  );
}

const JobSets = React.memo(({
  jobSetIds,
  isLoading,
  failedMessage,
  emptyRows
}) => {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Toolbar>
        <div className={classes.tableTitle}>
          <Typography variant="h6">
            Job Sets
              </Typography>
        </div>
        {isLoading ? <CircularProgress className={classes.progress} /> : null}
        <Typography color="error">
          {failedMessage}
        </Typography>
      </Toolbar>
      <Table className={classes.table}>
        <colgroup>
          <col />
          <col style={{ width: '10%' }} />
          <col style={{ width: '30%' }} />
          <col style={{ width: '60%' }} />
        </colgroup>
        {/*
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            */}
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                indeterminate={false}
                checked={false}
              />
            </TableCell>
            <TableCell padding="none">Id</TableCell>
            <TableCell align="left">Title</TableCell>
            <TableCell align="left">Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {jobSetIds.map(id => (
            <JobSetHeaderContainer key={id} id={id} />
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={4} />
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={4}
        rowsPerPage={10}
        page={0}
        backIconButtonProps={{
          'aria-label': 'previous page',
        }}
        nextIconButtonProps={{
          'aria-label': 'next page',
        }}
        onChangePage={() => { }}
        onChangeRowsPerPage={() => { }}
      />
    </Paper>
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
      emptyRows={6}
    />
  );
};

export default JobSetsContainer;