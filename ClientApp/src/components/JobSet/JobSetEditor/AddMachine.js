import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Button } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { addMachine } from '../store/actionCreators';
import { machine as machineStyle } from './sharedStyles';

const useStyles = makeStyles(theme => ({
  machine: machineStyle(theme),
  addButton: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(0.5),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  addIcon: { marginRight: theme.spacing(0.5) },
}));

const AddMachine = React.memo(() => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const addMachineCallback = useCallback(
    () => dispatch(addMachine()),
    [dispatch]
  );
  return (
    <Card className={classes.machine}>
      <Button
        variant="contained"
        color="primary"
        onClick={addMachineCallback}
        className={classes.addButton}
      >
        <Add className={classes.addIcon} />
        Machine
      </Button>
    </Card>
  );
});

export default AddMachine;