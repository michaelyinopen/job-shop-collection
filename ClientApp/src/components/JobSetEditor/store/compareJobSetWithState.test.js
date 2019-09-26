import compareJobSetWithState from './compareJobSetWithState';
const sortFn = (a, b) => a.id - b.id;

test("equal state and jobset", () => {
  const machinesState = [
    { "id": 1, title: "M1", description: "Machine 1" },
    { "id": 2, title: "M2", description: "Machine 2" },
    { "id": 3, title: "M3", description: "Machine 3" },
    { "id": 4, title: "M4", description: "Machine 4" }
  ];
  const jobsState = [
    { "id": 1 },
    { "id": 2 },
    { "id": 3 },
  ];
  const proceduresState = [
    { "id": 1, "jobId": 1, "machineId": 1, "sequence": 1, "processingMilliseconds": 600000 },
    { "id": 2, "jobId": 1, "machineId": 2, "sequence": 2, "processingMilliseconds": 480000 },
    { "id": 3, "jobId": 1, "machineId": 3, "sequence": 3, "processingMilliseconds": 240000 },
    { "id": 4, "jobId": 2, "machineId": 2, "sequence": 1, "processingMilliseconds": 480000 },
    { "id": 5, "jobId": 2, "machineId": 1, "sequence": 2, "processingMilliseconds": 180000 },
    { "id": 6, "jobId": 2, "machineId": 4, "sequence": 3, "processingMilliseconds": 300000 },
    { "id": 7, "jobId": 2, "machineId": 3, "sequence": 4, "processingMilliseconds": 360000 },
    { "id": 8, "jobId": 3, "machineId": 1, "sequence": 1, "processingMilliseconds": 240000 },
    { "id": 9, "jobId": 3, "machineId": 2, "sequence": 2, "processingMilliseconds": 420000 },
    { "id": 10, "jobId": 3, "machineId": 4, "sequence": 3, "processingMilliseconds": 180000 }
  ];
  const jobSet = {
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
      },
    ]
  };

  const result = compareJobSetWithState(jobSet, machinesState, jobsState, proceduresState);
  expect(result[0]).toBe(true);
});

test("jobset more machines than state", () => {
  const machinesState = [
    { "id": 1, title: "M1", description: "Machine 1" },
    { "id": 2, title: "M2", description: "Machine 2" },
    { "id": 3, title: "M3", description: "Machine 3" },
    { "id": 4, title: "M4", description: "Machine 4" }
  ];
  const jobsState = [
    { "id": 1 },
    { "id": 2 },
    { "id": 3 },
  ];
  const proceduresState = [
    { "id": 1, "jobId": 1, "machineId": 1, "sequence": 1, "processingMilliseconds": 600000 },
    { "id": 2, "jobId": 1, "machineId": 2, "sequence": 2, "processingMilliseconds": 480000 },
    { "id": 3, "jobId": 1, "machineId": 3, "sequence": 3, "processingMilliseconds": 240000 },
    { "id": 4, "jobId": 2, "machineId": 2, "sequence": 1, "processingMilliseconds": 480000 },
    { "id": 5, "jobId": 2, "machineId": 1, "sequence": 2, "processingMilliseconds": 180000 },
    { "id": 6, "jobId": 2, "machineId": 4, "sequence": 3, "processingMilliseconds": 300000 },
    { "id": 7, "jobId": 2, "machineId": 3, "sequence": 4, "processingMilliseconds": 360000 },
    { "id": 8, "jobId": 3, "machineId": 1, "sequence": 1, "processingMilliseconds": 240000 },
    { "id": 9, "jobId": 3, "machineId": 2, "sequence": 2, "processingMilliseconds": 420000 },
    { "id": 10, "jobId": 3, "machineId": 4, "sequence": 3, "processingMilliseconds": 180000 }
  ];
  const jobSet = {
    machines: [
      { "id": 1, title: "M1", description: "Machine 1" },
      { "id": 2, title: "M2", description: "Machine 2" },
      { "id": 3, title: "M3", description: "Machine 3" },
      { "id": 4, title: "M4", description: "Machine 4" },
      { "id": 5, title: "M5", description: "Machine 5" }// additional machine here
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
      },
    ]
  };

  const result = compareJobSetWithState(jobSet, machinesState, jobsState, proceduresState);
  expect(result[0]).toBe(false);
  expect(result[4]).toBe(true);
});

test("jobset less machines than state", () => {
  const machinesState = [
    { "id": 1, title: "M1", description: "Machine 1" },
    { "id": 2, title: "M2", description: "Machine 2" },
    { "id": 3, title: "M3", description: "Machine 3" },
    { "id": 4, title: "M4", description: "Machine 4" }
  ];
  const jobsState = [
    { "id": 1 },
    { "id": 2 },
    { "id": 3 },
  ];
  const proceduresState = [
    { "id": 1, "jobId": 1, "machineId": 1, "sequence": 1, "processingMilliseconds": 600000 },
    { "id": 2, "jobId": 1, "machineId": 2, "sequence": 2, "processingMilliseconds": 480000 },
    { "id": 3, "jobId": 1, "machineId": 3, "sequence": 3, "processingMilliseconds": 240000 },
    { "id": 4, "jobId": 2, "machineId": 2, "sequence": 1, "processingMilliseconds": 480000 },
    { "id": 5, "jobId": 2, "machineId": 1, "sequence": 2, "processingMilliseconds": 180000 },
    { "id": 6, "jobId": 2, "machineId": 4, "sequence": 3, "processingMilliseconds": 300000 },
    { "id": 7, "jobId": 2, "machineId": 3, "sequence": 4, "processingMilliseconds": 360000 },
    { "id": 8, "jobId": 3, "machineId": 1, "sequence": 1, "processingMilliseconds": 240000 },
    { "id": 9, "jobId": 3, "machineId": 2, "sequence": 2, "processingMilliseconds": 420000 },
    { "id": 10, "jobId": 3, "machineId": 4, "sequence": 3, "processingMilliseconds": 180000 }
  ];
  const jobSet = {
    machines: [
      { "id": 1, title: "M1", description: "Machine 1" },
      { "id": 2, title: "M2", description: "Machine 2" },
      { "id": 3, title: "M3", description: "Machine 3" }// missing machine here
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
      },
    ]
  };

  const result = compareJobSetWithState(jobSet, machinesState, jobsState, proceduresState);
  expect(result[0]).toBe(false);
  expect(result[4]).toBe(true);
});

test("jobset and state have different machines elements", () => {
  const machinesState = [
    { "id": 1, title: "M1", description: "Machine 1" },
    { "id": 2, title: "M2", description: "Machine 2" },
    { "id": 3, title: "M3", description: "Machine 3" },
    { "id": 4, title: "M4", description: "Machine 4" }
  ];
  const jobsState = [
    { "id": 1 },
    { "id": 2 },
    { "id": 3 },
  ];
  const proceduresState = [
    { "id": 1, "jobId": 1, "machineId": 1, "sequence": 1, "processingMilliseconds": 600000 },
    { "id": 2, "jobId": 1, "machineId": 2, "sequence": 2, "processingMilliseconds": 480000 },
    { "id": 3, "jobId": 1, "machineId": 3, "sequence": 3, "processingMilliseconds": 240000 },
    { "id": 4, "jobId": 2, "machineId": 2, "sequence": 1, "processingMilliseconds": 480000 },
    { "id": 5, "jobId": 2, "machineId": 1, "sequence": 2, "processingMilliseconds": 180000 },
    { "id": 6, "jobId": 2, "machineId": 4, "sequence": 3, "processingMilliseconds": 300000 },
    { "id": 7, "jobId": 2, "machineId": 3, "sequence": 4, "processingMilliseconds": 360000 },
    { "id": 8, "jobId": 3, "machineId": 1, "sequence": 1, "processingMilliseconds": 240000 },
    { "id": 9, "jobId": 3, "machineId": 2, "sequence": 2, "processingMilliseconds": 420000 },
    { "id": 10, "jobId": 3, "machineId": 4, "sequence": 3, "processingMilliseconds": 180000 }
  ];
  const jobSet = {
    machines: [
      { "id": 1, title: "M1", description: "Machine 1" },
      { "id": 2, title: "M2", description: "Machine 2" },
      { "id": 3, title: "M3", description: "Machine 3" },
      { "id": 5, title: "M5", description: "Machine 5" } // different machine here
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
      },
    ]
  };

  const result = compareJobSetWithState(jobSet, machinesState, jobsState, proceduresState);
  expect(result[0]).toBe(false);
  expect(result[4]).toBe(true);
});

test("jobset and state have different jobs", () => {
  const machinesState = [
    { "id": 1, title: "M1", description: "Machine 1" },
    { "id": 2, title: "M2", description: "Machine 2" },
    { "id": 3, title: "M3", description: "Machine 3" },
    { "id": 4, title: "M4", description: "Machine 4" }
  ];
  const jobsState = [
    { "id": 1 },
    { "id": 2 },
    { "id": 3 },
  ];
  const proceduresState = [
    { "id": 1, "jobId": 1, "machineId": 1, "sequence": 1, "processingMilliseconds": 600000 },
    { "id": 2, "jobId": 1, "machineId": 2, "sequence": 2, "processingMilliseconds": 480000 },
    { "id": 3, "jobId": 1, "machineId": 3, "sequence": 3, "processingMilliseconds": 240000 },
    { "id": 4, "jobId": 2, "machineId": 2, "sequence": 1, "processingMilliseconds": 480000 },
    { "id": 5, "jobId": 2, "machineId": 1, "sequence": 2, "processingMilliseconds": 180000 },
    { "id": 6, "jobId": 2, "machineId": 4, "sequence": 3, "processingMilliseconds": 300000 },
    { "id": 7, "jobId": 2, "machineId": 3, "sequence": 4, "processingMilliseconds": 360000 },
    { "id": 8, "jobId": 3, "machineId": 1, "sequence": 1, "processingMilliseconds": 240000 },
    { "id": 9, "jobId": 3, "machineId": 2, "sequence": 2, "processingMilliseconds": 420000 },
    { "id": 10, "jobId": 3, "machineId": 4, "sequence": 3, "processingMilliseconds": 180000 }
  ];
  const jobSet = {
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
      },
      { // additional job here
        "id": 4,
        "procedures": [
        ]
      },
    ]
  };

  const result = compareJobSetWithState(jobSet, machinesState, jobsState, proceduresState);
  expect(result[0]).toBe(false);
  expect(result[4]).toBe(false);
});

test("jobset and state have different procedures", () => {
  const machinesState = [
    { "id": 1, title: "M1", description: "Machine 1" },
    { "id": 2, title: "M2", description: "Machine 2" },
    { "id": 3, title: "M3", description: "Machine 3" },
    { "id": 4, title: "M4", description: "Machine 4" }
  ];
  const jobsState = [
    { "id": 1 },
    { "id": 2 },
    { "id": 3 },
  ];
  const proceduresState = [
    { "id": 1, "jobId": 1, "machineId": 1, "sequence": 1, "processingMilliseconds": 600000 },
    { "id": 2, "jobId": 1, "machineId": 2, "sequence": 2, "processingMilliseconds": 480000 },
    { "id": 3, "jobId": 1, "machineId": 3, "sequence": 3, "processingMilliseconds": 240000 },
    { "id": 4, "jobId": 2, "machineId": 2, "sequence": 1, "processingMilliseconds": 480000 },
    { "id": 5, "jobId": 2, "machineId": 1, "sequence": 2, "processingMilliseconds": 180000 },
    { "id": 6, "jobId": 2, "machineId": 4, "sequence": 3, "processingMilliseconds": 300000 },
    { "id": 7, "jobId": 2, "machineId": 3, "sequence": 4, "processingMilliseconds": 360000 },
    { "id": 8, "jobId": 3, "machineId": 1, "sequence": 1, "processingMilliseconds": 240000 },
    { "id": 9, "jobId": 3, "machineId": 2, "sequence": 2, "processingMilliseconds": 420000 },
    { "id": 10, "jobId": 3, "machineId": 4, "sequence": 3, "processingMilliseconds": 180000 }
  ];
  const jobSet = {
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
          { "id": 10, "jobId": 3, "machineId": 4, "sequence": 3, "processingMilliseconds": 10 } // different procedure here
        ]
      }
    ]
  };

  const result = compareJobSetWithState(jobSet, machinesState, jobsState, proceduresState);
  expect(result[0]).toBe(false);
  expect(result[4]).toBe(true);
});

test("When different returns mapped jobset Machines, jobs and procedures", () => {

  const machinesState = [
    { "id": 1, title: "M1", description: "Machine 1" },
    { "id": 2, title: "M2", description: "Machine 2" },
    { "id": 3, title: "M3", description: "Machine 3" },
    { "id": 4, title: "M4", description: "Machine 4" }
  ];
  const jobsState = [
    { "id": 1 },
    { "id": 2 },
    { "id": 3 },
  ];
  const proceduresState = [
    { "id": 1, "jobId": 1, "machineId": 1, "sequence": 1, "processingMilliseconds": 600000 },
    { "id": 2, "jobId": 1, "machineId": 2, "sequence": 2, "processingMilliseconds": 480000 },
    { "id": 3, "jobId": 1, "machineId": 3, "sequence": 3, "processingMilliseconds": 240000 },
    { "id": 4, "jobId": 2, "machineId": 2, "sequence": 1, "processingMilliseconds": 480000 },
    { "id": 5, "jobId": 2, "machineId": 1, "sequence": 2, "processingMilliseconds": 180000 },
    { "id": 6, "jobId": 2, "machineId": 4, "sequence": 3, "processingMilliseconds": 300000 },
    { "id": 7, "jobId": 2, "machineId": 3, "sequence": 4, "processingMilliseconds": 360000 },
    { "id": 8, "jobId": 3, "machineId": 1, "sequence": 1, "processingMilliseconds": 240000 },
    { "id": 9, "jobId": 3, "machineId": 2, "sequence": 2, "processingMilliseconds": 420000 },
    { "id": 10, "jobId": 3, "machineId": 4, "sequence": 3, "processingMilliseconds": 180000 }
  ];
  const jobSet = {
    machines: [
      { "id": 1, title: "M1", description: "Machine 1" },
      { "id": 2, title: "M2", description: "Machine 2" },
      { "id": 3, title: "M3", description: "Machine 3" },
      { "id": 4, title: "M4", description: "Machine 4" },
      { "id": 5, title: "M5", description: "Machine 5" }// additional machine here
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
          { "id": 10, "jobId": 3, "machineId": 4, "sequence": 3, "processingMilliseconds": 10 } // different procedure here
        ]
      },
      { // additional job here
        "id": 4,
        "procedures": [
        ]
      },
    ]
  };

  const result = compareJobSetWithState(jobSet, machinesState, jobsState, proceduresState);
  expect(result[0]).toBe(false);
  expect(result[1].sort(sortFn)).toEqual(jobSet.machines);
  expect(result[1].sort(sortFn)).not.toBe(jobSet.machines); // not same instance
  expect(result[2].sort(sortFn)).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]);
  expect(result[3].sort(sortFn)).toEqual([
    { "id": 1, "jobId": 1, "machineId": 1, "sequence": 1, "processingMilliseconds": 600000 },
    { "id": 2, "jobId": 1, "machineId": 2, "sequence": 2, "processingMilliseconds": 480000 },
    { "id": 3, "jobId": 1, "machineId": 3, "sequence": 3, "processingMilliseconds": 240000 },
    { "id": 4, "jobId": 2, "machineId": 2, "sequence": 1, "processingMilliseconds": 480000 },
    { "id": 5, "jobId": 2, "machineId": 1, "sequence": 2, "processingMilliseconds": 180000 },
    { "id": 6, "jobId": 2, "machineId": 4, "sequence": 3, "processingMilliseconds": 300000 },
    { "id": 7, "jobId": 2, "machineId": 3, "sequence": 4, "processingMilliseconds": 360000 },
    { "id": 8, "jobId": 3, "machineId": 1, "sequence": 1, "processingMilliseconds": 240000 },
    { "id": 9, "jobId": 3, "machineId": 2, "sequence": 2, "processingMilliseconds": 420000 },
    { "id": 10, "jobId": 3, "machineId": 4, "sequence": 3, "processingMilliseconds": 10 }
  ]);
  expect(result[4]).toBe(false);
});