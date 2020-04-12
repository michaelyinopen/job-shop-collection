import React, { useReducer } from 'react';
import reducer, { initialState } from '../../store/reducer';
import JobShopCollectionDispatchContext from '../../components/JobShopCollectionDispatchContext';
import JobSetStateContext from '../../components/JobSet/JobSetStateContext';
import JobSetEditorStateContext from '../../components/JobSet/JobSetEditor/JobSetEditorStateContext';

const jobSetStateContextInitialState = {
  jobSetEditor: {
    editStatus: {
      readOnly: true
    }
  }
};

const jobSetEditorStateContextInitialState = {
  title: "You can test with cosmos"
};

const ReduxProviderDecortator = ({
  children
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <JobShopCollectionDispatchContext.Provider value={dispatch}>
      <JobSetStateContext.Provider value={jobSetStateContextInitialState}>
        <JobSetEditorStateContext.Provider value={jobSetEditorStateContextInitialState}>
          {children}
        </JobSetEditorStateContext.Provider>
      </JobSetStateContext.Provider>
    </JobShopCollectionDispatchContext.Provider>
  );
};

export default ReduxProviderDecortator;