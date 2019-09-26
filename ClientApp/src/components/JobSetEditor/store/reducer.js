import { combineReducers } from 'redux';
import reduceReducers from 'reduce-reducers';
import { isEqual } from 'lodash';
import memoizeOne from 'memoize-one';
import { addMilliseconds, differenceInMilliseconds } from 'date-fns/fp';
import compareJobSetWithState from './compareJobSetWithState';
import createReducer from '../../../functions/createReducer';
import getNextId, { getNextOfMax } from '../../../functions/getNextId';
import getNewColor from '../jobColor';
import {
  setJobSet,

  addMachine,
  updateMachineTitle,
  updateMachineDescription,
  removeMachine,

  createJob,
  deleteJob,

  createProcedure,
  updateProcedure,
  moveProcedure,
  deleteProcedure,

  setIsAutoTimeOptions,
  setMaxTimeFromRef,
  setViewStartTimeFromRef,
  setViewEndTimeFromRef,
  setMinViewDuration,
  setMaxViewDuration,

  changeJobColor
} from './actionTypes';

//#region Machines
const machineInitialState = id => ({
  id,
  title: `M${id}`,
  description: `Machine ${id}`
});

// const machine = id => createReducer(
//   machineInitialState(id),
//   {
//     // [addMachine]: state => state; // redundent because returns initial state
//     [updateMachineTitle]: (state, { title }) => {
//       if (state.title === title) {
//         return state;
//       }
//       return ({
//         ...state,
//         title
//       });
//     },
//     [updateMachineDescription]: (state, { description }) => {
//       if (state.description === description) {
//         return state;
//       }
//       return ({
//         ...state,
//         description
//       });
//     }
//   }
// );

const machinesInitialState = [];
// const machines = createReducer(
//   machinesInitialState,
//   {
//     [addMachine]: (state, action) => {
//       const id = getNextId(state);
//       return [...state, machine(id)(undefined, action)];
//     },
//     [updateMachineTitle]: updateItem(machine),
//     [updateMachineDescription]: updateItem(machine),
//     [removeMachine]: (state, { id }) => {
//       if (!state.some(m => m.id === id)) {
//         return state;
//       }
//       return state.filter(m => m.id !== id);
//     },
//   }
// );

export const initMachines = machinesArg => {
  return machinesArg.map(m => ({
    ...machineInitialState(m.id),
    title: m.title,
    description: m.description,
  }));
};
//#endregion Machines

//#region Jobs
const jobInitialState = id => ({
  id
});

// const job = id => createReducer(
//   jobInitialState(id),
//   {
//     // [createJob], // redundent because returns initial state
//     // [deleteJob], // redundent because returns initial state
//     // [setJobSet] // redundent because returns initial state
//   }
// );

const jobsInitialState = [];
// const jobs = createReducer(
//   jobsInitialState,
//   {
//     [createJob]: (state, action) => {
//       const id = getNextId(state);
//       return [...state, job(id)(undefined, action)];
//     },
//     [deleteJob]: (state, { id }) => {
//       if (!state.some(j => j.id === id)) {
//         return state;
//       }
//       return state.filter(j => j.id !== id);
//     },
//   }
// );

export const initJobs = jobsArg => {
  return jobsArg.map(j => ({
    ...jobInitialState(j.id),
  }));
};
//#endregion jobs

//#region Procedures
const procedureInitialState = id => ({
  id,
  jobId: undefined,
  machineId: undefined,
  sequence: undefined,
  processingMilliseconds: undefined
});

// const procedure = id => createReducer(
//   procedureInitialState(id),
//   {
//     [createProcedure]: (state, { jobId }, sequence) => ({
//       ...state,
//       jobId,
//       sequence
//     }),
//     [updateProcedure]: (state, { machineId, processingMilliseconds }) => {
//       if (state.machineId === machineId
//         && state.processingMilliseconds === processingMilliseconds) {
//         return state;
//       }
//       return ({
//         ...state,
//         machineId,
//         processingMilliseconds
//       });
//     },
//     [moveProcedure]: (state, _action, sequence) => {
//       if (state.sequence === sequence) {
//         return state;
//       }
//       return ({
//         ...state,
//         sequence
//       });
//     },
//     [deleteProcedure]: (state, _action, sequence) => {
//       if (state.sequence === sequence) {
//         return state;
//       }
//       return ({
//         ...state,
//         sequence
//       });
//     },
//     [removeMachine]: (state, { id: machineId }) => {
//       if (state.machineId !== machineId) {
//         return state;
//       }
//       return ({
//         ...state,
//         machineId: undefined
//       });
//     },
//   }
// );

const proceduresInitialState = [];
// const procedures = createReducer(
//   proceduresInitialState,
//   {
//     [createProcedure]: (state, action) => {
//       const { jobId } = action;
//       const id = getNextId(state);
//       const proceduresOfJobSequences = state.filter(p => p.jobId === jobId).map(p => p.sequence);
//       const nextSequence = getNextOfMax(proceduresOfJobSequences);
//       return [...state, procedure(id)(undefined, action, nextSequence)];
//     },
//     [updateProcedure]: updateItem(procedure),
//     [moveProcedure]: (state, action) => {
//       // targetSequence is this procedure's sequence after move
//       const { id, targetSequence } = action;
//       const actingProcedure = state.find(p => p.id === id);
//       if (!actingProcedure) {
//         return state;
//       }
//       const { jobId, sequence: sourceSequence } = actingProcedure;
//       if (sourceSequence === targetSequence) {
//         return state;
//       }
//       return state.map(p => {
//         const { id: currentId, jobId: currentJobId, sequence } = p;
//         if (currentJobId !== jobId) {
//           return p;
//         }
//         if (currentId === id) {
//           return procedure(currentId)(p, action, targetSequence);
//         }
//         let updatedSequence = sequence;
//         if (updatedSequence > sourceSequence) {
//           updatedSequence = updatedSequence - 1;
//         }
//         if (updatedSequence >= targetSequence) { // note: use updatedSequence here
//           updatedSequence = updatedSequence + 1;
//         }
//         return procedure(currentId)(p, action, updatedSequence);
//       });
//     },
//     [deleteProcedure]: (state, action) => {
//       const { id } = action;
//       const procedureToDelete = state.find(p => p.id === id);
//       if (!procedureToDelete) {
//         return state;
//       }
//       const jobId = procedureToDelete.jobId;
//       const sequenceOfDelete = procedureToDelete.sequence;
//       return state
//         .filter(j => j.id !== id)
//         .map(p => {
//           const { id: currentId, jobId: currentJobId, sequence } = p;
//           if (currentJobId !== jobId) {
//             return p;
//           }
//           let updatedSequence = sequence;
//           if (updatedSequence > sequenceOfDelete) {
//             updatedSequence = updatedSequence - 1;
//           }
//           return procedure(currentId)(p, action, updatedSequence);
//         });
//     },
//     [deleteJob]: (state, { id: jobId }) => {
//       if (!state.some(p => p.jobId === jobId)) {
//         return state;
//       }
//       return state.filter(p => p.jobId !== jobId);
//     },
//     [removeMachine]: (state, action) => {
//       const { id: machineId } = action;
//       if (!state.some(p => p.machineId === machineId)) {
//         return state;
//       }
//       return state
//         .map(p => {
//           const { id: currentId, machineId: currentMachineId } = p;
//           if (currentMachineId !== machineId) {
//             return p;
//           }
//           return procedure(currentId)(p, action);
//         });
//     }
//   }
// );

export const initProcedures = jobsArg => {
  return jobsArg
    .map(j => j.procedures)
    .reduce((acc, cur) => acc.concat(cur), [])
    .map(p => ({
      ...procedureInitialState(p.id),
      jobId: p.jobId,
      machineId: p.machineId,
      sequence: p.sequence,
      processingMilliseconds: p.processingMilliseconds,
    }));
}
//#endregion Procedures

//#region Time Options
const isAutoTimeOptionsInitialState = true;
const isAutoTimeOptions = createReducer(
  isAutoTimeOptionsInitialState,
  {
    [setIsAutoTimeOptions]: (_state, { isAuto }) => isAuto
  }
);

const referenceDateInitialState = new Date(0);
const timeOptionsInitialState = {
  referenceDate: referenceDateInitialState, // minTime === referenceDate
  maxTime: undefined,
  viewStartTime: undefined,
  viewEndTime: undefined,
  minViewDuration: undefined,
  maxViewDuration: undefined
};

const timeOptions = createReducer(
  timeOptionsInitialState,
  {
    [setMaxTimeFromRef]: (state, { maxTimeFromRef }) => {
      const maxTime = addMilliseconds(maxTimeFromRef)(state.referenceDate);
      return {
        ...state,
        maxTime
      }
    },
    [setViewStartTimeFromRef]: (state, { viewStartTimeFromRef }) => {
      const viewStartTime = addMilliseconds(viewStartTimeFromRef)(state.referenceDate);
      return {
        ...state,
        viewStartTime
      }
    },
    [setViewEndTimeFromRef]: (state, { viewEndTimeFromRef }) => {
      const viewEndTime = addMilliseconds(viewEndTimeFromRef)(state.referenceDate);
      return {
        ...state,
        viewEndTime
      }
    },
    [setMinViewDuration]: (state, { minViewDuration }) => ({
      ...state,
      minViewDuration
    }),
    [setMaxViewDuration]: (state, { maxViewDuration }) => ({
      ...state,
      maxViewDuration
    }),
  }
)
//#endregion Time Options

//#region jobColors
const jobColorInitialState = id => ({
  id,
  color: undefined,
  textColor: undefined,
});

const jobColor = id => createReducer(
  jobColorInitialState(id),
  {
    //[createJob]
    [changeJobColor]: (state, _action, jobColor) => ({
      ...state,
      color: jobColor.color,
      textColor: jobColor.textColor,
    }),
  }
);

const jobColorsInitialState = [];
const jobColors = createReducer(
  jobColorsInitialState,
  {
    //[createJob]
    [deleteJob]: (state, { id }) => {
      if (!state.some(jc => jc.id === id)) {
        return state;
      }
      return state.filter(jc => jc.id !== id);
    },
    [changeJobColor]: (state, action) => {
      const { id } = action;
      const excludeColors = state.map(jc => jc.color);
      return state.map(jc => {
        if (jc.id === id) {
          const currentColor = jc.color;
          const [color, textColor] = getNewColor(excludeColors, currentColor);
          return jobColor(id)(jc, action, { color, textColor });
        }
        return jc;
      });
    },
  }
);

const initJobColors = (jobs, jobColors = []) => {
  const predefinedJobColors = jobColors.filter(jc => jobs.some(j => j.id === jc.id)); // exclude orphan jobColors
  let newJobColors = [];
  for (var i = 0; i < jobs.length; ++i) {
    const id = jobs[i].id;
    const predefinedJobColor = predefinedJobColors.find(jc => jc.id === id);
    const excludeColors = [...newJobColors, predefinedJobColors].map(jc => jc.color);
    const [color, textColor] = predefinedJobColor ? [predefinedJobColor.color, predefinedJobColor.textColor] : getNewColor(excludeColors);
    newJobColors.push(({
      id,
      color,
      textColor,
    }));
  }
  return [...newJobColors];
}
//#endregion jobColors

export const init = ({
  machines: machinesArg,
  jobs: jobsArg,
  isAutoTimeOptions = isAutoTimeOptionsInitialState,
  timeOptions: timeOptionsArg,
  jobColors: jobColorsArg,
}) => {
  const mappedMachines = machinesArg ? initMachines(machinesArg) : machinesInitialState;
  const mappedJobs = jobsArg ? initJobs(jobsArg) : jobsInitialState;
  const mappedProcedures = jobsArg ? initProcedures(jobsArg) : proceduresInitialState;
  const clonedTimeOptions = timeOptionsArg ? { ...timeOptionsArg } : timeOptionsInitialState;
  const initializedJobColors = initJobColors(mappedJobs, jobColorsArg);
  const state = {
    machines: mappedMachines,
    jobs: mappedJobs,
    procedures: mappedProcedures,
    isAutoTimeOptions,
    timeOptions: clonedTimeOptions,
    jobColors: initializedJobColors
  };
  return adjustTimeOptions(state);
}

// const combinedReducer = combineReducers({
//   machines,
//   jobs,
//   procedures,
//   isAutoTimeOptions,
//   timeOptions,
//   jobColors
// });

// const reducer = (state, action) => {
//   if (action.type === setJobSet) {
//     const { jobSet } = action;
//     const [isEqual, mappedMachines, mappedJobs, mappedProcedures, isJobsEqual] = compareJobSetWithState(
//       jobSet,
//       state.machines,
//       state.jobs,
//       state.procedures
//     );
//     if (isEqual) {
//       return state;
//     }
//     return {
//       ...state,
//       machines: mappedMachines,
//       jobs: mappedJobs,
//       procedures: mappedProcedures,
//       jobColors: isJobsEqual ? state.jobColors : initJobColors(mappedJobs, state.jobColors)
//     };
//   }
//   else {
//     return combinedReducer(state, action);
//   }
// };

// //#region adjustTimeOptions
// const memoizeGetProcessingTimeSum = memoizeOne(
//   procedures => procedures.reduce((prev, currProcess) => prev + currProcess.processingMilliseconds, 0)
// );

// const memoizeSumOfMinTwoProcessingTime = memoizeOne(
//   procedures => procedures
//     .reduce((prev, currProcess) => { // [process1, process2, ...] to [min1, min2]
//       if (!currProcess.processingMilliseconds) {
//         return prev;
//       }
//       if (!prev[0]) { // first element
//         prev.push(currProcess.processingMilliseconds);
//         return prev;
//       }
//       if (!prev[1]) { // second element
//         if (currProcess.processingMilliseconds < prev[0]) {
//           prev.unshift(currProcess.processingMilliseconds); // insert at beginning
//           return prev;
//         }
//         prev.push(currProcess.processingMilliseconds); // insert at end
//         return prev;
//       }
//       if (currProcess.processingMilliseconds < prev[0]) {
//         prev.unshift(currProcess.processingMilliseconds);
//         prev.pop(currProcess.processingMilliseconds);
//         return prev; //[currProcess.processingMilliseconds, prev[0]]
//       }
//       if (currProcess.processingMilliseconds < prev[1]) {
//         prev.splice(1, 1, currProcess.processingMilliseconds);
//         return prev; //[ prev[0], currProcess.processingMilliseconds]
//       }
//       return prev;
//     }, [])
//     .reduce((a, b) => a + b, 0)// [min1, min2] to min1 + min2
// );

// const autoTimeOptions = state => {
//   const processingTimeSum = memoizeGetProcessingTimeSum(state.procedures);  // remove memoization, because always/usually changed
//   const maxTime = addMilliseconds(processingTimeSum)(state.timeOptions.referenceDate);
//   const sumOfMinTwoProcessingTime = memoizeSumOfMinTwoProcessingTime(state.procedures); // remove memoization

//   const autoTimeOptions = {
//     ...state.timeOptions,
//     maxTime: maxTime,
//     viewStartTime: state.timeOptions.referenceDate,
//     viewEndTime: maxTime,
//     minViewDuration: sumOfMinTwoProcessingTime,
//     maxViewDuration: processingTimeSum
//   };
//   if (!isEqual(state.timeOptions, autoTimeOptions)) {
//     return {
//       ...state,
//       timeOptions: autoTimeOptions
//     };
//   }
//   return state;
// }

// const adjustTimeOptions = state => {
//   if (state.isAutoTimeOptions) {
//     return autoTimeOptions(state);
//   }
//   let fixUndefinedTimeOptions = { ...state.timeOptions };
//   if (!fixUndefinedTimeOptions.maxTime) {
//     fixUndefinedTimeOptions.maxTime = addMilliseconds(memoizeGetProcessingTimeSum(state.procedures))(fixUndefinedTimeOptions.referenceDate);
//   }
//   if (!fixUndefinedTimeOptions.viewStartTime) {
//     fixUndefinedTimeOptions.viewStartTime = fixUndefinedTimeOptions.referenceDate;
//   }
//   if (!fixUndefinedTimeOptions.viewEndTime) {
//     fixUndefinedTimeOptions.viewEndTime = fixUndefinedTimeOptions.maxTime;
//   }
//   if (!fixUndefinedTimeOptions.minViewDuration) {
//     //minViewDuration <= (viewEnd - viewStart)
//     // && maxViewDuration <= (fixUndefinedTimeOptions.maxTime - referenceDate)
//     fixUndefinedTimeOptions.minViewDuration = Math.min(
//       memoizeSumOfMinTwoProcessingTime(state.procedures),
//       differenceInMilliseconds(fixUndefinedTimeOptions.viewStartTime)(fixUndefinedTimeOptions.viewEndTime)
//     );
//     fixUndefinedTimeOptions.minViewDuration = Math.min(
//       fixUndefinedTimeOptions.minViewDuration,
//       differenceInMilliseconds(fixUndefinedTimeOptions.referenceDate)(fixUndefinedTimeOptions.maxTime)
//     );
//   }
//   if (!fixUndefinedTimeOptions.maxViewDuration) {
//     //maxViewDuration >= minViewDuration
//     // && maxViewDuration <= (fixUndefinedTimeOptions.maxTime - referenceDate)
//     fixUndefinedTimeOptions.maxViewDuration = Math.max(
//       memoizeGetProcessingTimeSum(state.procedures),
//       fixUndefinedTimeOptions.minViewDuration
//     );
//     fixUndefinedTimeOptions.maxViewDuration = Math.min(
//       fixUndefinedTimeOptions.maxViewDuration,
//       differenceInMilliseconds(fixUndefinedTimeOptions.referenceDate)(fixUndefinedTimeOptions.maxTime)
//     );
//   }
//   if (!isEqual(state.timeOptions, fixUndefinedTimeOptions)) {
//     return {
//       ...state,
//       timeOptions: fixUndefinedTimeOptions
//     };
//   }
//   return state;
// }

// const isAdjustTimeOptionsRequired = (state, newState) => {
//   const isAutoChangedToTrueFn = () => newState.isAutoTimeOptions && state.isAutoTimeOptions !== newState.isAutoTimeOptions;
//   const isAutoAndProceduresChangedFn = () => newState.isAutoTimeOptions && state.procedures !== newState.procedures;
//   return isAutoChangedToTrueFn() || isAutoAndProceduresChangedFn();
// }

// const adjustNewJobColor = state => {
//   // if some jobs does not have job color
//   if (state.jobs.some(j => !state.jobColors.some(jc => jc.id === j.id))) {
//     return {
//       ...state,
//       jobColors: initJobColors(state.jobs, state.jobColors)
//     };
//   }
//   return state;
// };

// const reducerWithAdjustedTimeOptionsAndJobColor = (state, action) => {
//   const newState = reducer(state, action);
//   const newStateWithTimeOptions = isAdjustTimeOptionsRequired(state, newState) ? adjustTimeOptions(newState) : newState;
//   const newStateWithJobColor = adjustNewJobColor(newStateWithTimeOptions);
//   return newStateWithJobColor;
// }
// //#endregion adjustTimeOptions

//todo
// const  timeOptionsAdjustReducer = (state, action, stateBeforeAnyReducers)=>{
//   ...
// }

// const reducer = (state, action) => reduceReducers(
//   combineReducer({

//   }),
//   timeOptionsAdjustReducer,
//   jobColorAdjustReducer,

// )(state, action, state);

// export default reducerWithAdjustedTimeOptionsAndJobColor;