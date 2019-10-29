import { combineReducers } from 'redux';
import createReducer from '../../../functions/createReducer';
import { setReadOnly } from './actionTypes';
import {
  beginCreateJobSet,
  createJobSetSucceed,
  createJobSetFailed,

  beginUpdateJobSet,
  updateJobSetSucceed,
  updateJobSetFailed,
} from '../../../store/actionTypes';

const readOnlyInitialState = false;
const readOnly = createReducer(
  readOnlyInitialState,
  {
    [setReadOnly]: (_state, action) => action.isReadOnly
  }
);

const isCreatingInitialState = false;
const isCreating = createReducer(
  isCreatingInitialState,
  {
    [beginCreateJobSet]: (_state, _action) => true,
    [createJobSetSucceed]: (_state, _action) => false,
    [createJobSetFailed]: (_state, _action) => false,
  }
);

const createFailedMessageInitialState = null;
const createFailedMessage = createReducer(
  createFailedMessageInitialState,
  {
    [beginCreateJobSet]: (_state, _action) => null,
    [createJobSetSucceed]: (_state, _action) => null,
    [createJobSetFailed]: (_state, action) => action.failedMessage,
  }
);

const createdIdInitialState = null;
const createdId = createReducer(
  createdIdInitialState,
  {
    [beginCreateJobSet]: (_state, _action) => null,
    [createJobSetSucceed]: (_state, _action) => action.id,
    [createJobSetFailed]: (_state, _action) => null,
  }
);

const isUpdatingInitialState = false;
const isUpdating = createReducer(
  isUpdatingInitialState,
  {
    [beginUpdateJobSet]: (_state, _action) => true,
    [updateJobSetSucceed]: (_state, _action) => false,
    [updateJobSetFailed]: (_state, _action) => false,
  }
);

const updateFailedMessageInitialState = null;
const updateFailedMessage = createReducer(
  updateFailedMessageInitialState,
  {
    [beginUpdateJobSet]: (_state, _action) => null,
    [updateJobSetSucceed]: (_state, _action) => null,
    [updateJobSetFailed]: (_state, action) => action.failedMessage,
  }
);

export const editStatusInit = ({
  readOnly: readOnlyArg,
}) => {
  const readOnly = readOnlyArg ? readOnlyArg : readOnlyInitialState;

  return {
    readOnly,
    isCreating: isCreatingInitialState,
    createFailedMessage: createFailedMessageInitialState,
    createdId: createdIdInitialState,
    isUpdating: isUpdatingInitialState,
    updateFailedMessage: updateFailedMessageInitialState
  };
};

const editStatusReducer = combineReducers({
  readOnly,
  isCreating,
  createFailedMessage,
  createdId,
  isUpdating,
  updateFailedMessage
});

export default editStatusReducer;