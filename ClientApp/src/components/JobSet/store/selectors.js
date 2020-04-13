import { createSelector } from 'reselect';
import { differenceInMilliseconds } from 'date-fns/fp';
import compareJobSetWithState from './compareJobSetWithState';
import {
  selectJobSetEditor,
} from '../../../store/selectors';
export { selectCurrentJobSetId } from '../../../store/selectors';

export const selectJobSetEditorPresentEditContent = createSelector(
  selectJobSetEditor,
  jobSetEditor => jobSetEditor.editContentHistory.present.editContent
);

export const selectReadOnly = createSelector(
  selectJobSetEditor,
  jobSetEditor => jobSetEditor.editStatus.readOnly
);

export const selectTitle = createSelector(
  selectJobSetEditorPresentEditContent,
  content => content.title
);

export const selectDescription = createSelector(
  selectJobSetEditorPresentEditContent,
  content => content.description
);

export const selectMachines = createSelector(
  selectJobSetEditorPresentEditContent,
  content => content.machines
);

export const selectMachineIds = createSelector(
  selectMachines,
  machines => Object.keys(machines).map(Number).sort((a, b) => a - b)
);

export const selectMachinesArray = createSelector(
  selectMachines,
  machines => Object.values(machines).sort((a, b) => a.id - b.id)
);

export const makeMachineSelector = () =>
  createSelector(
    selectMachines,
    (_, id) => id,
    (machines, id) => machines[id]
  );

export const selectJobs = createSelector(
  selectJobSetEditorPresentEditContent,
  content => content.jobs
);

export const selectJobIds = createSelector(
  selectJobs,
  jobs => Object.keys(jobs).map(Number).sort((a, b) => a - b)
);

export const makeJobSelector = () =>
  createSelector(
    selectJobs,
    (_, id) => id,
    (jobs, id) => jobs[id]
  );

export const selectProcedures = createSelector(
  selectJobSetEditorPresentEditContent,
  content => content.procedures
);

export const selectProcedureIds = createSelector(
  selectProcedures,
  procedures => Object.values(procedures).sort((a, b) => a.sequence - b.sequence).map(p => p.id)
);

export const makeProcedureIdsOfJobSelector = () =>
  createSelector(
    selectProcedures,
    (_, jobId) => jobId,
    (procedures, jobId) => Object.values(procedures).filter(p => p.jobId === jobId).sort((a, b) => a.sequence - b.sequence).map(p => p.id)
  );

export const makeProcedureSelector = () =>
  createSelector(
    selectProcedures,
    (_, id) => id,
    (procedures, id) => procedures[id]
  );

export const selectGetProcedureSequence = createSelector(
  selectProcedures,
  procedures => id => {
    const procedure = procedures[id];
    return procedure ? procedure.sequence : undefined;
  }
);

export const makeProcedureOfMachineSelector = () =>
  createSelector(
    selectProcedures,
    (_, machineId) => machineId,
    (procedures, machineId) => Object.values(procedures).filter(p => p.machineId === machineId)
  );

export const selectIsAutoTimeOptions = createSelector(
  selectJobSetEditorPresentEditContent,
  content => content.isAutoTimeOptions
);

export const selectTimeOptions = createSelector(
  selectJobSetEditorPresentEditContent,
  content => content.timeOptions
);

export const selectReferenceDate = createSelector(
  selectTimeOptions,
  timeOptions => timeOptions.referenceDate
);

export const selectMaxTime = createSelector(
  selectTimeOptions,
  timeOptions => timeOptions.maxTime
);

export const selectViewStartTime = createSelector(
  selectTimeOptions,
  timeOptions => timeOptions.viewStartTime
);

export const selectViewEndTime = createSelector(
  selectTimeOptions,
  timeOptions => timeOptions.viewEndTime
);

export const selectMinViewDuration = createSelector(
  selectTimeOptions,
  timeOptions => timeOptions.minViewDuration
);

export const selectMaxViewDuration = createSelector(
  selectTimeOptions,
  timeOptions => timeOptions.maxViewDuration
);

export const selectMaxTimeFromReferenceDate = createSelector(
  selectReferenceDate,
  selectMaxTime,
  (referenceDate, maxTime) => differenceInMilliseconds(referenceDate)(maxTime)
);

export const selectViewStartTimeFromReferenceDate = createSelector(
  selectReferenceDate,
  selectViewStartTime,
  (referenceDate, viewStartTime) => differenceInMilliseconds(referenceDate)(viewStartTime)
);

export const selectViewEndTimeFromReferenceDate = createSelector(
  selectReferenceDate,
  selectViewEndTime,
  (referenceDate, viewEndTime) => differenceInMilliseconds(referenceDate)(viewEndTime)
);

export const selectJobColors = createSelector(
  selectJobSetEditorPresentEditContent,
  content => content.jobColors
);

// returns [backgroundColor, textColor]
export const makeJobColorSelector = () =>
  createSelector(
    selectJobColors,
    (_, id) => id,
    (jobColors, id) => {
      const jobColor = jobColors[id];
      if (jobColor) {
        return [jobColor.color, jobColor.textColor];
      }
    }
  );

export const selectJobSetForCreation = createSelector(
  selectTitle,
  selectDescription,
  selectMachines,
  selectJobs,
  selectProcedures,
  selectJobColors,
  selectIsAutoTimeOptions,
  selectTimeOptions,
  (
    title,
    description,
    machines,
    jobs,
    procedures,
    jobColors,
    isAutoTimeOptions,
    timeOptions
  ) => ({
    title,
    description,
    content: JSON.stringify({
      machines: Object.values(machines),
      jobs: Object.values(jobs)
        .map(j => ({
          ...j,
          procedures: Object.values(procedures).filter(p => p.jobId === j.id)
        }))
    }),
    jobColors: JSON.stringify(Object.values(jobColors)),
    isAutoTimeOptions,
    timeOptions: JSON.stringify(timeOptions)
  })
);

export const makeJobSetForUpdateSelector = () =>
  createSelector(
    (_, id) => id,
    selectTitle,
    selectDescription,
    selectMachines,
    selectJobs,
    selectProcedures,
    selectJobColors,
    selectIsAutoTimeOptions,
    selectTimeOptions,
    (
      id,
      title,
      description,
      machines,
      jobs,
      procedures,
      jobColors,
      isAutoTimeOptions,
      timeOptions
    ) => ({
      id,
      title,
      description,
      content: JSON.stringify({
        machines: Object.values(machines),
        jobs: Object.values(jobs)
          .map(j => ({
            ...j,
            procedures: Object.values(procedures).filter(p => p.jobId === j.id)
          }))
      }),
      jobColors: JSON.stringify(Object.values(jobColors)),
      isAutoTimeOptions,
      timeOptions: JSON.stringify(timeOptions)
    })
  );

export const selectCreatedId = createSelector(
  selectJobSetEditor,
  jobSetEditor => jobSetEditor.editStatus.createdId
);

export const selectIsCreating = createSelector(
  selectJobSetEditor,
  jobSetEditor => jobSetEditor.editStatus.isCreating
);

export const selectHasChanged = createSelector(
  state => selectJobSetEditor(state).savedContent,
  selectJobSetEditorPresentEditContent,
  (saved, present) => saved !== present
);

export const selectHasUndo = createSelector(
  selectJobSetEditor,
  jobSetEditor => jobSetEditor.editContentHistory.past.length > 0
);

export const selectHasRedo = createSelector(
  selectJobSetEditor,
  jobSetEditor => jobSetEditor.editContentHistory.future.length > 0
);