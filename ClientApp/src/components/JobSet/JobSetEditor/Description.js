import React, { useCallback, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import useDebouncedValue from '../../../functions/useDebouncedValue';
import { typingInputDebounceWait } from '../../../constants';
import { useDescription, useReadOnly } from '../store/useSelectors';
import { setDescription } from '../store/actionCreators';
import JobSetEditorDispatchContext from './JobSetEditorDispatchContext';

const useStyles = makeStyles(theme => ({
  field: {
    display: "block",
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    maxWidth: "600px"
  }
}));

const Description = React.memo(({
  value,
  readOnly,
  onChange,
}) => {
  const classes = useStyles();
  return (
    <TextField
      label="Description"
      value={value ? value : undefined}
      onChange={onChange}
      variant="filled"
      margin="dense"
      multiline
      fullWidth
      className={classes.field}
      inputProps={readOnly ? { readOnly: true } : {}}
    />
  );
});

const DescriptionContainer = () => {
  const description = useDescription();
  const readOnly = useReadOnly();
  const dispatch = useContext(JobSetEditorDispatchContext);
  const setDescriptionCallback = useCallback(
    valueArg => {
      dispatch(setDescription(valueArg));
    },
    [dispatch]
  );
  const [descriptionValue, descriptionChangedCallback] = useDebouncedValue(description, setDescriptionCallback, typingInputDebounceWait);
  return (
    <Description
      value={descriptionValue}
      readOnly={readOnly}
      onChange={descriptionChangedCallback}
    />
  );
};

export default DescriptionContainer;
