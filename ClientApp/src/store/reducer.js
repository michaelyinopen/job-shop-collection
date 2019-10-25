import { combineReducers } from 'redux';
import createReducer from '../functions/createReducer';
import {
  showSnackbar,
  closeSnackbar,

  getJobSetsBegin,
  getJobSetsSucceed,
  getJobSetsFailed,

  deleteJobSetBegin,
  deleteJobSetSucceed,
  deleteJobSetFailed,
  clearDeletingJobSets,

  getJobSetBegin,
  getJobSetSucceed,
  getJobSetFailed,

  savedJobSet,
} from './actionTypes';
import updateObject from '../functions/updateObject';
import updateKeyInObject from '../functions/updateKeyInObject';

const snackbarInitialState = {
  isOpen: false,
  message: undefined
};
const snackbar = createReducer(
  snackbarInitialState,
  {
    [showSnackbar]: (_state, { message }) => ({ isOpen: true, message }),
    [closeSnackbar]: (_state, _action) => ({ isOpen: false, message: undefined }),
  }
);

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
  isLoading: false,
  loadFailedMessage: null,
  isUpdating: false,
  updateFailedMessage: null,
};
const jobSet = createReducer(
  jobSetInitialState,
  {
    [getJobSetsSucceed]: (state, _action, jobSetFromAction) => ({
      ...state,
      id: jobSetFromAction.id,
      title: jobSetFromAction.title,
      description: jobSetFromAction.description,
      eTag: jobSetFromAction.eTag,
    }),
    [getJobSetBegin]: (state, action) => updateObject(state, { id: action.id, isLoading: true, loadingFailedMessage: null }),
    [getJobSetSucceed]: (state, action) => updateObject(
      state,
      {
        id: action.id,
        isLoading: false,
        title: action.title,
        description: action.description,
        content: action.content,
        jobColors: action.jobColors,
        isAutoTimeOptions: action.isAutoTimeOptions,
        timeOptions: action.timeOptions,
        eTag: action.eTag,
        loadFailedMessage: null
      }
    ),
    [getJobSetFailed]: (state, action) => updateObject(state, { id: action.id, isLoading: false, loadingFailedMessage: action.failedMessage }),
    [savedJobSet]: (state, action) => updateObject(
      state,
      {
        id: action.id,
        isLoading: false,
        title: action.title,
        description: action.description,
        content: action.content,
        jobColors: action.jobColors,
        isAutoTimeOptions: action.isAutoTimeOptions,
        timeOptions: action.timeOptions,
        eTag: action.eTag,
        loadFailedMessage: null
      }
    ),
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
    },
    [getJobSetBegin]: (state, action) => updateKeyInObject(state, action.id, js => jobSet(js, action)),
    [getJobSetSucceed]: (state, action) => updateKeyInObject(state, action.id, js => jobSet(js, action)),
    [getJobSetFailed]: (state, action) => updateKeyInObject(state, action.id, js => jobSet(js, action)),
    [savedJobSet]: (state, action) => updateKeyInObject(state, action.id, js => jobSet(js, action)),
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
  snackbar: snackbarInitialState,
  getJobSetIsLoading: getJobSetIsLoadingInitialState,
  getJobSetFailedMessage: getJobSetFailedMessageInitialState,
  jobSets: jobSetsInitialState,
  deletingJobSets: deletingJobSetsInitialState,
};

const reducer = combineReducers({
  snackbar,
  getJobSetIsLoading,
  getJobSetFailedMessage,
  jobSets,
  deletingJobSets
});

export default reducer;