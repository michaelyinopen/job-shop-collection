import React, { useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Card, TextField } from '@material-ui/core';
import RemoveMachineButton from './RemoveMachineButton';
import { makeMachineSelector, selectReadOnly } from '../store/selectors'
import { updateMachineTitle, updateMachineDescription } from '../store/actionCreators';
import useDebouncedValue from '../../../functions/useDebouncedValue';
import { typingInputDebounceWait } from '../../../constants';
import { machine as machineStyle } from './sharedStyles';

const useStyles = makeStyles(theme => ({
  machine: machineStyle(theme),
  title: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  description: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    maxWidth: 320
  },
  separator: { flexGrow: 1 },
}));

const Machine = React.memo(({
  id
}) => {
  const classes = useStyles();
  const { current: selectMachine } = useRef(makeMachineSelector());
  const machine = useSelector(state => selectMachine(state, id));
  const readOnly = useSelector(selectReadOnly);

  const dispatch = useDispatch();
  const dispatchUpdateMachineTitle = useCallback(
    value => dispatch(updateMachineTitle(id, value)),
    [dispatch, id]
  );
  const [title, onTitleChangeCallback] = useDebouncedValue(
    machine.title,
    dispatchUpdateMachineTitle,
    typingInputDebounceWait
  );

  const dispatchUpdateMachineDescription = useCallback(
    value => dispatch(updateMachineDescription(id, value)),
    [dispatch, id]
  );
  const [description, onDescriptionChangeCallback] = useDebouncedValue(
    machine.description,
    dispatchUpdateMachineDescription,
    typingInputDebounceWait
  );
  return (
    <Card className={classes.machine}>
      <TextField
        label="Title"
        value={title || ''}
        onChange={onTitleChangeCallback}
        required
        error={!title || title.length === 0}
        variant="filled"
        margin="dense"
        className={classes.title}
        disabled={(!title || title.length === 0) && readOnly}
        inputProps={readOnly ? { readOnly: true } : {}}
      />
      <TextField
        label="Description"
        value={description || ''}
        onChange={onDescriptionChangeCallback}
        variant="filled"
        margin="dense"
        multiline
        fullWidth
        className={classes.description}
        disabled={(!description || description.length === 0) && readOnly}
        inputProps={readOnly ? { readOnly: true } : {}}
      />
      <div className={classes.separator} />
      {!readOnly ? <RemoveMachineButton id={id} /> : null}
    </Card>
  );
});

export default Machine;