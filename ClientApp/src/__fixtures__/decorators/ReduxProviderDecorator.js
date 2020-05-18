import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from "redux";
import reducer, { initialState } from '../../store/reducer';

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

const store = createStore(reducer, initialState);

const ReduxProviderDecortator = ({
  children
}) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};

export default ReduxProviderDecortator;