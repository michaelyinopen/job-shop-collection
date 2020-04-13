import { createSelector } from 'reselect';

export const selectSnackbar = state => state.snackbar;

export const selectGetJobSetsIsLoading = state => state.getJobSetsIsLoading;

export const selectGetJobSetsFailedMessage = state => state.getJobSetsFailedMessage;

export const selectJobSets = state => state.jobSets;

export const selectJobSetHeaders = createSelector(
  selectJobSets,
  jobSets => Object.values(jobSets)
    .filter(jobSet => jobSet.eTag)
    .map(jobSet => ({
      id: jobSet.id,
      title: jobSet.title,
      description: jobSet.description,
      eTag: jobSet.eTag
    }))
);

export const makeJobSetHeaderSelector = () =>
  createSelector(
    selectJobSets,
    (_, id) => id,
    (jobSets, id) => {
      const jobSet = jobSets[id];
      if (!jobSet) {
        return undefined;
      }
      return {
        id: jobSet.id,
        title: jobSet.title,
        description: jobSet.description,
        eTag: jobSet.eTag
      };
    }
  );

export const makeSelectedJobSetsSelector = () =>
  createSelector(
    selectJobSets,
    (_, idArray) => idArray,
    (jobSets, idArray) => idArray
      .map(id => jobSets[id])
      .filter(js => js)
  );

export const selectJobSet = (state, id) => state.jobSets[id];

// returns true when there is no jobSet in redux store
export const makeJobSetIsLoadingSelector = () =>
  createSelector(
    (_, id) => id,
    selectJobSet,
    (id, jobSet) => {
      if (!id) {
        return false;
      }
      return jobSet ? jobSet.isLoading : true;
    }
  );

export const makeJobSetLoadFailedMessageSelector = () =>
  createSelector(
    (_, id) => id,
    selectJobSet,
    (id, jobSet) => {
      if (!id) {
        return undefined;
      }
      return jobSet ? jobSet.loadFailedMessage : undefined;
    }
  );

export const makeJobSetIsUpdatingSelector = () =>
  createSelector(
    (_, id) => id,
    selectJobSet,
    (id, jobSet) => {
      if (!id) {
        return undefined;
      }
      return jobSet ? jobSet.updateFailedMessage : undefined;
    }
  );

export const makeJobSetUpdateFailedMessageSelector = () =>
  createSelector(
    (_, id) => id,
    selectJobSet,
    (id, jobSet) => {
      if (!id) {
        return false;
      }
      return jobSet ? jobSet.isUpdating : false;
    }
  );

export const makeJobSetIsLockedSelector = () =>
  createSelector(
    (_, id) => id,
    selectJobSet,
    (id, jobSet) => {
      if (!id) {
        return false;
      }
      return jobSet ? jobSet.isLocked : false;
    }
  );

export const selectDeletingJobSets = state => state.jobSets;

export const selectJobSetSomeDeleting = createSelector(
  selectDeletingJobSets,
  deletingJobSets => Object.keys(deletingJobSets).length > 0
);

// returns [isDeleting, deleteSucceed, deleteFailed]
export const makeJobSetDeletingSelector = () =>
  createSelector(
    selectDeletingJobSets,
    (_, id) => id,
    (deletingJobSets, id) => {
      const deletingJobSet = deletingJobSets[id];
      if (deletingJobSet === undefined) {
        const isDeleting = false;
        const deleteSucceed = false;
        const deleteFailed = false;
        return [isDeleting, deleteSucceed, deleteFailed];
      }
      const isDeleting = true;
      const deleteSucceed = deletingJobSet.succeed;
      const deleteFailed = deletingJobSet.failed;
      return [isDeleting, deleteSucceed, deleteFailed];
    }
  );

export const selectCurrentJobSetId = state => state.currentJobSetId;

export const selectJobSetEditor = state => state.jobSetEditor;

// pattern:
// prop: id
// const { current: selectJobSetHeader } = useRef(makeJobSetHeaderSelector())
// const jobSetHeader = useSelector(state => selectJobSetHeader(state, id))