import React, { useContext, useMemo, useEffect } from 'react';
import JobShopCollectionDispatchContext from '../JobShopCollectionDispatchContext';
import { generatePath } from 'react-router';
import useReactRouter from 'use-react-router';
import JobSetEditor from './JobSetEditor';
import DeleteJobSetButton from './DeleteJobSetButton';
import { getJobSetApiAsync } from '../../api';
import {
  getJobSetBegin,
  getJobSetSucceed,
  getJobSetFailed,
  deleteJobSetBegin,
  deleteJobSetSucceed,
  deleteJobSetFailed,
  showSnackbar
} from '../../store/actionCreators';
import {
  useJobSet,
  useIsLoadingJobSet,
  useLoadJobSetFailedMessage,
  useJobSetDeleting
} from '../../store/useSelectors';
import { deleteJobSetApiAsync } from '../../api';
import { jobSets as jobSetsPath } from '../../routePaths';

const JobSet = ({
  id,
  edit
}) => {
  const dispatch = useContext(JobShopCollectionDispatchContext);
  const getJobSetAsync = useMemo(
    () => async () => {
      dispatch(getJobSetBegin(id));
      try {
        const jobSet = await getJobSetApiAsync(id);
        dispatch(getJobSetSucceed(id, jobSet));
      }
      catch (e) {
        dispatch(getJobSetFailed(id, e.message));
      }
    },
    [id, dispatch]
  );
  useEffect(
    () => {
      getJobSetAsync();
    },
    [getJobSetAsync]
  );
  const isLoading = useIsLoadingJobSet(id);
  const loadFailedMessage = useLoadJobSetFailedMessage(id);
  const jobSet = useJobSet(id);

  const [isDeletingState] = useJobSetDeleting(id);
  const { history: { push } } = useReactRouter();
  const deleteCompletedCallback = useMemo( // possibly add snackbar
    () => {
      const generatedJobSetsPath = generatePath(jobSetsPath);
      const callback = () => {
        dispatch(showSnackbar(`Deleted Job Set ${id}`));
        push(generatedJobSetsPath);
      }
      return callback;
    },
    [push, dispatch, id]
  );
  const onDelete = useMemo(
    () => {
      if (!id || !jobSet) {
        return null;
      }
      let isDeleting = false;
      const getIsDeleting = () => isDeleting;
      const callback = e => {
        e.stopPropagation();
        if (getIsDeleting()) {
          return;
        }
        if (!window.confirm(`Do you want to permanently delete Job Set ${id}\n${jobSet.title}`)) {
          return;
        }
        const deleteJobSetAsync = async () => {
          isDeleting = true;
          dispatch(deleteJobSetBegin(id));
          try {
            await deleteJobSetApiAsync(id, jobSet.eTag);
            isDeleting = false;
            dispatch(deleteJobSetSucceed(id, true));
            deleteCompletedCallback();
          }
          catch (e) {
            alert(`Failed to delete Job Set ${id}\nPlease try again.`);
            isDeleting = false;
            dispatch(deleteJobSetFailed(id, true));
          }
        };
        deleteJobSetAsync();
      };
      return callback;
    },
    [
      id,
      jobSet,
      dispatch,
      deleteCompletedCallback
    ]
  );

  const deleteJobSetButton = useMemo(
    () => (
      <DeleteJobSetButton
        onDelete={onDelete}
        isDeleting={isDeletingState}
      />
    ),
    [onDelete, isDeletingState]
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (loadFailedMessage) {
    return <div>Loading Failed. {loadFailedMessage}</div>;
  }
  return (
    <JobSetEditor
      id={id}
      edit={edit}
      title={jobSet.title}
      description={jobSet.description}
      jobSet={jobSet.content}
      isAutoTimeOptions={jobSet.isAutoTimeOptions}
      timeOptions={jobSet.timeOptions}
      jobColors={jobSet.jobColors}
      deleteJobSetButton={deleteJobSetButton}
    />
  );
};

export default JobSet;
