import {
  getJobSetSucceed,
  createJobSetSucceed,
  updateJobSetSucceed,
  setCurrentJobSetId
} from './actionTypes';
import {
  jobSetEditorReducer,
} from '../components/JobSet';

export const jobSetEditorUpdatingActionsTypes = [
  getJobSetSucceed,
  createJobSetSucceed,
  updateJobSetSucceed,
  setCurrentJobSetId
];

const currentJobSetAdjustReducer = (state, action) => {
  if (!jobSetEditorUpdatingActionsTypes.includes(action.type)) {
    return state;
  }
  const id = state.currentJobSetId;
  if (!id) {
    return state;
  }
  const jobSet = state.jobSets[id];
  if (!jobSet) {
    return state;
  }
  const {
    title,
    description,
    content: {
      machines,
      jobs,
    } = {},
    isAutoTimeOptions,
    timeOptions,
    jobColors
  } = jobSet;

  const jobSetEditor = jobSetEditorReducer(
    state.jobSetEditor,
    action,
    {
      title,
      description,
      machines,
      jobs,
      isAutoTimeOptions,
      timeOptions,
      jobColors
    }
  );

  return {
    ...state,
    jobSetEditor
  };
};

export default currentJobSetAdjustReducer;