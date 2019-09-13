import { useMemo, useContext } from 'react';
import JobShopCollectionStateContext from '../components/JobShopCollectionStateContext';

export const useJobSetIds = () => {
  const state = useContext(JobShopCollectionStateContext);
  const jobSetIds = useMemo(
    () => {
      return Object.keys(state.jobSets).sort((a, b) => parseInt(b) - parseInt(a));
    },
    [state.jobSets]
  )
  return jobSetIds;
};

export const useGetJobSetIsLoading = () => {
  const state = useContext(JobShopCollectionStateContext);
  return state.getJobSetIsLoading;
};

export const useGetJobSetFailedMessage = () => {
  const state = useContext(JobShopCollectionStateContext);
  return state.getJobSetFailedMessage;
};