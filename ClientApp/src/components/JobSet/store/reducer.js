import { combineReducers } from 'redux';
import undoable from 'redux-undo';
import editContentReducer, { editContentInit } from './editContentReducer';
import editStatusReducer, { editStatusInit } from './editStatusReducer';
import { jobSetEditorUpdatingActions } from '../../../store/currentJobSetAdjustReducer';
import { setCurrentJobSetId } from '../../../store/actionTypes';
import updateObject from '../../../functions/updateObject';
import reduceReducers from 'reduce-reducers';

const savedContentAdjustReducer = (state, action) => {
  if (!jobSetEditorUpdatingActions.includes(action.type)) {
    return state;
  }
  const savedContent = state.editContentHistory.present;
  return updateObject(state, { savedContent });
};

const hitoryStepNameInitialState = "initial";
const hitoryStepName = (_state, action) => {
  return action.type;
};

const initEditContentHistory = contentPresent => ({
  past: [],
  present: contentPresent,
  future: []
});

export const init = ({
  readOnly,
  jobSet,
}) => {
  const initialEditContent = editContentInit(jobSet);
  return {
    editStatus: editStatusInit(readOnly),
    editContentHistory: initEditContentHistory({
      hitoryStepName: hitoryStepNameInitialState,
      editContent: initialEditContent
    }),
    savedContent: initialEditContent,
  };
};

const distinctState = (_action, currentState, previousState) => {
  return currentState.editContent !== previousState.editContent;
};

const reducer = (state, action, ...rest) => reduceReducers([
  combineReducers({
    editStatus: editStatusReducer,
    editContentHistory: undoable(
      combineReducers({
        hitoryStepName,
        editContent: editContentReducer
      }),
      {
        filter: distinctState(),
        initTypes: [setCurrentJobSetId]
      }
    ),
    savedContent,
  }),
  savedContentAdjustReducer
])(state, action, ...rest);

export const editStatusSelector = state => state.editStatus;
export const editContentSelector = state => state.editContentHistory.editContent;// todo change

export default reducer;