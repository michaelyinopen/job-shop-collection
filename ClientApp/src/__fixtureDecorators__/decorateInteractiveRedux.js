import React from 'react';
import { Provider, useSelector } from 'react-redux';
import { createStore } from "redux";
import reducer, { initialState } from '../store/reducer';

const StateDisplay = () => {
  const state = useSelector(state => state);
  return (
    <pre>
      {JSON.stringify(state, null, 2)}
    </pre>
  )
};

export default providedInitialState => Component => props => {
  const finalInitialState = providedInitialState ? providedInitialState : initialState;
  const store = createStore(reducer, finalInitialState);
  return (
    <Provider store={store}>
      <Component {...props} />
      <StateDisplay />
    </Provider>
  )
};
