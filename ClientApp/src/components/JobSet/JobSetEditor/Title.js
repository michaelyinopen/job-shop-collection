import React, { useCallback, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import useDebouncedValue from '../../../functions/useDebouncedValue';
import { typingInputDebounceWait } from '../../../constants';
import { useTitle } from './store/useSelectors';
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
  onChange
}) => {
  const classes = useStyles();
  return (
    <TextField
      label="Title"
      value={value}
      onChange={onChange}
      variant="filled"
      margin="dense"
      className={classes.field}
      InputProps={{
        readOnly: true,
      }}
    />
  );
});

const TitleContainer = () => {
  const title = useTitle();
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
      onChange={titleChangedCallback}
    />
  );
};

export default TitleContainer;
