import React, { useMemo, useReducer, useContext } from 'react';
import { createJobSetApiAsync } from '../../../api/jobSetsApi';
import { useJobSetForCreation } from './store/useSelectors';
import JobShopCollectionDispatchContext from '../../JobShopCollectionDispatchContext';
import { savedJobSet } from '../../../store/actionCreators';
import { generatePath } from 'react-router';
import useReactRouter from 'use-react-router';
import { jobSet as jobSetPath } from '../../../routePaths';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Tooltip,
  IconButton,
  CircularProgress
} from '@material-ui/core';
import { Save as SaveIcon } from '@material-ui/icons';

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

const SaveJobSetButton = ({
  tooltip,
  onClick,
  isProgress,
}) => {
  const classes = useStyles();
  return (
    <div>
      <Tooltip title={tooltip} placement="bottom-end">
        <div className={classes.withProgressWrapper}>
          <IconButton
            onClick={onClick}
          >
            <SaveIcon />
          </IconButton>
          {isProgress ? <div className={classes.progressOnButton}><CircularProgress /></div> : null}
        </div>
      </Tooltip>
    </div >
  );
};

const SaveJobSetButtonContainer = ({
  id
}) => {
  const [saveState, saveDispatch] = useReducer(
    (_state, action) => {
      switch (action.type) {
        case 'beginCreate':
          return {
            isCreating: true,
            createFailedMessage: undefined,
            isUpdating: false,
            updateFailedMessage: undefined,
          };
        case 'createSucceed':
          return {
            isCreating: false,
            createFailedMessage: undefined,
            isUpdating: false,
            updateFailedMessage: undefined,
          };
        case 'createFailed':
          return {
            isCreating: false,
            createFailedMessage: action.failedMessage,
            isUpdating: false,
            updateFailedMessage: undefined,
          };
        case 'beginUpdate':
          return {
            isCreating: false,
            createFailedMessage: undefined,
            isUpdating: true,
            updateFailedMessage: undefined,
          };
        case 'updateSucceed':
          return {
            isCreating: false,
            createFailedMessage: undefined,
            isUpdating: false,
            updateFailedMessage: undefined,
          };
        case 'updateFailed':
          return {
            isCreating: false,
            createFailedMessage: undefined,
            isUpdating: false,
            updateFailedMessage: action.failedMessage,
          };
      }
    },
    {
      isCreating: false,
      createFailedMessage: undefined,
      isUpdating: false,
      updateFailedMessage: undefined,
    }
  );
  const dispatch = useContext(JobShopCollectionDispatchContext);
  const jobSetForCreation = useJobSetForCreation();
  const { history: { push } } = useReactRouter();
  const onCreate = useMemo(
    () => {
      let isCreating = false;
      const getIsCreating = () => isCreating;
      const callback = () => {
        if (getIsCreating()) {
          return;
        }
        const createJobSetAsync = async () => {
          isCreating = true;
          saveDispatch({ type: 'beginCreate' });
          try {
            const createResult = await createJobSetApiAsync(jobSetForCreation);
            isCreating = false;
            saveDispatch({ type: 'createSucceed' });
            const id = createResult.id;
            dispatch(savedJobSet(id, createResult));
            const generatedJobSetPath = generatePath(jobSetPath, { id, edit: 'edit' });
            push(generatedJobSetPath);
          }
          catch (e) {
            alert(`Failed to create Job Set.\nPlease try again.`);
            isCreating = false;
            saveDispatch({ type: 'createFailed', failedMessage: e.message });
          }
        };
        createJobSetAsync();
      };
      return callback;
    },
    [
      id,
      jobSetForCreation,
      saveDispatch,
      dispatch,
      push
    ]
  );
  const tooltip = id ? "Save" : "Create";
  const onClick = id ? () => { } : onCreate;
  const isProgress = id ? saveState.isUpdating : saveState.isCreating;
  return (
    <SaveJobSetButton
      tooltip={tooltip}
      onClick={onClick}
      isProgress={isProgress}
    />
  );
};

export default SaveJobSetButtonContainer;