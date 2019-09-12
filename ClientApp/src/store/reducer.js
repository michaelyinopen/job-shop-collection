import { combineReducers } from 'redux';
import createReducer from '../functions/createReducer';
import {
  getJobSetsBegin,
  getJobSetsSucceed,
  getJobSetsFailed
} from './actionTypes';

const getJobSetIsLoadingInitialState = false;
const getJobSetIsLoading = createReducer(
  getJobSetIsLoadingInitialState,
  {
    [getJobSetsBegin]: (_state, _action) => true,
    [getJobSetsSucceed]: (_state, _action) => false,
    [getJobSetsFailed]: (_state, _action) => false,
  }
);

const getJobSetFailedMessageInitialState = null;
const getJobSetFailedMessage = createReducer(
  getJobSetFailedMessageInitialState,
  {
    [getJobSetsBegin]: (_state, _action) => null,
    [getJobSetsSucceed]: (_state, _action) => null,
    [getJobSetsFailed]: (_state, { failedMessage }) => failedMessage,
  }
);

const jobSetInitialState = {
  id: undefined,
  title: undefined,
  description: undefined,
  content: undefined,
  jobColors: undefined,
  isAutoTimeOptions: undefined,
  timeOptions: undefined,
  eTag: undefined,
};
const jobSet = createReducer(
  jobSetInitialState,
  {
    [getJobSetsSucceed]: (_state, _action, jobSetFromAction) => ({
      id: jobSetFromAction.id,
      title: jobSetFromAction.title,
      description: jobSetFromAction.description,
      eTag: jobSetFromAction.eTag,
    })
  }
);

const jobSetsInitialState = [];
const jobSets = createReducer(
  jobSetsInitialState,
  {
    [getJobSetsSucceed]: (_state, action) => {
      return action.jobSets.reduce((newState, js) => {
        newState[js.id] = jobSet(undefined, action, js);
        return newState;
      }, {});
    }
  }
);

export const initialState = {
  getJobSetIsLoading: getJobSetIsLoadingInitialState,
  getJobSetFailedMessage: getJobSetFailedMessageInitialState,
  jobSets: jobSetsInitialState
};

const reducer = combineReducers({
  getJobSetIsLoading,
  getJobSetFailedMessage,
  jobSets
});

export default reducer;