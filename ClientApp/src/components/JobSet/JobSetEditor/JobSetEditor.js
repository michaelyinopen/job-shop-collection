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
  Paper,
  Toolbar,
  Divider
} from '@material-ui/core';
import { ToggleButton } from '@material-ui/lab';
import StyledToggleButtonGroup, { toggleButtonGroupBorderStyle } from '../../StyledToggleButtonGroup';
import { Edit } from '@material-ui/icons';
import Title from './Title';
import Description from './Description';
import Machines from './Machines';
import Jobs from './Jobs';
import TimeOptions from './TimeOptions';
import DeleteJobSetButton from './DeleteJobSetButton';
// import JsonEditor from './JsonEditor';
import SplitterLayout from 'react-splitter-layout';
import 'react-splitter-layout/lib/index.css';
import { useReadOnly } from './store/useSelectors';
import { setReadOnly } from './store/actionCreators';
import { InlineIcon } from "@iconify/react";
import pencilLockOutline from '@iconify/icons-mdi/pencil-lock-outline';
import jsonIcon from '@iconify/icons-mdi/json';

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
  toggleButtonGroupBorderStyle: toggleButtonGroupBorderStyle(theme),
  titleRow: {
    position: "sticky",
    top: 0,
    zIndex: theme.zIndex.appBar - 1,
    backgroundColor: theme.palette.background.default,
    boxSizing: "border-box",
  },
  toolbar: { // move
    display: "flex",
    boxSizing: "border-box",
    boxShadow: "0px 6px 4px -6px rgba(0,0,0,0.75)",
    "& > *": {
      margin: "4px"
    },
  },
  separator: { flexGrow: 1 },
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

  const handleReadOnlyChange = (_event, readOnlyValue) => {
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
      <div className={classes.titleRow}>
        <Toolbar className={classes.toolbar}>
          <h1>{pageTitle}</h1>
          <div className={classes.separator} />
          <Paper elevation={0} className={classes.toggleButtonGroupBorderStyle}>
            <StyledToggleButtonGroup
              value={readOnly}
              exclusive
              onChange={handleReadOnlyChange}
              className={classes.toggleButtonGroupStyle}
            >
              <ToggleButton value={true}>
                <InlineIcon icon={pencilLockOutline} className={classes.icon} />
              </ToggleButton>
              <ToggleButton value={false} {...(false ? { disabled: true } : {})} >
                <Edit />
              </ToggleButton>
            </StyledToggleButtonGroup>
          </Paper>
          <DeleteJobSetButton id={id} />
          {/* <Tooltip
            title={isJsonEditorOpen ? "Already opened JSON Editor" : "Open JSON Editor"}
          >
            <Fab disabled={isJsonEditorOpen} size="medium" onClick={openJsonEditorCallback}>
              <InlineIcon icon={jsonIcon} className={classes.icon} />
            </Fab>
          </Tooltip> */}
        </Toolbar>
        <Divider variant="middle" />
      </div>
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
  jobColors,
  deleteJobSetButton
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
        <JobSetEditor
          id={id}
          deleteJobSetButton={deleteJobSetButton}
        />
      </JobSetEditorStateContext.Provider>
    </JobSetEditorDispatchContext.Provider>
  );
};

export default JobSetEditorWithContext;