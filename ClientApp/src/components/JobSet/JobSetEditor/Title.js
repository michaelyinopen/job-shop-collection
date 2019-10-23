import React, { useCallback, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import useDebouncedValue from '../../../functions/useDebouncedValue';
import { typingInputDebounceWait } from '../../../constants';
import { useTitle, useReadOnly } from './store/useSelectors';
import { setTitle } from './store/actionCreators';
import JobSetEditorDispatchContext from './JobSetEditorDispatchContext';

const useStyles = makeStyles(theme => ({
  field: {
    display: "block",
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  }
}));

const Title = React.memo(({
  value,
  readOnly,
  onChange
}) => {
  const classes = useStyles();
  return (
    <TextField
      label="Title"
      value={value ? value : undefined}
      onChange={onChange}
      variant="filled"
      margin="dense"
      className={classes.field}
      inputProps={readOnly ? { readOnly: true } : {}}
    />
  );
});

const TitleContainer = () => {
  const title = useTitle();
  const readOnly = useReadOnly();
  const dispatch = useContext(JobSetEditorDispatchContext);
  const setTitleCallback = useCallback(
    valueArg => {
      dispatch(setTitle(valueArg));
    },
    [dispatch]
  );
  const [titleValue, titleChangedCallback] = useDebouncedValue(title, setTitleCallback, typingInputDebounceWait);
  return (
    <Title
      value={titleValue}
      readOnly={readOnly}
      onChange={titleChangedCallback}
    />
  );
};

export default TitleContainer;
