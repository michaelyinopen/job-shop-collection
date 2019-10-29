import { editContentInit } from "../components/JobSet/store/editContentReducer";
import { getNewJobSetId } from "../functions/newJobSetId";

const editContentInitialState = editContentInit();

describe("Create new JobSet", () => {
  const initialState = {
    snackbar: {
      isOpen: false,
      message: undefined
    },
    getJobSetsIsLoading: false,
    getJobSetsFailedMessage: null,
    jobSets: {
      [1]: {
        id: 1,
        title: "First",
        description: "The first job set",
        content: undefined,
        jobColors: undefined,
        isAutoTimeOptions: undefined,
        timeOptions: undefined,
        eTag: "AAAAAAAAs7E=",
        isLoading: false,
        loadFailedMessage: null,
        isUpdating: false,
        updateFailedMessage: null,
      },
      [2]: {
        id: 2,
        title: "Second",
        description: "The second job set",
        content: undefined,
        jobColors: undefined,
        isAutoTimeOptions: undefined,
        timeOptions: undefined,
        eTag: "AAAAAAAApBI=",
        isLoading: false,
        loadFailedMessage: null,
        isUpdating: false,
        updateFailedMessage: null,
      }
    },
    deletingJobSets: {},
    currentJobSetId: null,
    jobSetEditor: {
      editStatus: {
        readOnly: true,
        isCreating: false,
        createFailedMessage: null,
        createdId: null,
        isUpdating: false,
        updateFailedMessage: null,
      },
      editContentHistory: {
        past: [],
        present: editContentInitialState,
        future: []
      },
      savedContent: editContentInitialState
    },
  };
  const newJobSetId = getNewJobSetId();
  const jobSetToBeCreated = {
    title: "Test Create New",
    description: "A sample jobSet for testing creation of a new jobet",
    content: '{"machines":[],"jobs":[]}',
    jobColors: "[]",
    isAutoTimeOptions: true,
    timeOptions: '{"referenceDate":"1970-01-01T00:00:00.000Z",' +
      '"maxTime":"1970-01-01T00:00:00.000Z",' +
      '"viewStartTime":"1970-01-01T00:00:00.000Z",' +
      '"viewEndTime":"1970-01-01T00:00:00.000Z",' +
      '"minViewDuration":0,' +
      '"maxViewDuration":0}'
  };
  const expectedStateAfterStartCreateNew = {
    snackbar: {
      isOpen: false,
      message: undefined
    },
    getJobSetsIsLoading: false,
    getJobSetsFailedMessage: null,
    jobSets: {
      [1]: {
        id: 1,
        title: "First",
        description: "The first job set",
        content: undefined,
        jobColors: undefined,
        isAutoTimeOptions: undefined,
        timeOptions: undefined,
        eTag: "AAAAAAAAs7E=",
        isLoading: false,
        loadFailedMessage: null,
        isUpdating: false,
        updateFailedMessage: null,
      },
      [2]: {
        id: 2,
        title: "Second",
        description: "The second job set",
        content: undefined,
        jobColors: undefined,
        isAutoTimeOptions: undefined,
        timeOptions: undefined,
        eTag: "AAAAAAAApBI=",
        isLoading: false,
        loadFailedMessage: null,
        isUpdating: false,
        updateFailedMessage: null,
      }
    },
    deletingJobSets: {},
    currentJobSetId: newJobSetId, // * modified 
    jobSetEditor: {
      editStatus: {
        readOnly: false, // * modified 
        isCreating: false,
        createFailedMessage: null,
        createdId: null,
        isUpdating: false,
        updateFailedMessage: null,
      },
      editContentHistory: {
        past: [],
        present: editContentInitialState, // * modified 
        future: []
      },
      savedContent: editContentInitialState // * modified 
    },
  };
  test("Start Create New", () => {
  });
  const expectedStateAfterEditNew = {};
  test("Edit New", () => {

  });
  const expectedStateAfterCreateNew = {};
  test("Create New", () => {

  });
  const expectedStateAfterEditCreated = {};
  test("Edit Created", () => {

  });
  const expectedStateAfterSaveEdit = {};
  test("Save Edit", () => {

  });
});