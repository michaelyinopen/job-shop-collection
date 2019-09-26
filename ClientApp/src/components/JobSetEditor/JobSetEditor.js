import React, { useReducer, useState, useCallback } from 'react';
import JobSetEditorDispatchContext from './JobSetEditorDispatchContext';
import JobSetEditorStateContext from './JobSetEditorStateContext';
import reducer, { init as jobSetEditorInit } from './store/reducer';
import { Fab, Tooltip } from '@material-ui/core';
import { Code } from '@material-ui/icons';
import Machines from './Machines';
import Jobs from './Jobs';
import TimeOptions from './TimeOptions';
import JsonEditor from './JsonEditor';
import SplitterLayout from 'react-splitter-layout';
import 'react-splitter-layout/lib/index.css';

import classNames from 'classnames/bind';
import jobSetEditorStyles from '../css/JobSetEditor.module.css';

const cx = classNames.bind(jobSetEditorStyles);

const JobSetEditor = () => {
  const [isJsonEditorOpen, setIsJsonEditorOpen] = useState(false);
  const openJsonEditorCallback = useCallback(
    () => setIsJsonEditorOpen(true),
    []
  );
  const closeJsonEditorCallback = useCallback(
    () => setIsJsonEditorOpen(false),
    []
  );
  return (
    <SplitterLayout primaryIndex={1} >
      <article className={cx("job-set-editor__form-editor")}>
        <h1 className={cx("job-set-editor__title")}>New Job Set</h1>
        <Tooltip
          title={isJsonEditorOpen ? "Already opened JSON Editor" : "Open JSON Editor"}
        >
          <div style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            margin: "16px"
          }}>
            <Fab disabled={isJsonEditorOpen} onClick={openJsonEditorCallback}>
              <Code />
            </Fab>
          </div>
        </Tooltip>
        <Machines />
        <Jobs />
        <TimeOptions />
      </article>
      {isJsonEditorOpen ? <JsonEditor closeJsonEditorCallback={closeJsonEditorCallback} /> : null}
    </SplitterLayout >
  );
};

const JobSetEditorWithContext = ({
  jobSet = {},
  isAutoTimeOptions,
  timeOptions,
  jobColors
}) => {
  const { machines, jobs } = jobSet;
  const [state, dispatch] = useReducer(
    reducer,
    {
      machines,
      jobs,
      isAutoTimeOptions,
      timeOptions,
      jobColors
    },
    jobSetEditorInit
  );
  return (
    <JobSetEditorDispatchContext.Provider value={dispatch}>
      <JobSetEditorStateContext.Provider value={state}>
        <JobSetEditor />
      </JobSetEditorStateContext.Provider>
    </JobSetEditorDispatchContext.Provider>
  );
};

export default JobSetEditorWithContext;