import * as fromActionTypes from './actionTypes';

export const getJobSetsBegin = () => ({
  type: fromActionTypes.getJobSetsBegin
});

export const getJobSetsSucceed = jobSets => ({
  type: fromActionTypes.getJobSetsSucceed,
  jobSets
});

export const getJobSetsFailed = failedMessage => ({
  type: fromActionTypes.getJobSetsFailed,
  failedMessage
});

export const deleteJobSetBegin = id => ({
  type: fromActionTypes.deleteJobSetBegin,
  id
});

export const deleteJobSetSucceed = (id, clear) => ({
  type: fromActionTypes.deleteJobSetSucceed,
  id,
  clear
});

export const deleteJobSetFailed = (id, clear) => ({
  type: fromActionTypes.deleteJobSetFailed,
  id,
  clear
});

export const clearDeletingJobSets = () => ({
  type: fromActionTypes.clearDeletingJobSets,
});