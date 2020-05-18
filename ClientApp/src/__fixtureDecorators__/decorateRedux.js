import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from "redux";
import reducer, { initialState } from '../store/reducer';

export default providedInitialState => Component => props => {
  const finalInitialState = providedInitialState ? providedInitialState : initialState;
  const store = createStore(reducer, finalInitialState);
  return (
    <Provider store={store}>
      <Component {...props} />
    </Provider>
  )
};
