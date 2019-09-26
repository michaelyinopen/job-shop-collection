import { isEqual } from 'lodash';
import {
  initMachines,
  initJobs,
  initProcedures
} from './reducer';

const sortFn = (a, b) => a.id - b.id;

// returns [
//   isEqual:           bool,
//   mappedMachines:    array<machine>?,
//   mappedJobs:        array<job>?,
//   mappedProcedures:  array<procedure>?,
//   isJobsEqual:       bool?,
// ] 
const compareJobSetWithState = (jobSet, machinesState, jobsState, proceduresState) => {
  const mappedMachines = initMachines(jobSet.machines);
  const mappedJobs = initJobs(jobSet.jobs);
  const mappedProcedures = initProcedures(jobSet.jobs);

  const isMachinesEqualFn = () => isEqual([...machinesState].sort(sortFn), [...mappedMachines].sort(sortFn));
  const isJobsEqualFn = () => isEqual([...jobsState].sort(sortFn), [...mappedJobs].sort(sortFn));
  const isJobsEqual = isJobsEqualFn();
  const isProceduresEqualFn = () => isEqual([...proceduresState].sort(sortFn), [...mappedProcedures].sort(sortFn));
  if (isJobsEqual && isMachinesEqualFn() && isProceduresEqualFn()) {
    return [true];
  }
  return [false, mappedMachines, mappedJobs, mappedProcedures, isJobsEqual];
};

export default compareJobSetWithState;