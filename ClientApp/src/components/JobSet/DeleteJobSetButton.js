import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  IconButton,
  CircularProgress
} from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';

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
  onDelete,
  isDeleting
}) => {
  const classes = useStyles();
  if (!onDelete) {
    return null;
  };
  return (
    <div className={classes.withProgressWrapper}>
      <IconButton
        disabled
        onClick={onDelete}
      >
        <DeleteIcon />
      </IconButton>
      {isDeleting ? <div className={classes.progressOnButton}><CircularProgress /></div> : null}
    </div>
  );
};

export default DeleteJobSetButton;