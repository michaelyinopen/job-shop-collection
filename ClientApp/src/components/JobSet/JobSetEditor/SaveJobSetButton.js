import React, { useMemo, useReducer, useContext, useEffect } from 'react';
import { createJobSetApiAsync } from '../../../api/jobSetsApi';
import { useJobSetForCreation } from '../store/useSelectors';
import JobShopCollectionDispatchContext from '../../JobShopCollectionDispatchContext';
import { showSnackbar } from '../../../store/actionCreators';
import { generatePath } from 'react-router';
import useReactRouter from 'use-react-router';
import { jobSet as jobSetPath } from '../../../routePaths';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Tooltip,
  CircularProgress
} from '@material-ui/core';
import { Save as SaveIcon } from '@material-ui/icons';
import { Prompt } from 'react-router';

const useStyles = makeStyles(theme => ({
  withProgressWrapper: {
    margin: theme.spacing(1),
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
  saveIcon: { marginRight: theme.spacing(0.5) },
}));

const SaveJobSetButton = ({
  label,
  onClick,
  isProgress,
  blockExit,
  blockMessage,
}) => {
  const classes = useStyles();
  return (
    <div>
      <Tooltip title={label} placement="bottom-end">
        <div className={classes.withProgressWrapper}>
          <Button
            variant="contained"
            color="primary"
            onClick={onClick}
            className={classes.saveButton}
            disabled={isProgress}
          >
            <SaveIcon className={classes.saveIcon} />
            {label}
          </Button>
          {isProgress ? <div className={classes.progressOnButton}><CircularProgress size={24} /></div> : null}
        </div>
      </Tooltip>
      <Prompt
        when={blockExit}
        message={blockMessage}
      />
    </div >
  );
};

const SaveJobSetButtonContainer = ({
  id
}) => {
  const [saveState, saveDispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'beginCreate':
          return {
            isCreating: true,
            createFailedMessage: undefined,
            createdId: undefined,
            isUpdating: false,
            updateFailedMessage: undefined,
          };
        case 'createSucceed':
          return {
            isCreating: false,
            createFailedMessage: undefined,
            createdId: action.id,
            isUpdating: false,
            updateFailedMessage: undefined,
          };
        case 'createFailed':
          return {
            isCreating: false,
            createFailedMessage: action.failedMessage,
            createdId: undefined,
            isUpdating: false,
            updateFailedMessage: undefined,
          };
        case 'beginUpdate':
          return {
            isCreating: false,
            createFailedMessage: undefined,
            createdId: undefined,
            isUpdating: true,
            updateFailedMessage: undefined,
          };
        case 'updateSucceed':
          return {
            isCreating: false,
            createFailedMessage: undefined,
            createdId: undefined,
            isUpdating: false,
            updateFailedMessage: undefined,
          };
        case 'updateFailed':
          return {
            isCreating: false,
            createFailedMessage: undefined,
            createdId: undefined,
            isUpdating: false,
            updateFailedMessage: action.failedMessage,
          };
        default:
          return state;
      }
    },
    {
      isCreating: false,
      createFailedMessage: undefined,
      createdId: undefined,
      isUpdating: false,
      updateFailedMessage: undefined,
    }
  );
  const dispatch = useContext(JobShopCollectionDispatchContext);
  const jobSetForCreation = useJobSetForCreation();
  const { history: { push } } = useReactRouter();
  useEffect(
    () => {
      if (saveState.createdId) {
        const generatedJobSetPath = generatePath(jobSetPath, { id: saveState.createdId, edit: 'edit' });
        dispatch(showSnackbar(`Created Job Set ${saveState.createdId}`));
        push(generatedJobSetPath);
      }
    },
    [saveState.createdId, push, dispatch]
  );
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
            const id = createResult.id;
            saveDispatch({ type: 'createSucceed', id });
            //dispatch(savedJobSet(id, createResult));
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
      jobSetForCreation,
      saveDispatch,
      dispatch
    ]
  );
  const label = id ? "Save" : "Create";
  const onClick = id ? () => { } : onCreate;
  const isProgress = id ? saveState.isUpdating : saveState.isCreating;
  return (
    <SaveJobSetButton
      label={label}
      onClick={onClick}
      isProgress={isProgress}
      blockExit={id ? false : !saveState.createdId}
      blockMessage={id ? "" : "Exit without creating?\nAll changes will be lost."}
    />
  );
};

export default SaveJobSetButtonContainer;