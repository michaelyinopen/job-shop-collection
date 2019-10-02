import reducer, { init } from './reducer';

test("init function produces initial state", () => {
  //expect(result[0]).toBe(true);
});

test("reducer has initial state", () => {
});

test("setJobSet action", () => {
});

test("addMachine action", () => {
});

test("removeMachine action unsets procedures", () => {
});

test("deleteJob action deletes procedures", () => {
});

test("moveProcedure action correctly moves to the beginning", () => {
});

test("moveProcedure action correctly moves to the end", () => {
});

test("moveProcedure action correctly moves in the middle", () => {
});

test("moveProcedure action works correctly when skiping order", () => {
});

test("deleteProcedure action", () => {
});

test("init function with auto time options overrides provided", () => {
});

test("init function with manual time options uses provided options", () => {
});

test("init function with manual time options fills undefined time options", () => {
});

test("init function with manual time options uses provided options to fill undefined time options", () => {
  // maxTime > minViewDuration > sumOfProcessingTime is provided, others undefined
});

test("changeJobColor action", () => {
});

test("init function fills empty job color", () => {
});

test("init function uses provided job colors and fills missing", () => {
});

test("init function skips provided job colors tha does not have job", () => {
});

test("adding job will have corresponding a job color", () => {
});

test("removing job will remove corresponding a job color", () => {
});