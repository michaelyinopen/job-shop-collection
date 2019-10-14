import * as fromActionTypes from './actionTypes';

export const setTitle = title => ({
  type: fromActionTypes.setTitle,
  title
});

export const setDescription = description => ({
  type: fromActionTypes.setDescription,
  description
});

// jobSet = {machines:[{id: 1, title: "M1", description: "Machine 1"}, {id: 2, title: "M2", description: "Machine 2"}],
//           jobs:[
//            {id: 1, procedures:[
//               {id: 1, jobId: 1, machineId: 1, sequence: 1, processingMilliseconds:60000}
//               {id: 2, jobId: 1, machineId: 2, sequence: 2, processingMilliseconds:120000}
//            ]},
//            {id: 2, procedures:[
//               {id: 3, jobId: 2, machineId: 2, sequence: 1, processingMilliseconds:180000}
//               {id: 4, jobId: 2, machineId: 1, sequence: 2, processingMilliseconds:60000}
//            ]},
//          ]}
export const setJobSet = jobSet => ({
  type: fromActionTypes.setJobSet,
  jobSet
});

export const addMachine = () => ({
  type: fromActionTypes.addMachine
});

export const updateMachineTitle = (id, title) => ({
  type: fromActionTypes.updateMachineTitle,
  id,
  title
});

export const updateMachineDescription = (id, description) => ({
  type: fromActionTypes.updateMachineDescription,
  id,
  description
});

export const removeMachine = id => ({
  type: fromActionTypes.removeMachine,
  id
});

export const createJob = () => ({
  type: fromActionTypes.createJob
});

export const deleteJob = id => ({ // also deletes procedures of job
  type: fromActionTypes.deleteJob,
  id
});

export const createProcedure = jobId => ({
  type: fromActionTypes.createProcedure,
  jobId
});

export const updateProcedure = (id, procedure) => ({
  type: fromActionTypes.updateProcedure,
  id,
  machineId: procedure.machineId,
  processingMilliseconds: procedure.processingMilliseconds
});

// targetSequence is this procedure's sequence after move
export const moveProcedure = (id, targetSequence) => ({
  type: fromActionTypes.moveProcedure,
  id,
  targetSequence
});

export const deleteProcedure = id => ({
  type: fromActionTypes.deleteProcedure,
  id
});

export const setIsAutoTimeOptions = isAuto => ({
  type: fromActionTypes.setIsAutoTimeOptions,
  isAuto
});

export const setMaxTimeFromRef = maxTimeFromRef => ({
  type: fromActionTypes.setMaxTimeFromRef,
  maxTimeFromRef
});

export const setViewStartTimeFromRef = viewStartTimeFromRef => ({
  type: fromActionTypes.setViewStartTimeFromRef,
  viewStartTimeFromRef
});

export const setViewEndTimeFromRef = viewEndTimeFromRef => ({
  type: fromActionTypes.setViewEndTimeFromRef,
  viewEndTimeFromRef
});


export const setMinViewDuration = minViewDuration => ({
  type: fromActionTypes.setMinViewDuration,
  minViewDuration
});

export const setMaxViewDuration = maxViewDuration => ({
  type: fromActionTypes.setMaxViewDuration,
  maxViewDuration
});

export const changeJobColor = id => ({
  type: fromActionTypes.changeJobColor,
  id
});