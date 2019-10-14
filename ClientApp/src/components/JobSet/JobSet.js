import React, { useContext, useMemo, useEffect } from 'react';
import JobShopCollectionDispatchContext from '../JobShopCollectionDispatchContext';
import JobSetEditor from './JobSetEditor';
import { getJobSetApiAsync } from '../../api';
import {
  getJobSetBegin,
  getJobSetSucceed,
  getJobSetFailed
} from '../../store/actionCreators';
import {
  useJobSet,
  useIsLoadingJobSet,
  useLoadJobSetFailedMessage
} from '../../store/useSelectors';

const JobSet = ({
  id,
  edit
}) => {
  const pageTitle = `${edit ? "Edit " : ""} Job Set #${id}`;

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
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (loadFailedMessage) {
    return <div>Loading Failed. {loadFailedMessage}</div>;
  }

  return <div>succeed</div>;
  return (
    <JobSetEditor
      pageTitle={pageTitle}
      edit={edit}
      title={jobSet.title}
      description={jobSet.description}
      jobSet={jobSet.content}
      isAutoTimeOptions={jobSet.isAutoTimeOptions}
      timeOptions={jobSet.timeOptions}
      jobColors={jobSet.jobColors}
    />
  );
};

export default JobSet;
