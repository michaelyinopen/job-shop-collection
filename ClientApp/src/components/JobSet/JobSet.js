import React, { useContext, useMemo, useEffect } from 'react';
import JobShopCollectionDispatchContext from '../JobShopCollectionDispatchContext';
import JobSetEditor from './JobSetEditor';
import { getJobSetApiAsync } from '../../api';
import {
  getJobSetBegin,
  getJobSetSucceed,
  getJobSetFailed,
  setCurrentJobSetId,
} from '../../store/actionCreators';
import {
  useJobSet,
  useIsLoadingJobSet,
  useLoadJobSetFailedMessage,
} from '../../store/useSelectors';
import { setReadOnly } from './store/actionCreators';

// when used as new jobset, id will be undefined
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
      if (id) {
        dispatch(setCurrentJobSetId(id));
        getJobSetAsync();
      }
    },
    [id, getJobSetAsync]
  );
  useEffect(
    () => {
      dispatch(setReadOnly(!edit));
    },
    [edit]
  );
  const isLoading = useIsLoadingJobSet(id);
  const loadFailedMessage = useLoadJobSetFailedMessage(id);
  const jobSet = useJobSet(id);

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
      title={jobSet ? jobSet.title : undefined}
      description={jobSet ? jobSet.description : undefined}
      jobSet={jobSet ? jobSet.content : undefined}
      isAutoTimeOptions={jobSet ? jobSet.isAutoTimeOptions : undefined}
      timeOptions={jobSet ? jobSet.timeOptions : undefined}
      jobColors={jobSet ? jobSet.jobColors : undefined}
    />
  );
};

export default JobSet;
