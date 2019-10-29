import {
  setCurrentJobSetIdActionType,
  jobSetEditorReducer,
} from '../components/JobSet';
import {
  getJobSetSucceed,
  createJobSetSucceed,
  updateJobSetSucceed,
} from './actionTypes';
import { setCurrentJobSetIdActionType } from '../components/JobSet';

export const jobSetEditorUpdatingActions = [
  getJobSetSucceed,
  createJobSetSucceed,
  updateJobSetSucceed,
  setCurrentJobSetIdActionType
];

const currentJobSetAdjustReducer = (state, action) => {
  if (!jobSetEditorUpdatingActions.includes(action.type)) {
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