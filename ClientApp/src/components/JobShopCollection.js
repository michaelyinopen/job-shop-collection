import React, { useReducer } from 'react';
import reducer, { initialState } from '../store/reducer';
import JobShopCollectionDispatchContext from './JobShopCollectionDispatchContext';
import JobShopCollectionStateContext from './JobShopCollectionStateContext';

const JobShopCollection = ({
  children
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <JobShopCollectionDispatchContext.Provider value={dispatch}>
      <JobShopCollectionStateContext.Provider value={state}>
        {children}
      </JobShopCollectionStateContext.Provider>
    </JobShopCollectionDispatchContext.Provider>
  );
};

export default JobShopCollection;