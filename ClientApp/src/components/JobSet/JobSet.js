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
import { useJobSetState } from '../../store/useSelectors';
import { getNewJobSetId, isNewJobSetId } from '../../functions/newJobSetId';
import { setReadOnly } from './store/actionCreators';
import JobSetStateContext from './JobSetStateContext';
import {
  useJobSetEditorState,
  useCurrentJobSetId,
} from './store/useSelectors';
import JobSetEditorStateContext from './JobSetEditor/JobSetEditorStateContext';

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
      dispatch(setCurrentJobSetId(id ? id : getNewJobSetId()));
      if (id && !isNewJobSetId(id)) {
        getJobSetAsync();
      }
    },
    [id, getJobSetAsync, dispatch]
  );
  useEffect(
    () => {
      dispatch(setReadOnly(!edit));
    },
    [edit, dispatch]
  );
  const currentJobSetId = useCurrentJobSetId();
  const jobSetEditorState = useJobSetEditorState();

  if ((id && currentJobSetId !== id) || (!id && !isNewJobSetId(currentJobSetId))) {
    return <div>transitioning...</div>;
  }
  return (
    <JobSetEditorStateContext.Provider value={jobSetEditorState}>
      <JobSetEditor id={id} />
    </JobSetEditorStateContext.Provider>
  );
};

const JobSetWithContext = props => {
  const jobSetState = useJobSetState();
  return (
    <JobSetStateContext.Provider value={jobSetState}>
      <JobSet {...props} />
    </JobSetStateContext.Provider>
  );
};

export default JobSetWithContext;
