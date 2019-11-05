import React, { useMemo, useContext, useEffect } from 'react';
import { createJobSetApiAsync } from '../../../api/jobSetsApi';
import { useJobSetForCreation, useIsCreating, useCreatedId, useCurrentJobSetId } from '../store/useSelectors';
import JobShopCollectionDispatchContext from '../../JobShopCollectionDispatchContext';
import { showSnackbar, createJobSetBegin, createJobSetSucceed, createJobSetFailed } from '../../../store/actionCreators';
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

const CreateJobSetButtonContainer = () => {
  const creatingId = useCurrentJobSetId();
  const dispatch = useContext(JobShopCollectionDispatchContext);
  const jobSetForCreation = useJobSetForCreation();
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
          dispatch(createJobSetBegin(creatingId));
          try {
            const createResult = await createJobSetApiAsync(jobSetForCreation);
            isCreating = false;
            const id = createResult.id;
            dispatch(createJobSetSucceed(creatingId, id, createResult));
          }
          catch (e) {
            alert(`Failed to create Job Set.\nPlease try again.`);
            isCreating = false;
            dispatch(createJobSetFailed(creatingId, e.message));
          }
        };
        createJobSetAsync();
      };
      return callback;
    },
    [creatingId, dispatch, jobSetForCreation,]
  );
  const createdId = useCreatedId();
  const { history: { push } } = useReactRouter();
  useEffect(
    () => {
      if (createdId) {
        dispatch(showSnackbar(`Created Job Set ${createdId}`));
        const generatedJobSetPath = generatePath(jobSetPath, { id: createdId, edit: 'edit' });
        push(generatedJobSetPath);
      }
    },
    [createdId, push, dispatch]
  );
  const isProgress = useIsCreating();
  return (
    <SaveJobSetButton
      label="Create"
      onClick={onCreate}
      isProgress={isProgress}
      blockExit={!createdId}
      blockMessage={"Exit without creating?\nAll changes will be lost."}
    />
  );
  // const label = "Create";
};

const SaveJobSetButtonContainer = ({
  id
}) => {
  return id ? null/*<UpdateJobSetButtonContainer id={id} />*/ : <CreateJobSetButtonContainer />;
};

export default SaveJobSetButtonContainer;