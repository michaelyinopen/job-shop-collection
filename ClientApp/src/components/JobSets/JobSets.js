import React, { useMemo, useContext, useEffect, useCallback, useState } from 'react';
import queryString from 'query-string';
import { generatePath } from 'react-router';
import useReactRouter from 'use-react-router';
import { lighten, makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
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
import { green, red } from '@material-ui/core/colors';
import CheckIcon from '@material-ui/icons/Check';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ForwardIcon from '@material-ui/icons/Forward';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import RefreshIcon from '@material-ui/icons/Refresh';
import preventDefaultPropagation from '../../functions/preventDefaultPropagation';
import { jobSet as jobSetPath } from '../../routePaths';
import JobShopCollectionDispatchContext from '../JobShopCollectionDispatchContext';
import {
  getJobSetsBegin,
  getJobSetsSucceed,
  getJobSetsFailed,
  deleteJobSetBegin,
  deleteJobSetSucceed,
  deleteJobSetFailed,
  clearDeletingJobSets,
} from '../../store/actionCreators';
import getJobSetsRequest from '../../requests/getJobSetsRequest'
import {
  useGetJobSetIsLoading,
  useGetJobSetFailedMessage,
  useJobSetHeaders,
  useJobSetDeleting,
  useJobSetSomeDeleting,
  useSelectedJobSets
} from '../../store/useSelectors';
import { deleteJobSetsApiAsync } from '../../api';
import usePage, { actionCreators as pageActionCreators } from './usePage';

const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: theme.palette.background.default,
    paddingTop: theme.spacing(1)
  },
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  toolbar: { // move
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    display: "flex",
  },
  toolbarHighlight: {  //move
    color: theme.palette.text.primary,
    backgroundColor: lighten(theme.palette.secondary.light, 0.5),
  },
  toolbarDeleteButton: {
    marginLeft: "auto"
  },
  withProgressWrapper: {
    position: 'relative',
  },
  progressOnButton: {
    position: 'absolute',
    zIndex: 1,
    top: theme.spacing(0.5),
    left: theme.spacing(0.5),
  },
  tableTitle: { // move
    marginRight: theme.spacing(3),
  },
  table: {
    minWidth: 650,
  },
  rowWithMenu: {
    backgroundColor:
      theme.palette.type === 'light'
        ? 'rgba(0, 0, 0, 0.07)' // grey[200]
        : 'rgba(255, 255, 255, 0.14)',
  },
  descriptionCell: {
    width: '700px',
  },
  actionsFlexbox: {
    display: 'flex',
    justifyContent: 'space-evenly'
  },
  buttonSuccess: {
    backgroundColor: green[500],
  },
  buttonFailed: {
    backgroundColor: red[500],
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

//#region title / toolbar
const ToolbarDeleteButton = React.memo(({
  onDelete,
  isDeleting,
}) => {
  const classes = useStyles();
  return (
    <div className={clsx(classes.withProgressWrapper, classes.toolbarDeleteButton)}>
      <IconButton onClick={onDelete}>
        <DeleteIcon />
      </IconButton>
      {isDeleting ? <CircularProgress className={classes.progressOnButton} /> : null}
    </div>
  );
});

const deleteOneJobSetFromSelected = async (jobSet, dispatch) => {
  const { id } = jobSet;
  dispatch(deleteJobSetBegin(id));
  try {
    await deleteJobSetsApiAsync(id, jobSet.eTag);
    dispatch(deleteJobSetSucceed(id, false));
    return true;
  }
  catch (e) {
    dispatch(deleteJobSetFailed(id, false));
    return false;
  }
};

const ToolbarDeleteButtonContainer = ({
  selected,
  reloadCallback
}) => {
  const isSomeDeleting = useJobSetSomeDeleting();
  const selectedJobSets = useSelectedJobSets(selected);
  const dispatch = useContext(JobShopCollectionDispatchContext);
  const onDelete = useMemo(
    () => {
      let isDeleting = false;
      const getIsDeleting = () => isDeleting;
      const callback = () => {
        if (getIsDeleting()) {
          return;
        }
        if (selectedJobSets.length === 0) {
          return;
        }
        if (!window.confirm(`Do you want to permanently delete ${selectedJobSets.length} Job Sets?`)) {
          return;
        }
        const deleteJobSetsAsync = async () => {
          isDeleting = true;
          const deleteJobSetsPromises = selectedJobSets.map(js => deleteOneJobSetFromSelected(js, dispatch));
          const results = await Promise.all(deleteJobSetsPromises);
          const selectedJobSetsCount = selectedJobSets.length;
          const successfulDeletesCount = results.filter(r => r).length;
          if (selectedJobSetsCount !== successfulDeletesCount) {
            alert(`Only deleted ${successfulDeletesCount} Job Set from ${selectedJobSetsCount} selected.\nPlease try again.`);
          }
          dispatch(clearDeletingJobSets());
          reloadCallback();
          isDeleting = false;
        };
        deleteJobSetsAsync();
      };
      return callback;
    },
    [
      selectedJobSets,
      reloadCallback,
      dispatch,
    ]
  );
  return (
    <ToolbarDeleteButton
      onDelete={onDelete}
      isDeleting={isSomeDeleting}
    />
  );
};

const JobSetSelectedToolbar = ({
  selectedCount,
  selected,
  reloadCallback
}) => {
  return (
    <React.Fragment>
      <Typography color="inherit" variant="subtitle1">
        {selectedCount} selected
      </Typography>
      <ToolbarDeleteButtonContainer
        selected={selected}
        reloadCallback={reloadCallback}
      />
    </React.Fragment>
  );
};

const JobSetTitle = ({
  classes,
  isLoading,
  failedMessage,
  reloadCallback
}) => {
  return (
    <React.Fragment>
      <div className={classes.tableTitle}>
        <Typography variant="h6" id="table-title">
          Job Sets
        </Typography>
      </div>
      <div className={classes.withProgressWrapper}>
        <IconButton onClick={reloadCallback}>
          <RefreshIcon />
        </IconButton>
        {isLoading ? <CircularProgress className={classes.progressOnButton} /> : null}
      </div>
      <Typography color="error">
        {failedMessage}
      </Typography>
    </React.Fragment>
  );
};

const JobSetToolbarTitle = ({
  isLoading,
  failedMessage,
  selected,
  selectedCount,
  reloadCallback,
}) => {
  const classes = useStyles();
  return (
    <Toolbar
      className={clsx(classes.toolbar, {
        [classes.toolbarHighlight]: selectedCount > 0,
      })}
    >
      {selectedCount > 0
        ? (
          <JobSetSelectedToolbar
            selectedCount={selectedCount}
            selected={selected}
            reloadCallback={reloadCallback}
          />
        ) : (
          <JobSetTitle
            classes={classes}
            isLoading={isLoading}
            failedMessage={failedMessage}
            reloadCallback={reloadCallback}
          />
        )
      }
    </Toolbar >
  );
};
//#endregion title / toolbar

//#region HeadRow
const JobSetSortableTableHeadCell = ({
  padding,
  align,
  property,
  order,
  orderBy,
  onSort,
  children
}) => {
  const classes = useStyles();
  return (
    <TableCell
      padding={padding}
      align={align}
      sortDirection={orderBy === property ? order : false}
    >
      <TableSortLabel
        active={orderBy === property}
        direction={order}
        onClick={onSort(property)}
      >
        {children}
        {orderBy === property ? (
          <span className={classes.visuallyHidden}>
            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
          </span>
        ) : null}
      </TableSortLabel>
    </TableCell>
  );
};

const JobSetTableHead = ({
  pageDispatch,
  selectedCount,
  rowCount,
  order,
  orderBy
}) => {
  const onSelectAllClick = () => pageDispatch(pageActionCreators.selectAll());
  const onSort = property => () => pageDispatch(pageActionCreators.requestSort(property));

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={selectedCount > 0 && selectedCount < rowCount}
            checked={selectedCount > 0 && selectedCount === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all' }}
          />
        </TableCell>
        <JobSetSortableTableHeadCell
          align="left"
          padding="none"
          property="id"
          order={order}
          orderBy={orderBy}
          onSort={onSort}
        >
          Id
        </JobSetSortableTableHeadCell>
        <JobSetSortableTableHeadCell
          align="left"
          property="title"
          order={order}
          orderBy={orderBy}
          onSort={onSort}
        >
          Title
        </JobSetSortableTableHeadCell>
        <JobSetSortableTableHeadCell
          align="left"
          property="description"
          order={order}
          orderBy={orderBy}
          onSort={onSort}
        >
          Description
        </JobSetSortableTableHeadCell>
        <TableCell>
          Actions
        </TableCell>
      </TableRow>
    </TableHead>
  );
};
//#endregion HeadRow

//#region row
const RowDeleteButton = React.memo(({
  dense,
  onDelete,
  isDeleting,
  deleteSucceed,
  deleteFailed
}) => {
  const classes = useStyles();
  return (
    <div className={classes.withProgressWrapper}>
      <IconButton
        className={clsx({
          [classes.buttonSuccess]: deleteSucceed,
          [classes.buttonFailed]: deleteFailed
        })}
        onClick={onDelete}
        onContextMenu={preventDefaultPropagation}
        size={dense ? 'small' : 'medium'}
      >
        {deleteFailed ? <ReportProblemIcon /> : deleteSucceed ? <CheckIcon /> : <DeleteIcon />}
      </IconButton>
      {isDeleting ? <CircularProgress className={classes.progressOnButton} /> : null}
    </div>
  );
});

const RowDeleteButtonContainer = ({
  id,
  jobSetHeader,
  dense,
  reloadCallback
}) => {
  const [isDeletingState, deleteSucceed, deleteFailed] = useJobSetDeleting(id);
  const dispatch = useContext(JobShopCollectionDispatchContext);
  const onDelete = useMemo(
    () => {
      let isDeleting = false;
      const getIsDeleting = () => isDeleting;
      const callback = e => {
        e.stopPropagation();
        if (getIsDeleting()) {
          return;
        }
        if (!window.confirm(`Do you want to permanently delete Job Set ${id}\n${jobSetHeader.title}`)) {
          return;
        }
        const deleteJobSetAsync = async () => {
          isDeleting = true;
          dispatch(deleteJobSetBegin(id));
          try {
            await deleteJobSetsApiAsync(id, jobSetHeader.eTag);
            isDeleting = false;
            dispatch(deleteJobSetSucceed(id, true));
            reloadCallback();
          }
          catch (e) {
            alert(`Failed to delete Job Set ${id}\nPlease try again.`);
            isDeleting = false;
            dispatch(deleteJobSetFailed(id, true));
          }
        };
        deleteJobSetAsync();
      };
      return callback;
    },
    [
      id,
      jobSetHeader.eTag,
      jobSetHeader.title,
      reloadCallback,
      dispatch,
    ]
  );
  return (
    <RowDeleteButton
      dense={dense}
      onDelete={onDelete}
      isDeleting={isDeletingState}
      deleteSucceed={deleteSucceed}
      deleteFailed={deleteFailed}
    />
  );
};

const RowMoreActionsMenu = ({
  viewJobSetCallback,
  editJobSetCallback,
  openInNewTabCallback,
  anchorEl,
  anchorReference,
  anchorPosition,
  open,
  handleClose
}) => {
  return (
    <Menu
      anchorReference={anchorReference}
      anchorEl={anchorEl}
      anchorPosition={anchorPosition}
      keepMounted
      open={open}
      onClose={handleClose}
    >
      <MenuItem onClick={viewJobSetCallback} onContextMenu={preventDefaultPropagation}>
        <ListItemIcon>
          <ForwardIcon />
        </ListItemIcon>
        View
      </MenuItem>
      <MenuItem onClick={editJobSetCallback} onContextMenu={preventDefaultPropagation}>
        <ListItemIcon>
          <EditIcon />
        </ListItemIcon>
        Edit
      </MenuItem>
      <MenuItem onClick={openInNewTabCallback} onContextMenu={preventDefaultPropagation}>
        <ListItemIcon>
          <OpenInNewIcon />
        </ListItemIcon>
        Open in new tab
      </MenuItem>
    </Menu>
  );
};

const JobSetRow = React.memo(({
  jobSetHeader,
  dense,
  pageDispatch,
  rowIsSelectedFunction,
  reloadCallback,
  index,
  viewJobSetCallback,
  editJobSetCallback,
  openInNewTabCallback,
}) => {
  const { id } = jobSetHeader;
  const classes = useStyles();
  const isItemSelected = rowIsSelectedFunction(jobSetHeader.id);
  const labelId = `job-set-table-checkbox-${index}`;
  const onSelect = useCallback(
    e => {
      e.stopPropagation();
      pageDispatch(pageActionCreators.selectOne(jobSetHeader.id));
    },
    [pageDispatch, jobSetHeader.id]
  );

  const [menuPosition, setMenuPosition] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorReference, setAnchorReference] = useState('none');
  const menuOpen = Boolean(anchorEl) || Boolean(menuPosition);

  const onMoreActionButtonClick = event => {
    event.stopPropagation();
    event.preventDefault();
    setAnchorReference('anchorEl');
    setAnchorEl(event.currentTarget);
    setMenuPosition(null);
  };
  const onContextMenu = event => {
    event.stopPropagation();
    event.preventDefault();
    const cursorPositon = { top: event.pageY, left: event.pageX };
    setAnchorReference('anchorPosition');
    setMenuPosition(cursorPositon);
    setAnchorEl(null);
  };

  const handleCloseContextMenu = () => {
    setAnchorReference('none');
    setMenuPosition(null);
    setAnchorEl(null);
  };
  return (
    <TableRow
      className={clsx({ [classes.rowWithMenu]: menuOpen })}
      hover
      onClick={viewJobSetCallback}
      onContextMenu={onContextMenu} // TODO replace with custom context menu, also stop propagation on buttons
      role="checkbox"
      aria-checked={isItemSelected}
      tabIndex={-1}
      selected={isItemSelected}
    >
      <TableCell padding="checkbox">
        <Checkbox
          checked={isItemSelected}
          inputProps={{ 'aria-labelledby': labelId }}
          onClick={onSelect}
          onContextMenu={preventDefaultPropagation}
        />
      </TableCell>
      <TableCell component="th" id={labelId} scope="row" padding="none">
        {jobSetHeader.id}
      </TableCell>
      <TableCell align="left">
        <Typography noWrap>
          {jobSetHeader.title}
        </Typography>
      </TableCell>
      <TableCell align="left">
        <div className={classes.descriptionCell}>
          <Typography noWrap>
            {jobSetHeader.description}
          </Typography>
        </div>
      </TableCell>
      <TableCell align="left" padding="none">
        <div className={classes.actionsFlexbox}>
          <RowDeleteButtonContainer
            id={id}
            jobSetHeader={jobSetHeader}
            dense={dense}
            reloadCallback={reloadCallback}
          />
          <IconButton
            onClick={onMoreActionButtonClick}
            onContextMenu={preventDefaultPropagation}
            size={dense ? 'small' : 'medium'}
          >
            <MoreVertIcon />
          </IconButton>
        </div>
      </TableCell>
      <RowMoreActionsMenu
        viewJobSetCallback={viewJobSetCallback}
        editJobSetCallback={editJobSetCallback}
        openInNewTabCallback={openInNewTabCallback}
        anchorReference={anchorReference}
        anchorEl={anchorEl}
        anchorPosition={menuPosition}
        open={menuOpen}
        handleClose={handleCloseContextMenu}
      />
    </TableRow>
  );
});

const JobSetRowWithRouter = (props) => {
  const { history: { push }, match: _match, location: _location } = useReactRouter();
  const { jobSetHeader: { id } } = props;
  const [viewJobSetCallback, editJobSetCallback, openInNewTabCallback] = useMemo(
    () => {
      const path = generatePath(jobSetPath, { id });
      const openInNewTabCallback = e => {
        e.stopPropagation();
        const win = window.open(path, '_blank');
        win.focus();
      };
      const viewCallback = e => {
        e.stopPropagation();
        push(path);
      };
      let editQueryString = queryString.stringify({ edit: true });
      editQueryString = editQueryString ? '?' + editQueryString : '';
      const editPath = path + editQueryString;
      const editCallback = e => {
        e.stopPropagation();
        e.preventDefault();
        push(editPath);
      }
      return [viewCallback, editCallback, openInNewTabCallback];
    },
    [push, id]
  );
  return (
    <JobSetRow
      {...props}
      viewJobSetCallback={viewJobSetCallback}
      editJobSetCallback={editJobSetCallback}
      openInNewTabCallback={openInNewTabCallback}
    />
  );
};
//#endregion row

//#region Table
const JobSets = React.memo(({
  jobSetHeadersRows,
  jobSetToolbarTitle,
  jobSetTableHead,
  tablePagination,
  reloadCallback,
  pageDispatch,
  emptyRows,
  rowsPerPage,
  pageIndex,
  rowIsSelectedFunction
}) => {
  const classes = useStyles();
  const dense = rowsPerPage > 10;
  return (
    <Container className={classes.container}>
      <Paper className={classes.root}>
        {jobSetToolbarTitle}
        <Table
          className={classes.table}
          aria-labelledby="table-title"
          size={dense ? 'small' : 'medium'}
        >
          <colgroup>
            <col />
            <col style={{ width: '10%' }} />
            <col style={{ width: '30%' }} />
            <col style={{ width: '50%' }} />
            <col style={{ width: '10%' }} />
          </colgroup>
          {jobSetTableHead}
          <TableBody>
            {jobSetHeadersRows
              .slice(pageIndex * rowsPerPage, pageIndex * rowsPerPage + rowsPerPage)
              .map((jsh, index) => (
                <JobSetRowWithRouter
                  key={jsh.id}
                  jobSetHeader={jsh}
                  dense={dense}
                  pageDispatch={pageDispatch}
                  rowIsSelectedFunction={rowIsSelectedFunction}
                  reloadCallback={reloadCallback}
                  index={index}
                />
              ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: (dense ? 37 : 53) * emptyRows }}>
                <TableCell colSpan={5} />
              </TableRow>
            )}
          </TableBody>
        </Table>
        {tablePagination}
      </Paper >
    </Container>
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

  const jobSetToolbarTitle = useMemo(
    () => {
      return (
        <JobSetToolbarTitle
          isLoading={isLoading}
          failedMessage={failedMessage}
          selected={selected}
          selectedCount={selectedCount}
          reloadCallback={jobSetsRequest}
        />
      );
    },
    [isLoading, failedMessage, selected, selectedCount, jobSetsRequest]
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
      jobSetToolbarTitle={jobSetToolbarTitle}
      jobSetTableHead={jobSetTableHead}
      tablePagination={tablePagination}
      reloadCallback={jobSetsRequest}
      pageDispatch={pageDispatch}
      rowsPerPage={rowsPerPage}
      emptyRows={emptyRows}
      pageIndex={pageIndex}
      rowIsSelectedFunction={rowIsSelectedFunction}
    />
  );
};

export default JobSetsContainer;