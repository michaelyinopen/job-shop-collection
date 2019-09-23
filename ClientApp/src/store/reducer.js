import { combineReducers } from 'redux';
import createReducer from '../functions/createReducer';
import {
  getJobSetsBegin,
  getJobSetsSucceed,
  getJobSetsFailed,

  deleteJobSetBegin,
  deleteJobSetSucceed,
  deleteJobSetFailed,
  clearDeletingJobSets
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

const jobSetsInitialState = {}
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

const deletingJobSetInitialState = {
  id: undefined,
  succeed: false,
  failed: false,
};
const deletingJobSet = createReducer(
  deletingJobSetInitialState,
  {
    [deleteJobSetBegin]: (state, { id }) => ({
      ...state,
      id
    }),
    [deleteJobSetSucceed]: (state, _action) => {
      if (state.succeed && !state.failed) {
        return state;
      }
      return {
        ...state,
        succeed: true,
        failed: false,
      };
    },
    [deleteJobSetFailed]: (state, { id }) => {
      if (!state.succeed && state.failed) {
        return state;
      }
      return {
        ...state,
        succeed: false,
        failed: true,
      };
    }
  }
);

const deletingJobSetsInitialState = {};
const deletingJobSets = createReducer(
  deletingJobSetsInitialState,
  {
    [deleteJobSetBegin]: (state, action) => {
      const { id } = action;
      return Object.assign({}, state, {
        [id]: deletingJobSet(undefined, action)
      });
    },
    [deleteJobSetSucceed]: (state, action) => {
      const { id, clear } = action;
      if (clear) {
        const { [id]: _id, ...restState } = state;
        return restState;
      }
      const element = state[id];
      const updatedElement = deletingJobSet(element, action);
      if (element === updatedElement) {
        return state;
      }
      return Object.assign({}, state, {
        [id]: updatedElement
      });
    },
    [deleteJobSetFailed]: (state, action) => {
      const { id, clear } = action;
      if (clear) {
        const { [id]: undefiend, ...restState } = state;
        return restState;
      }
      const element = state[id];
      const updatedElement = deletingJobSet(element, action);
      if (element === updatedElement) {
        return state;
      }
      return Object.assign({}, state, {
        [id]: updatedElement
      });
    },
    [clearDeletingJobSets]: (_state, _action) => deletingJobSetsInitialState,
  }
);

export const initialState = {
  getJobSetIsLoading: getJobSetIsLoadingInitialState,
  getJobSetFailedMessage: getJobSetFailedMessageInitialState,
  jobSets: jobSetsInitialState,
  deletingJobSets: deletingJobSetsInitialState,
};

const reducer = combineReducers({
  getJobSetIsLoading,
  getJobSetFailedMessage,
  jobSets,
  deletingJobSets
});

export default reducer;