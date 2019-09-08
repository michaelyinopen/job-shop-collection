import * as fromActionTypes from './actionTypes';

export const getJobSetsBegin = () => ({
  type: fromActionTypes.getJobSetsBegin
});

export const getJobSetsSucceed = () => ({
  type: fromActionTypes.getJobSetsSucceed
});

export const getJobSetsFailed = () => ({
  type: fromActionTypes.getJobSetsFailed
});