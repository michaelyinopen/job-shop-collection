import React, { useMemo, useContext, useEffect, useCallback } from 'react';
import { lighten, makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
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
  useGetJobSetIsLoading,
  useGetJobSetFailedMessage,
  useJobSetHeaders
} from '../store/useSelectors';
import usePage, { actionCreators as pageActionCreators } from '../functions/usePage';

//#region JobSetHeader
const JobSetHeader = React.memo(({
  jobSetHeader,
  pageDispatch,
  rowIsSelectedFunction,
  index
}) => {
  const isItemSelected = rowIsSelectedFunction(jobSetHeader.id);
  const labelId = `job-set-table-checkbox-${index}`;
  const onClick = () => pageDispatch(pageActionCreators.selectOne(jobSetHeader.id));
  return (
    <TableRow
      hover
      onClick={onClick}
      role="checkbox"
      aria-checked={isItemSelected}
      tabIndex={-1}
      selected={isItemSelected}
    >
      <TableCell padding="checkbox">
        <Checkbox
          checked={isItemSelected}
          inputProps={{ 'aria-labelledby': labelId }}
        />
      </TableCell>
      <TableCell component="th" id={labelId} scope="row" padding="none">
        {jobSetHeader.id}
      </TableCell>
      <TableCell align="left">
        {jobSetHeader.title}
      </TableCell>
      <TableCell align="left">
        <div style={{ width: "700px" }}>
          <Typography noWrap>
            {jobSetHeader.description}
          </Typography>
        </div>
      </TableCell>
    </TableRow>
  );
});
//#endregion JobSetHeader

//#region Table
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  toolbar: { // move
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  tableTitle: { // move
    marginRight: theme.spacing(3)
  },
  highlight: {  //move
    color: theme.palette.text.primary,
    backgroundColor: lighten(theme.palette.secondary.light, 0.5),
  },
  progress: { // move
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

const JobSetTableHead = ({
  pageDispatch,
  selectedCount,
  rowCount,
  order,
  orderBy
}) => {
  const classes = useStyles();
  const onSelectAllClick = () => pageDispatch(pageActionCreators.selectAll());
  const onSort = property => () => pageDispatch(pageActionCreators.requestSort(property));

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={selectedCount > 0 && selectedCount < rowCount}
            checked={selectedCount === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all' }}
          />
        </TableCell>
        <TableCell
          padding="none"
          sortDirection={orderBy === 'id' ? order : false}
        >
          <TableSortLabel
            active={orderBy === 'id'}
            direction={order}
            onClick={onSort('id')}
          >
            Id
            {orderBy === 'id' ? (
              <span className={classes.visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </span>
            ) : null}
          </TableSortLabel>
        </TableCell>
        <TableCell
          align="left"
          sortDirection={orderBy === 'title' ? order : false}
        >
          <TableSortLabel
            active={orderBy === 'title'}
            direction={order}
            onClick={onSort('title')}
          >
            Title
            {orderBy === 'title' ? (
              <span className={classes.visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </span>
            ) : null}
          </TableSortLabel>
        </TableCell>
        <TableCell
          align="left"
          sortDirection={orderBy === 'description' ? order : false}
        >
          <TableSortLabel
            active={orderBy === 'description'}
            direction={order}
            onClick={onSort('description')}
          >
            Description
            {orderBy === 'description' ? (
              <span className={classes.visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </span>
            ) : null}
          </TableSortLabel>
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

const JobSets = React.memo(({
  jobSetHeadersRows,
  isLoading,
  failedMessage,
  jobSetTableHead,
  tablePagination,
  pageDispatch,
  emptyRows,
  rowCount,
  selectedCount,
  rowsPerPage,
  pageIndex,
  rowIsSelectedFunction
}) => {
  const classes = useStyles();
  const dense = rowsPerPage > 10;
  return (
    <Paper className={classes.root}>
      <Toolbar
        className={clsx(classes.toolbar, {
          [classes.highlight]: selectedCount > 0,
        })}
      >
        <div className={classes.tableTitle}>
          {selectedCount > 0
            ? (
              <Typography color="inherit" variant="subtitle1">
                {selectedCount} selected
              </Typography>
            ) : (
              <React.Fragment>
                <Typography variant="h6" id="table-title">
                  Job Sets
                </Typography>
                {isLoading ? <CircularProgress className={classes.progress} /> : null}
                <Typography color="error">
                  {failedMessage}
                </Typography>
              </React.Fragment>
            )
          }
        </div>
      </Toolbar>
      <Table
        className={classes.table}
        aria-labelledby="table-title"
        size={dense ? 'small' : 'medium'}
      >
        <colgroup>
          <col />
          <col style={{ width: '10%' }} />
          <col style={{ width: '30%' }} />
          <col style={{ width: '60%' }} />
        </colgroup>
        {jobSetTableHead}
        <TableBody>
          {jobSetHeadersRows
            .slice(pageIndex * rowsPerPage, pageIndex * rowsPerPage + rowsPerPage)
            .map((jsh, index) => (
              <JobSetHeader
                key={jsh.id}
                jobSetHeader={jsh}
                pageDispatch={pageDispatch}
                rowIsSelectedFunction={rowIsSelectedFunction}
                index={index}
              />
            ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: (dense ? 37 : 53) * emptyRows }}>
              <TableCell colSpan={4} />
            </TableRow>
          )}
        </TableBody>
      </Table>
      {tablePagination}
    </Paper >
  );
});
//#endregion Table

const JobSetsContainer = () => {
  const jobShopCollectionDispatch = useContext(JobShopCollectionDispatchContext);
  const jobSetsRequest = useMemo(
    () => {
      return getJobSetsRequest(
        () => jobShopCollectionDispatch(getJobSetsBegin()),
        (...args) => jobShopCollectionDispatch(getJobSetsSucceed(...args)),
        (...args) => jobShopCollectionDispatch(getJobSetsFailed(...args))
      );
    },
    [jobShopCollectionDispatch]
  );

  useEffect(
    () => {
      jobSetsRequest();
    },
    [jobSetsRequest]
  );

  const jobSetHeaders = useJobSetHeaders();
  const isLoading = useGetJobSetIsLoading();
  const failedMessage = useGetJobSetFailedMessage();

  const [pageState, pageDispatch] = usePage(jobSetHeaders);

  const jobSetHeadersRows = pageState.rows;
  const rowCount = jobSetHeadersRows.length;
  const rowsPerPage = pageState.rowsPerPage;
  const pageIndex = pageState.pageIndex;
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rowCount - pageIndex * rowsPerPage);

  const selected = pageState.selected;
  const selectedCount = selected.length;
  const rowIsSelectedFunction = useCallback(
    id => selected.indexOf(id) !== -1,
    [selected]
  );
  const order = pageState.order;
  const orderBy = pageState.orderBy;

  const onChangePage = useCallback(
    (e, newPageIndex) => pageDispatch(pageActionCreators.changePage(newPageIndex)),
    [pageDispatch]
  );

  const onChangeRowsPerPage = useCallback(
    e => pageDispatch(pageActionCreators.changeRowsPerPage(+e.target.value)),
    [pageDispatch]
  );

  const jobSetTableHead = useMemo(
    () => {
      return (
        <JobSetTableHead
          pageDispatch={pageDispatch}
          selectedCount={selectedCount}
          rowCount={rowCount}
          order={order}
          orderBy={orderBy}
        />
      );
    },
    [pageDispatch, selectedCount, rowCount, order, orderBy]
  );

  const tablePagination = useMemo(
    () => {
      return (
        <TablePagination
          rowsPerPageOptions={[2, 3, 5, 10, 15]}
          component="div"
          count={rowCount}
          rowsPerPage={rowsPerPage}
          page={pageIndex}
          backIconButtonProps={{
            'aria-label': 'previous page',
          }}
          nextIconButtonProps={{
            'aria-label': 'next page',
          }}
          onChangePage={onChangePage}
          onChangeRowsPerPage={onChangeRowsPerPage}
        />
      );
    },
    [rowCount, rowsPerPage, pageIndex, onChangePage, onChangeRowsPerPage]
  );

  return (
    <JobSets
      jobSetHeadersRows={jobSetHeadersRows}
      isLoading={isLoading}
      failedMessage={failedMessage}
      jobSetTableHead={jobSetTableHead}
      tablePagination={tablePagination}
      pageDispatch={pageDispatch}
      rowCount={rowCount}
      selectedCount={selectedCount}
      rowsPerPage={rowsPerPage}
      emptyRows={emptyRows}
      pageIndex={pageIndex}
      rowIsSelectedFunction={rowIsSelectedFunction}
    />
  );
};

export default JobSetsContainer;