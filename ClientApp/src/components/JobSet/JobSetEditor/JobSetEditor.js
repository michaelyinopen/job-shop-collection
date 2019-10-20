import React, { useReducer, useState, useCallback, useEffect } from 'react';
import { generatePath } from 'react-router';
import useReactRouter from 'use-react-router';
import { jobSet as jobSetPath } from '../../../routePaths';
import JobSetEditorDispatchContext from './JobSetEditorDispatchContext';
import JobSetEditorStateContext from './JobSetEditorStateContext';
import reducer, { init as jobSetEditorInit } from './store/reducer';
import { makeStyles } from '@material-ui/core/styles';
import {
  Fab,
  Tooltip,
  Container,
  Paper
} from '@material-ui/core';
import { ToggleButton } from '@material-ui/lab';
import StyledToggleButtonGroup, { toggleButtonGroupBorderStyle } from '../../StyledToggleButtonGroup';
import { Edit } from '@material-ui/icons';
import Title from './Title';
import Description from './Description';
import Machines from './Machines';
import Jobs from './Jobs';
import TimeOptions from './TimeOptions';
// import JsonEditor from './JsonEditor';
import SplitterLayout from 'react-splitter-layout';
import 'react-splitter-layout/lib/index.css';
import { useReadOnly } from './store/useSelectors';
import { setReadOnly } from './store/actionCreators';
import { InlineIcon } from "@iconify/react";
import pencilLock from '@iconify/icons-mdi/pencil-lock';

const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: theme.palette.background.default,
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(4),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    minHeight: "100%",
    minWidth: 720,
    position: "relative"
  },
  icon: { fontSize: "1.5rem" },
  toggleButtonGroupBorderStyle: toggleButtonGroupBorderStyle(theme)
}));

const JobSetEditor = ({
  id
}) => {
  const classes = useStyles();
  const readOnly = useReadOnly();
  const pageTitle = `Job Set #${id}` + (readOnly ? " (read-only)" : " (editing)");

  const [isJsonEditorOpen, setIsJsonEditorOpen] = useState(false);
  const openJsonEditorCallback = useCallback(
    () => setIsJsonEditorOpen(true),
    []
  );
  const closeJsonEditorCallback = useCallback(
    () => setIsJsonEditorOpen(false),
    []
  );
  const { history: { push } } = useReactRouter();
  const readonlyPath = generatePath(jobSetPath, { id });
  const editingPath = generatePath(jobSetPath, { id, edit: "edit" });

  const handleReadOnlyChange = (event, readOnlyValue) => {
    if (!readOnly && readOnlyValue) {
      push(readonlyPath)
    }
    if (readOnly && !readOnlyValue) {
      push(editingPath)
    }
  };

  const form = (
    <Container
      component="form"
      className={classes.container}
    >
      <h1>{pageTitle}</h1>

      {/* <Tooltip
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
      </Tooltip>*/}
      <div style={{
        position: "absolute",
        top: "16px",
        right: "16px",
        margin: "16px"
      }}>
        <Paper elevation={0} className={classes.toggleButtonGroupBorderStyle}>
          <StyledToggleButtonGroup
            value={readOnly}
            exclusive
            onChange={handleReadOnlyChange}
            className={classes.toggleButtonGroupStyle}
          >
            <ToggleButton value={true}>
              <InlineIcon icon={pencilLock} className={classes.icon} />
            </ToggleButton>
            <ToggleButton value={false} {...(false ? { disabled: true } : {})} >
              <Edit />
            </ToggleButton>
          </StyledToggleButtonGroup>
        </Paper>
      </div>
      {/* {readOnly ? (
        <div style={{
          position: "absolute",
          top: "16px",
          right: "16px",
          margin: "16px"
        }}>
          <Fab onClick={setEditingCallback}>
            <Edit />
          </Fab>
        </div>
      ) : null}
      {!readOnly ? (
        <div style={{
          position: "absolute",
          top: "16px",
          right: "16px",
          margin: "16px"
        }}>
          <Fab onClick={setReadOnlyCallback}>
            <Edit />
          </Fab>
        </div>
      ) : null} */}

      <Title />
      <Description />
      <Machines />
      <Jobs />
      <TimeOptions />
    </Container>
  );
  if (isJsonEditorOpen) {
    return (
      <SplitterLayout primaryIndex={1}>
        {form}
        {isJsonEditorOpen ? null/*<JsonEditor closeJsonEditorCallback={closeJsonEditorCallback} />*/ : null}
      </SplitterLayout >
    );
  }
  return form;
};

const JobSetEditorWithContext = ({
  id,
  edit,
  title,
  description,
  jobSet = {},
  isAutoTimeOptions,
  timeOptions,
  jobColors
}) => {
  const { machines, jobs } = jobSet;
  const readOnly = !edit;
  const [state, dispatch] = useReducer(
    reducer,
    {
      readOnly,
      title,
      description,
      machines,
      jobs,
      isAutoTimeOptions,
      timeOptions,
      jobColors
    },
    jobSetEditorInit
  );

  useEffect(
    () => {
      dispatch(setReadOnly(readOnly));
    },
    [readOnly, dispatch]
  );
  return (
    <JobSetEditorDispatchContext.Provider value={dispatch}>
      <JobSetEditorStateContext.Provider value={state}>
        <JobSetEditor id={id} />
      </JobSetEditorStateContext.Provider>
    </JobSetEditorDispatchContext.Provider>
  );
};

export default JobSetEditorWithContext;