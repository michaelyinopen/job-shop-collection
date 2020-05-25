import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import useDebouncedValue from '../../../functions/useDebouncedValue';
import { typingInputDebounceWait } from '../../../constants';
import { selectDescription, selectReadOnly } from '../store/selectors'
import { setDescription } from '../store/actionCreators';

const useStyles = makeStyles(theme => ({
  wrapper: {
    position: "relative",
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    maxWidth: "600px",
  },
}));

const Description = React.memo(() => {
  const classes = useStyles();
  const description = useSelector(selectDescription);
  const readOnly = useSelector(selectReadOnly);
  const dispatch = useDispatch();
  const setDescriptionCallback = useCallback(
    valueArg => {
      dispatch(setDescription(valueArg));
    },
    [dispatch]
  );
  const [descriptionValue, descriptionChangedCallback] = useDebouncedValue(description, setDescriptionCallback, typingInputDebounceWait);
  return (
    <div className={classes.wrapper}>
      <TextField
        label="Description"
        value={descriptionValue ? descriptionValue : ''}
        onChange={descriptionChangedCallback}
        disabled={(!descriptionValue || descriptionValue.length === 0) && readOnly}
        variant="filled"
        margin="dense"
        multiline
        fullWidth
        inputProps={readOnly ? { readOnly: true } : {}}
      />
    </div>
  );
});

export default Description;
