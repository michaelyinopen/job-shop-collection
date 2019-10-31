import { editContentInit } from "../components/JobSet/store/editContentReducer";
import { getNewJobSetId } from "../functions/newJobSetId";

import reducer from '../store/reducer';
import { 
  setCurrentJobSetId,
  createJobSetBegin,
} from "../store/actionCreators";
import {
  setReadOnly,
  setTitle,
  setDescription,
} from '../components/JobSet/store/actionCreators';


const editContentInitialState = editContentInit();

describe("Start Create New JobSet", () => {
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
        creatingId: null,
        createFailedMessage: null,
        createdId: null,
      },
      editContentHistory: {
        past: [],
        present: {
          historyStepName: "initial",
          editContent: editContentInitialState
        },
        future: []
      },
      savedContent: editContentInitialState
    },
  };
  const newJobSetId = getNewJobSetId();
  const expectedStartCreateNewJobSetEditorContentState = {
    title: null,
    description: null,
    machines: {},
    jobs: {},
    procedures: {},
    jobColors: {},
    isAutoTimeOptions: true,
    timeOptions: {
      "referenceDate": new Date("1970-01-01T00:00:00.000Z"),
      "maxTime": new Date("1970-01-01T00:00:00.000Z"),
      "viewStartTime": new Date("1970-01-01T00:00:00.000Z"),
      "viewEndTime": new Date("1970-01-01T00:00:00.000Z"),
      "minViewDuration": 0,
      "maxViewDuration": 0,
    }
  };
  const expectedStartCreateNewState = {
    ...initialState,
    currentJobSetId: newJobSetId, // * modified 
    jobSetEditor: {
      editStatus: {
        readOnly: false, // * modified 
        isCreating: false,
        creatingId: null,
        createFailedMessage: null,
        createdId: null
      },
      editContentHistory: { // * modified 
        past: [],
        present: {
          editContent: expectedStartCreateNewJobSetEditorContentState,
          historyStepName: "setCurrentJobSetId",
        },
        future: []
      },
      savedContent: expectedStartCreateNewJobSetEditorContentState // * modified 
    },
  };
  test("Start Create New", () => {
    let state = initialState;
    const setCurrentJobSetIdAction = setCurrentJobSetId(newJobSetId);
    state = reducer(state, setCurrentJobSetIdAction);
    const setEditAction = setReadOnly(false);
    state = reducer(state, setEditAction);
    expect(state).toMatchObject(expectedStartCreateNewState);
  });
  const expectedEditNewJobSetEditorContentTitleState = {
    ...expectedStartCreateNewJobSetEditorContentState,
    title: "Test Start Create new JobSet"
  };
  const expectedEditNewJobSetEditorContentDescriptionState = {
    ...expectedEditNewJobSetEditorContentTitleState,
    description: "A sample JobSet for testing the scenario Start Create new JobSet"
  };
  const expectedEditNewState = {
    ...expectedStartCreateNewState,
    jobSetEditor: {
      ...expectedStartCreateNewState.jobSetEditor,
      editContentHistory: {
        past: [
          {
            editContent: expectedStartCreateNewJobSetEditorContentState,
            historyStepName: "setCurrentJobSetId",
          },
          {
            editContent: expectedEditNewJobSetEditorContentTitleState,
            historyStepName: "SET_TITLE",
          }
        ],
        present: {
          editContent: expectedEditNewJobSetEditorContentDescriptionState,
          historyStepName: "SET_DESCRIPTION",
        },
        future: []
      },
    }
  };
  test("Edit New", () => {
    let state = expectedStartCreateNewState;
    const setTitleAction = setTitle("Test Start Create new JobSet");
    state = reducer(state, setTitleAction);
    const setDescriptionAction = setDescription("A sample JobSet for testing the scenario Start Create new JobSet");
    state = reducer(state, setDescriptionAction);
    expect(state).toMatchObject(expectedEditNewState);
  });
  const expectedCreateNewCreatingState = {
    ...expectedEditNewState,
    jobSetEditor: {
      editStatus: {
        readOnly: false,
        isCreating: true, // * modified 
        creatingId: newJobSetId,// * modified 
        createFailedMessage: null,
        createdId: null
      },
    },
  };
  test("Create New Creating", () => {
    let state = expectedEditNewState;
    const createJobSetBeginAction = createJobSetBegin(newJobSetId);
    state = reducer(state, createJobSetBeginAction);
    expect(state).toMatchObject(expectedCreateNewCreatingState);
  });
  test("Create New Created", () => {
    
  });
  const expectedCreateNewUpdatedState = {};
  test("Create New UpdatedCurrentJobSetId", () => {

  });
  const expectedEditCreatedState = {};
  test("Edit Created", () => {

  });
  const expectedSaveEdit = {};
  test("Save Edit", () => {

  });
});