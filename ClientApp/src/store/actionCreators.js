import * as fromActionTypes from './actionTypes';

export const showSnackbar = message => ({
  type: fromActionTypes.showSnackbar,
  message
});

export const closeSnackbar = () => ({
  type: fromActionTypes.closeSnackbar,
});

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

export const setCurrnetJobSet = id =>({
  type: fromActionTypes.setCurrnetJobSet,
  id
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

export const beginCreateJobSet = () => ({
  type: fromActionTypes.beginCreateJobSet
});

export const createJobSetSucceed = (id, jobSet) => ({
  type: fromActionTypes.createJobSetSucceed,
  id,
  title: jobSet.title,
  description: jobSet.description,
  content: JSON.parse(jobSet.content),
  jobColors: jobSet.jobColors,
  isAutoTimeOptions: jobSet.isAutoTimeOptions,
  timeOptions: jobSet.timeOptions,
  eTag: jobSet.eTag,
});

export const createJobSetFailed = () => ({
  type: fromActionTypes.createJobSetFailed
});

export const beginUpdateJobSet = () => ({
  type: fromActionTypes.beginUpdateJobSet
});

export const updateJobSetSucceed = (id, jobSet) => ({
  type: fromActionTypes.updateJobSetSucceed,
  id,
  title: jobSet.title,
  description: jobSet.description,
  content: JSON.parse(jobSet.content),
  jobColors: jobSet.jobColors,
  isAutoTimeOptions: jobSet.isAutoTimeOptions,
  timeOptions: jobSet.timeOptions,
  eTag: jobSet.eTag,
});

export const updateJobSetFailed = () => ({
  type: fromActionTypes.beginUpdateJobSet
});