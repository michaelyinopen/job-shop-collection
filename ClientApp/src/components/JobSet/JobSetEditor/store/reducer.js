import { combineReducers } from 'redux';
import undoable, { distinctState } from 'redux-undo';
import editContentReducer, { editContentInit } from './editContentReducer';
import editStatusReducer, { editStatusInit } from './editStatusReducer';

export const initEditContentHistory = contentPresent => ({
  past: [],
  present: contentPresent,
  future: []
});

export const init = ({
  readOnly,
  jobSet
}) => {
  return {
    editStatus: editStatusInit(readOnly),
    editContentHistory: initEditContentHistory(editContentInit(jobSet)),
  };
};

const reducer = combineReducers({
  editStatus: editStatusReducer,
  editContentHistory: undoable(editContentReducer, { filter: distinctState() })
});

export const editStatusSelector = state => state.editStatus;
export const editContentSelector = state => state.editContent;

export default reducer;