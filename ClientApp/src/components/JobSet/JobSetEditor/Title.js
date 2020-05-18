import React, { useCallback, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import useDebouncedValue from '../../../functions/useDebouncedValue';
import { typingInputDebounceWait } from '../../../constants';
import { selectTitle, selectReadOnly } from '../store/selectors'
import { setTitle } from '../store/actionCreators';

const useStyles = makeStyles(theme => ({
  wrapper: {
    position: "relative",
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    maxWidth: "400px",
  },
}));

const Title = React.memo(() => {
  const classes = useStyles();

  const title = useSelector(selectTitle);
  const readOnly = useSelector(selectReadOnly);
  const dispatch = useDispatch();
  const setTitleCallback = useCallback(
    valueArg => {
      dispatch(setTitle(valueArg));
    },
    [dispatch]
  );
  const [titleValue, titleChangedCallback] = useDebouncedValue(title, setTitleCallback, typingInputDebounceWait);
  return (
    <div className={classes.wrapper}>
      <TextField
        label="Title"
        value={titleValue ? titleValue : ''}
        onChange={titleChangedCallback}
        required
        error={!titleValue || titleValue.length === 0}
        variant="filled"
        margin="dense"
        fullWidth
        inputProps={{
          maxLength: 50,
          ...(readOnly ? { readOnly: true } : {})
        }}
      />
    </div>
  );
});

export default Title;
