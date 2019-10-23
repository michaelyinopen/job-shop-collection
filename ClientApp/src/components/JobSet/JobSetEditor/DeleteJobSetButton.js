import React, { useContext, useMemo, useState, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Tooltip,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  CircularProgress
} from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import { generatePath } from 'react-router';
import useReactRouter from 'use-react-router';
import JobShopCollectionDispatchContext from '../../JobShopCollectionDispatchContext';
import { deleteJobSetApiAsync } from '../../../api';
import { jobSets as jobSetsPath } from '../../../routePaths';
import {
  deleteJobSetBegin,
  deleteJobSetSucceed,
  deleteJobSetFailed,
  showSnackbar
} from '../../../store/actionCreators';
import {
  useJobSet,
  useJobSetDeleting
} from '../../../store/useSelectors';

const useStyles = makeStyles(theme => ({
  withProgressWrapper: {
    position: 'relative',
  },
  progressOnButton: {
    position: 'absolute',
    zIndex: 1,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: 'flex'
  },
}));

const DeleteJobSetButton = ({
  id,
  deleteTooltip,
  open,
  clickOpenCallback,
  closeCallback,
  confirmCallback,
  isDeleting
}) => {
  const classes = useStyles();
  return (
    <div>
      <Tooltip title={deleteTooltip} placement="bottom-end">
        <div className={classes.withProgressWrapper}>
          <IconButton
            onClick={clickOpenCallback}
          >
            <DeleteIcon />
          </IconButton>
          {isDeleting ? <div className={classes.progressOnButton}><CircularProgress /></div> : null}
        </div>
      </Tooltip>
      <Dialog
        open={open}
        onClose={closeCallback}
      >
        <DialogTitle>{deleteTooltip + "?"}</DialogTitle>
        <DialogActions>
          <Button onClick={closeCallback} variant="outlined" color="primary">
            Cancel
          </Button>
          <Button onClick={confirmCallback} variant="contained" color="secondary" autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div >
  );
};

const DeleteJobSetButtonContainer = ({
  id,
}) => {
  const jobSet = useJobSet(id);
  const dispatch = useContext(JobShopCollectionDispatchContext);

  const [open, setOpen] = useState(false);
  const clickOpenCallback = useCallback(
    () => setOpen(true),
    [setOpen]
  );
  const closeCallback = useCallback(
    () => setOpen(false),
    [setOpen]
  );

  const [isDeletingState] = useJobSetDeleting(id);
  const { history: { push } } = useReactRouter();
  const deleteCompletedCallback = useMemo( // possibly add snackbar
    () => {
      const generatedJobSetsPath = generatePath(jobSetsPath);
      const callback = () => {
        closeCallback();
        dispatch(showSnackbar(`Deleted Job Set ${id}`));
        push(generatedJobSetsPath);
      }
      return callback;
    },
    [push, dispatch, id, closeCallback]
  );
  const onDelete = useMemo(
    () => {
      if (!id || !jobSet) {
        return null;
      }
      let isDeleting = false;
      const getIsDeleting = () => isDeleting;
      const callback = () => {
        if (getIsDeleting()) {
          return;
        }
        const deleteJobSetAsync = async () => {
          isDeleting = true;
          dispatch(deleteJobSetBegin(id));
          try {
            await deleteJobSetApiAsync(id, jobSet.eTag);
            isDeleting = false;
            dispatch(deleteJobSetSucceed(id, true));
            deleteCompletedCallback();
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
      jobSet,
      dispatch,
      deleteCompletedCallback
    ]
  );

  const deleteTooltip = `Deleted Job Set ${id}`;

  const confirmCallback = useCallback(
    () => {
      onDelete();
    },
    [onDelete]
  );

  if (!onDelete) {
    return null;
  };
  return (
    <DeleteJobSetButton
      id={id}
      deleteTooltip={deleteTooltip}
      open={open}
      clickOpenCallback={clickOpenCallback}
      closeCallback={closeCallback}
      confirmCallback={confirmCallback}
      isDeleting={isDeletingState}
    />
  );
};

export default DeleteJobSetButtonContainer;