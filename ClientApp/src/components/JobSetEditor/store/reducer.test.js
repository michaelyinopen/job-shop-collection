import reducer, { init } from './reducer';
import {
  setJobSet,
  addMachine,
  removeMachine,
  deleteJob,
  moveProcedure,
  deleteProcedure,
} from './actionCreators';

const initialState = {
  machines:
  {
    [1]: { "id": 1, title: "M1", description: "Machine 1" },
    [2]: { "id": 2, title: "M2", description: "Machine 2" },
    [3]: { "id": 3, title: "M3", description: "Machine 3" },
    [4]: { "id": 4, title: "M4", description: "Machine 4" }
  },
  jobs: {
    [1]: { "id": 1 },
    [2]: { "id": 2 },
    [3]: { "id": 3 },
  },
  procedures: {
    [1]: { "id": 1, "jobId": 1, "machineId": 1, "sequence": 1, "processingMilliseconds": 600000 },
    [2]: { "id": 2, "jobId": 1, "machineId": 2, "sequence": 2, "processingMilliseconds": 480000 },
    [3]: { "id": 3, "jobId": 1, "machineId": 3, "sequence": 3, "processingMilliseconds": 240000 },
    [4]: { "id": 4, "jobId": 2, "machineId": 2, "sequence": 1, "processingMilliseconds": 480000 },
    [5]: { "id": 5, "jobId": 2, "machineId": 1, "sequence": 2, "processingMilliseconds": 180000 },
    [6]: { "id": 6, "jobId": 2, "machineId": 4, "sequence": 3, "processingMilliseconds": 300000 },
    [7]: { "id": 7, "jobId": 2, "machineId": 3, "sequence": 4, "processingMilliseconds": 360000 },
    [8]: { "id": 8, "jobId": 3, "machineId": 1, "sequence": 1, "processingMilliseconds": 240000 },
    [9]: { "id": 9, "jobId": 3, "machineId": 2, "sequence": 2, "processingMilliseconds": 420000 },
    [10]: { "id": 10, "jobId": 3, "machineId": 4, "sequence": 3, "processingMilliseconds": 180000 }
  },
  isAutoTimeOptions: true,
  timeOptions: {
    referenceDate: new Date(0), // minTime === referenceDate
    maxTime: new Date(3480000),
    viewStartTime: new Date(0),
    viewEndTime: new Date(3480000),
    minViewDuration: 360000,
    maxViewDuration: 3480000
  },
  jobColors: {
    [1]: { "id": 1, color: '#3cb44b', textColor: '#000000' },
    [2]: { "id": 2, color: '#ffe119', textColor: '#000000' },
    [3]: { "id": 3, color: '#4363d8', textColor: '#ffffff' },
  }
};

test("init function produces initial state", () => {
  const machines = [
    { "id": 1, title: "M1", description: "Machine 1" },
    { "id": 2, title: "M2", description: "Machine 2" },
    { "id": 3, title: "M3", description: "Machine 3" },
    { "id": 4, title: "M4", description: "Machine 4" }
  ];
  const jobs = [
    {
      "id": 1,
      "procedures": [
        { "id": 1, "jobId": 1, "machineId": 1, "sequence": 1, "processingMilliseconds": 600000 },
        { "id": 2, "jobId": 1, "machineId": 2, "sequence": 2, "processingMilliseconds": 480000 },
        { "id": 3, "jobId": 1, "machineId": 3, "sequence": 3, "processingMilliseconds": 240000 }
      ]
    },
    {
      "id": 2,
      "procedures": [
        { "id": 4, "jobId": 2, "machineId": 2, "sequence": 1, "processingMilliseconds": 480000 },
        { "id": 5, "jobId": 2, "machineId": 1, "sequence": 2, "processingMilliseconds": 180000 },
        { "id": 6, "jobId": 2, "machineId": 4, "sequence": 3, "processingMilliseconds": 300000 },
        { "id": 7, "jobId": 2, "machineId": 3, "sequence": 4, "processingMilliseconds": 360000 }
      ]
    },
    {
      "id": 3,
      "procedures": [
        { "id": 8, "jobId": 3, "machineId": 1, "sequence": 1, "processingMilliseconds": 240000 },
        { "id": 9, "jobId": 3, "machineId": 2, "sequence": 2, "processingMilliseconds": 420000 },
        { "id": 10, "jobId": 3, "machineId": 4, "sequence": 3, "processingMilliseconds": 180000 }
      ]
    },
  ];
  const isAutoTimeOption = true;
  const jobColors = [
    { id: 1, color: '#3cb44b', textColor: '#000000' },
    { id: 2, color: '#ffe119', textColor: '#000000' },
    { id: 3, color: '#4363d8', textColor: '#ffffff' },
  ];

  const resultState = init({
    machines,
    jobs,
    isAutoTimeOption,
    jobColors
  });

  expect(resultState).toEqual(initialState);
});

test("init function with default timeOptions and jobColors", () => {
  const machines = [
    { "id": 1, title: "M1", description: "Machine 1" },
    { "id": 2, title: "M2", description: "Machine 2" },
    { "id": 3, title: "M3", description: "Machine 3" },
    { "id": 4, title: "M4", description: "Machine 4" }
  ];
  const jobs = [
    {
      "id": 1,
      "procedures": [
        { "id": 1, "jobId": 1, "machineId": 1, "sequence": 1, "processingMilliseconds": 600000 },
        { "id": 2, "jobId": 1, "machineId": 2, "sequence": 2, "processingMilliseconds": 480000 },
        { "id": 3, "jobId": 1, "machineId": 3, "sequence": 3, "processingMilliseconds": 240000 }
      ]
    },
    {
      "id": 2,
      "procedures": [
        { "id": 4, "jobId": 2, "machineId": 2, "sequence": 1, "processingMilliseconds": 480000 },
        { "id": 5, "jobId": 2, "machineId": 1, "sequence": 2, "processingMilliseconds": 180000 },
        { "id": 6, "jobId": 2, "machineId": 4, "sequence": 3, "processingMilliseconds": 300000 },
        { "id": 7, "jobId": 2, "machineId": 3, "sequence": 4, "processingMilliseconds": 360000 }
      ]
    },
    {
      "id": 3,
      "procedures": [
        { "id": 8, "jobId": 3, "machineId": 1, "sequence": 1, "processingMilliseconds": 240000 },
        { "id": 9, "jobId": 3, "machineId": 2, "sequence": 2, "processingMilliseconds": 420000 },
        { "id": 10, "jobId": 3, "machineId": 4, "sequence": 3, "processingMilliseconds": 180000 }
      ]
    },
  ];

  const resultState = init({
    machines,
    jobs
  });

  expect(resultState).toEqual(initialState);
});

test("reducer does not change state with enpty action", () => {
  const state = { ...initialState };
  const emptyAction = { type: '' };
  const newState = reducer(state, emptyAction);
  expect(newState).toBe(state);
});

test("init function with all defaults", () => {
  const resultState = init({});

  expect(resultState).toEqual({
    machines: {},
    jobs: {},
    procedures: {},
    isAutoTimeOptions: true,
    timeOptions: {
      referenceDate: new Date(0),
      maxTime: new Date(0),
      viewStartTime: new Date(0),
      viewEndTime: new Date(0),
      minViewDuration: 0,
      maxViewDuration: 0
    },
    jobColors: {}
  });
});

test("setJobSet action", () => {
  let state = init({});
  const setJobSetAction = setJobSet({
    machines: [
      { "id": 1, title: "M1", description: "Machine 1" },
      { "id": 2, title: "M2", description: "Machine 2" },
      { "id": 3, title: "M3", description: "Machine 3" },
      { "id": 4, title: "M4", description: "Machine 4" }
    ],
    jobs: [
      {
        "id": 1,
        "procedures": [
          { "id": 1, "jobId": 1, "machineId": 1, "sequence": 1, "processingMilliseconds": 600000 },
          { "id": 2, "jobId": 1, "machineId": 2, "sequence": 2, "processingMilliseconds": 480000 },
          { "id": 3, "jobId": 1, "machineId": 3, "sequence": 3, "processingMilliseconds": 240000 }
        ]
      },
      {
        "id": 2,
        "procedures": [
          { "id": 4, "jobId": 2, "machineId": 2, "sequence": 1, "processingMilliseconds": 480000 },
          { "id": 5, "jobId": 2, "machineId": 1, "sequence": 2, "processingMilliseconds": 180000 },
          { "id": 6, "jobId": 2, "machineId": 4, "sequence": 3, "processingMilliseconds": 300000 },
          { "id": 7, "jobId": 2, "machineId": 3, "sequence": 4, "processingMilliseconds": 360000 }
        ]
      },
      {
        "id": 3,
        "procedures": [
          { "id": 8, "jobId": 3, "machineId": 1, "sequence": 1, "processingMilliseconds": 240000 },
          { "id": 9, "jobId": 3, "machineId": 2, "sequence": 2, "processingMilliseconds": 420000 },
          { "id": 10, "jobId": 3, "machineId": 4, "sequence": 3, "processingMilliseconds": 180000 }
        ]
      }
    ]
  });
  state = reducer(state, setJobSetAction);
  expect(state).toEqual(initialState);
});

test("addMachine action", () => {
  const state = { ...initialState };
  const addMachineAction = addMachine();
  const resultState = reducer(state, addMachineAction);
  expect(resultState).toEqual({
    ...initialState,
    machines: {
      ...initialState.machines,
      [5]: { id: 5, title: 'M5', description: 'Machine 5' }
    }
  });
});

test("removeMachine action unsets procedures", () => {
  const state = { ...initialState };
  const removeMachineAction = removeMachine(1);
  const resultState = reducer(state, removeMachineAction);
  expect(resultState).toEqual({
    machines:
    {
      [2]: { "id": 2, title: "M2", description: "Machine 2" },
      [3]: { "id": 3, title: "M3", description: "Machine 3" },
      [4]: { "id": 4, title: "M4", description: "Machine 4" }
    },
    jobs: {
      [1]: { "id": 1 },
      [2]: { "id": 2 },
      [3]: { "id": 3 },
    },
    procedures: {
      [1]: { "id": 1, "jobId": 1, "machineId": undefined, "sequence": 1, "processingMilliseconds": 600000 },
      [2]: { "id": 2, "jobId": 1, "machineId": 2, "sequence": 2, "processingMilliseconds": 480000 },
      [3]: { "id": 3, "jobId": 1, "machineId": 3, "sequence": 3, "processingMilliseconds": 240000 },
      [4]: { "id": 4, "jobId": 2, "machineId": 2, "sequence": 1, "processingMilliseconds": 480000 },
      [5]: { "id": 5, "jobId": 2, "machineId": undefined, "sequence": 2, "processingMilliseconds": 180000 },
      [6]: { "id": 6, "jobId": 2, "machineId": 4, "sequence": 3, "processingMilliseconds": 300000 },
      [7]: { "id": 7, "jobId": 2, "machineId": 3, "sequence": 4, "processingMilliseconds": 360000 },
      [8]: { "id": 8, "jobId": 3, "machineId": undefined, "sequence": 1, "processingMilliseconds": 240000 },
      [9]: { "id": 9, "jobId": 3, "machineId": 2, "sequence": 2, "processingMilliseconds": 420000 },
      [10]: { "id": 10, "jobId": 3, "machineId": 4, "sequence": 3, "processingMilliseconds": 180000 }
    },
    isAutoTimeOptions: true,
    timeOptions: {
      referenceDate: new Date(0), // minTime === referenceDate
      maxTime: new Date(3480000),
      viewStartTime: new Date(0),
      viewEndTime: new Date(3480000),
      minViewDuration: 360000,
      maxViewDuration: 3480000
    },
    jobColors: {
      [1]: { "id": 1, color: '#3cb44b', textColor: '#000000' },
      [2]: { "id": 2, color: '#ffe119', textColor: '#000000' },
      [3]: { "id": 3, color: '#4363d8', textColor: '#ffffff' },
    }
  });
});

test("deleteJob action", () => {
  // deletes procedures
  const state = { ...initialState };
  const deleteJobAction = deleteJob(1);
  const resultState = reducer(state, deleteJobAction);
  expect(resultState).toEqual({
    machines:
    {
      [1]: { "id": 1, title: "M1", description: "Machine 1" },
      [2]: { "id": 2, title: "M2", description: "Machine 2" },
      [3]: { "id": 3, title: "M3", description: "Machine 3" },
      [4]: { "id": 4, title: "M4", description: "Machine 4" }
    },
    jobs: {
      [2]: { "id": 2 },
      [3]: { "id": 3 },
    },
    procedures: {
      [4]: { "id": 4, "jobId": 2, "machineId": 2, "sequence": 1, "processingMilliseconds": 480000 },
      [5]: { "id": 5, "jobId": 2, "machineId": 1, "sequence": 2, "processingMilliseconds": 180000 },
      [6]: { "id": 6, "jobId": 2, "machineId": 4, "sequence": 3, "processingMilliseconds": 300000 },
      [7]: { "id": 7, "jobId": 2, "machineId": 3, "sequence": 4, "processingMilliseconds": 360000 },
      [8]: { "id": 8, "jobId": 3, "machineId": 1, "sequence": 1, "processingMilliseconds": 240000 },
      [9]: { "id": 9, "jobId": 3, "machineId": 2, "sequence": 2, "processingMilliseconds": 420000 },
      [10]: { "id": 10, "jobId": 3, "machineId": 4, "sequence": 3, "processingMilliseconds": 180000 }
    },
    isAutoTimeOptions: true,
    timeOptions: {
      referenceDate: new Date(0), // minTime === referenceDate
      maxTime: new Date(2160000),
      viewStartTime: new Date(0),
      viewEndTime: new Date(2160000),
      minViewDuration: 360000,
      maxViewDuration: 2160000
    },
    jobColors: {
      [2]: { "id": 2, color: '#ffe119', textColor: '#000000' },
      [3]: { "id": 3, color: '#4363d8', textColor: '#ffffff' },
    }
  });
});

test("moveProcedure action moves from the beginning to second", () => {
  const state = { ...initialState };
  const moveProcedureAction = moveProcedure(4, 2);
  const resultState = reducer(state, moveProcedureAction);
  expect(resultState).toEqual({
    ...initialState,
    procedures: {
      ...initialState.procedures,
      [4]: { "id": 4, "jobId": 2, "machineId": 2, "sequence": 2, "processingMilliseconds": 480000 },
      [5]: { "id": 5, "jobId": 2, "machineId": 1, "sequence": 1, "processingMilliseconds": 180000 },
    }
  });
});

test("moveProcedure action moves from the second to the beginning", () => {
  const state = { ...initialState };
  const moveProcedureAction = moveProcedure(5, 1);
  const resultState = reducer(state, moveProcedureAction);
  expect(resultState).toEqual({
    ...initialState,
    procedures: {
      ...initialState.procedures,
      [4]: { "id": 4, "jobId": 2, "machineId": 2, "sequence": 2, "processingMilliseconds": 480000 },
      [5]: { "id": 5, "jobId": 2, "machineId": 1, "sequence": 1, "processingMilliseconds": 180000 },
    }
  });
});

test("moveProcedure action moves to the end", () => {
  const state = { ...initialState };
  const moveProcedureAction = moveProcedure(6, 4);
  const resultState = reducer(state, moveProcedureAction);
  expect(resultState).toEqual({
    ...initialState,
    procedures: {
      ...initialState.procedures,
      [6]: { "id": 6, "jobId": 2, "machineId": 4, "sequence": 4, "processingMilliseconds": 300000 },
      [7]: { "id": 7, "jobId": 2, "machineId": 3, "sequence": 3, "processingMilliseconds": 360000 },
    }
  });
});

test("moveProcedure action moves from the end", () => {
  const state = { ...initialState };
  const moveProcedureAction = moveProcedure(7, 3);
  const resultState = reducer(state, moveProcedureAction);
  expect(resultState).toEqual({
    ...initialState,
    procedures: {
      ...initialState.procedures,
      [6]: { "id": 6, "jobId": 2, "machineId": 4, "sequence": 4, "processingMilliseconds": 300000 },
      [7]: { "id": 7, "jobId": 2, "machineId": 3, "sequence": 3, "processingMilliseconds": 360000 },
    }
  });
});

test("moveProcedure action moves in the middle", () => {
  const state = { ...initialState };
  const moveProcedureAction = moveProcedure(5, 3);
  const resultState = reducer(state, moveProcedureAction);
  expect(resultState).toEqual({
    ...initialState,
    procedures: {
      ...initialState.procedures,
      [5]: { "id": 5, "jobId": 2, "machineId": 1, "sequence": 3, "processingMilliseconds": 180000 },
      [6]: { "id": 6, "jobId": 2, "machineId": 4, "sequence": 2, "processingMilliseconds": 300000 },
    }
  });
});

test("moveProcedure action works when skiping order", () => {
  const state = { ...initialState };
  const moveProcedureAction = moveProcedure(5, 4);
  const resultState = reducer(state, moveProcedureAction);
  expect(resultState).toEqual({
    ...initialState,
    procedures: {
      ...initialState.procedures,
      [5]: { "id": 5, "jobId": 2, "machineId": 1, "sequence": 4, "processingMilliseconds": 180000 },
      [6]: { "id": 6, "jobId": 2, "machineId": 4, "sequence": 2, "processingMilliseconds": 300000 },
      [7]: { "id": 7, "jobId": 2, "machineId": 3, "sequence": 3, "processingMilliseconds": 360000 },
    }
  });
});

test("moveProcedure action works when skiping order reverse", () => {
  const state = { ...initialState };
  const moveProcedureAction = moveProcedure(7, 2);
  const resultState = reducer(state, moveProcedureAction);
  expect(resultState).toEqual({
    ...initialState,
    procedures: {
      ...initialState.procedures,
      [5]: { "id": 5, "jobId": 2, "machineId": 1, "sequence": 3, "processingMilliseconds": 180000 },
      [6]: { "id": 6, "jobId": 2, "machineId": 4, "sequence": 4, "processingMilliseconds": 300000 },
      [7]: { "id": 7, "jobId": 2, "machineId": 3, "sequence": 2, "processingMilliseconds": 360000 },
    }
  });
});

test("deleteProcedure action", () => {
  // re-orders other procedures 
  const state = { ...initialState };
  const deleteProcedureAction = deleteProcedure(1);
  const resultState = reducer(state, deleteProcedureAction);
  expect(resultState).toEqual({
    machines:
    {
      [1]: { "id": 1, title: "M1", description: "Machine 1" },
      [2]: { "id": 2, title: "M2", description: "Machine 2" },
      [3]: { "id": 3, title: "M3", description: "Machine 3" },
      [4]: { "id": 4, title: "M4", description: "Machine 4" }
    },
    jobs: {
      [1]: { "id": 1 },
      [2]: { "id": 2 },
      [3]: { "id": 3 },
    },
    procedures: {
      [2]: { "id": 2, "jobId": 1, "machineId": 2, "sequence": 1, "processingMilliseconds": 480000 },
      [3]: { "id": 3, "jobId": 1, "machineId": 3, "sequence": 2, "processingMilliseconds": 240000 },
      [4]: { "id": 4, "jobId": 2, "machineId": 2, "sequence": 1, "processingMilliseconds": 480000 },
      [5]: { "id": 5, "jobId": 2, "machineId": 1, "sequence": 2, "processingMilliseconds": 180000 },
      [6]: { "id": 6, "jobId": 2, "machineId": 4, "sequence": 3, "processingMilliseconds": 300000 },
      [7]: { "id": 7, "jobId": 2, "machineId": 3, "sequence": 4, "processingMilliseconds": 360000 },
      [8]: { "id": 8, "jobId": 3, "machineId": 1, "sequence": 1, "processingMilliseconds": 240000 },
      [9]: { "id": 9, "jobId": 3, "machineId": 2, "sequence": 2, "processingMilliseconds": 420000 },
      [10]: { "id": 10, "jobId": 3, "machineId": 4, "sequence": 3, "processingMilliseconds": 180000 }
    },
    isAutoTimeOptions: true,
    timeOptions: {
      referenceDate: new Date(0), // minTime === referenceDate
      maxTime: new Date(2880000),
      viewStartTime: new Date(0),
      viewEndTime: new Date(2880000),
      minViewDuration: 360000,
      maxViewDuration: 2880000
    },
    jobColors: {
      [1]: { "id": 1, color: '#3cb44b', textColor: '#000000' },
      [2]: { "id": 2, color: '#ffe119', textColor: '#000000' },
      [3]: { "id": 3, color: '#4363d8', textColor: '#ffffff' },
    }
  });
});

test("init function with auto time options overrides provided", () => {
  const machines = [
    { "id": 1, title: "M1", description: "Machine 1" },
    { "id": 2, title: "M2", description: "Machine 2" },
    { "id": 3, title: "M3", description: "Machine 3" },
    { "id": 4, title: "M4", description: "Machine 4" }
  ];
  const jobs = [
    {
      "id": 1,
      "procedures": [
        { "id": 1, "jobId": 1, "machineId": 1, "sequence": 1, "processingMilliseconds": 600000 },
        { "id": 2, "jobId": 1, "machineId": 2, "sequence": 2, "processingMilliseconds": 480000 },
        { "id": 3, "jobId": 1, "machineId": 3, "sequence": 3, "processingMilliseconds": 240000 }
      ]
    },
    {
      "id": 2,
      "procedures": [
        { "id": 4, "jobId": 2, "machineId": 2, "sequence": 1, "processingMilliseconds": 480000 },
        { "id": 5, "jobId": 2, "machineId": 1, "sequence": 2, "processingMilliseconds": 180000 },
        { "id": 6, "jobId": 2, "machineId": 4, "sequence": 3, "processingMilliseconds": 300000 },
        { "id": 7, "jobId": 2, "machineId": 3, "sequence": 4, "processingMilliseconds": 360000 }
      ]
    },
    {
      "id": 3,
      "procedures": [
        { "id": 8, "jobId": 3, "machineId": 1, "sequence": 1, "processingMilliseconds": 240000 },
        { "id": 9, "jobId": 3, "machineId": 2, "sequence": 2, "processingMilliseconds": 420000 },
        { "id": 10, "jobId": 3, "machineId": 4, "sequence": 3, "processingMilliseconds": 180000 }
      ]
    },
  ];
  const isAutoTimeOption = true;
  const timeOptions = {
    referenceDate: new Date(0), // minTime === referenceDate
    maxTime: new Date(5000000),
    viewStartTime: new Date(0),
    viewEndTime: new Date(3500000),
    minViewDuration: 400000,
    maxViewDuration: 3500000
  };
  const jobColors = [
    { id: 1, color: '#3cb44b', textColor: '#000000' },
    { id: 2, color: '#ffe119', textColor: '#000000' },
    { id: 3, color: '#4363d8', textColor: '#ffffff' },
  ];

  const resultState = init({
    machines,
    jobs,
    isAutoTimeOption,
    timeOptions,
    jobColors
  });

  expect(resultState).toEqual(initialState);
});

test("init function with manual time options uses provided options", () => {
  const machines = [
    { "id": 1, title: "M1", description: "Machine 1" },
    { "id": 2, title: "M2", description: "Machine 2" },
    { "id": 3, title: "M3", description: "Machine 3" },
    { "id": 4, title: "M4", description: "Machine 4" }
  ];
  const jobs = [
    {
      "id": 1,
      "procedures": [
        { "id": 1, "jobId": 1, "machineId": 1, "sequence": 1, "processingMilliseconds": 600000 },
        { "id": 2, "jobId": 1, "machineId": 2, "sequence": 2, "processingMilliseconds": 480000 },
        { "id": 3, "jobId": 1, "machineId": 3, "sequence": 3, "processingMilliseconds": 240000 }
      ]
    },
    {
      "id": 2,
      "procedures": [
        { "id": 4, "jobId": 2, "machineId": 2, "sequence": 1, "processingMilliseconds": 480000 },
        { "id": 5, "jobId": 2, "machineId": 1, "sequence": 2, "processingMilliseconds": 180000 },
        { "id": 6, "jobId": 2, "machineId": 4, "sequence": 3, "processingMilliseconds": 300000 },
        { "id": 7, "jobId": 2, "machineId": 3, "sequence": 4, "processingMilliseconds": 360000 }
      ]
    },
    {
      "id": 3,
      "procedures": [
        { "id": 8, "jobId": 3, "machineId": 1, "sequence": 1, "processingMilliseconds": 240000 },
        { "id": 9, "jobId": 3, "machineId": 2, "sequence": 2, "processingMilliseconds": 420000 },
        { "id": 10, "jobId": 3, "machineId": 4, "sequence": 3, "processingMilliseconds": 180000 }
      ]
    },
  ];
  const isAutoTimeOption = false;
  const timeOptions = {
    referenceDate: new Date(0), // minTime === referenceDate
    maxTime: new Date(5000000),
    viewStartTime: new Date(0),
    viewEndTime: new Date(3500000),
    minViewDuration: 400000,
    maxViewDuration: 3500000
  };
  const jobColors = [
    { id: 1, color: '#3cb44b', textColor: '#000000' },
    { id: 2, color: '#ffe119', textColor: '#000000' },
    { id: 3, color: '#4363d8', textColor: '#ffffff' },
  ];

  const resultState = init({
    machines,
    jobs,
    isAutoTimeOption,
    timeOptions,
    jobColors
  });

  expect(resultState).toEqual({
    ...initialState,
    timeOptions: {
      referenceDate: new Date(0), // minTime === referenceDate
      maxTime: new Date(5000000),
      viewStartTime: new Date(0),
      viewEndTime: new Date(3500000),
      minViewDuration: 400000,
      maxViewDuration: 3500000
    }
  });
});

test.skip("init function with manual time options fills undefined time options", () => {

});

test.skip("init function with manual time options uses provided options to fill undefined time options", () => {
  // maxTime > minViewDuration > sumOfProcessingTime is provided, others undefined

});

test.skip("changeJobColor action", () => {

});

test.skip("init function fills empty job color", () => {

});

test.skip("init function uses provided job colors and fills missing", () => {

});

test.skip("init function skips provided job colors tha does not have job", () => {

});

test.skip("adding job will have corresponding a job color", () => {

});

test.skip("removing job will remove corresponding a job color", () => {

});