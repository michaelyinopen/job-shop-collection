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

export const getJobSetBegin = id => ({
  type: fromActionTypes.getJobSetBegin,
  id
});

export const getJobSetSucceed = (id, jobSet) => ({
  type: fromActionTypes.getJobSetSucceed,
  id,
  title: jobSet.title,
  description: jobSet.description,
  content: JSON.parse(jobSet.content),
  jobColors: jobSet.jobColors,
  isAutoTimeOptions: jobSet.isAutoTimeOptions,
  timeOptions: jobSet.timeOptions,
  eTag: jobSet.eTag,
});

export const getJobSetFailed = (id, failedMessage) => ({
  type: fromActionTypes.getJobSetFailed,
  id,
  failedMessage
});