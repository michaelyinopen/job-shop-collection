import React, { useCallback, useContext } from 'react';
import { TextField } from '@material-ui/core';
import useDebouncedValue from '../../functions/useDebouncedValue';
import { typingInputDebounceWait } from '../../constants';
import { useTitle } from './store/useSelectors';
import { setTitle } from './store/actionCreators';
import JobSetEditorDispatchContext from './JobSetEditorDispatchContext';

const Title = React.memo(({
  value,
  onChange
}) => {
  return (
    <TextField
      label="Title"
      value={value}
      onChange={onChange}
      variant="filled"
      margin="dense"
      style={{ marginLeft: "0.5em", marginRight: "0.5em" }}
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
