import React, { useContext, useCallback, useMemo, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Tooltip, MenuItem, InputAdornment, IconButton } from '@material-ui/core';
import { OpenWith } from '@material-ui/icons';
import TimeField from 'react-simple-timefield';
import msToFormattedTime from '../../../../functions/msToFormattedTime';
import formattedTimeToMs from '../../../../functions/formattedTimeToMs';
import JobSetEditorDispatchContext from '../JobSetEditorDispatchContext';
import DeleteProcedureButton from '../DeleteProcedureButton';
import { updateProcedure, moveProcedure } from '../store/actionCreators';
import { useProcedure, useMachines, useGetProcedureSequence, useJobColor, useReadOnly } from '../store/useSelectors';
import useProcedureDragDrop from './useProcedureDragDrop';
import { procedure as procedureStyle } from '../sharedStyles';

const useStyles = makeStyles(theme => ({
  procedure: procedureStyle(theme),
  machineLabel: {
    verticalAlign: "top",
    paddingRight: 0,
    paddingLeft: theme.spacing(2),
    color: "black",
    backgroundColor: "white",
    minWidth: 0
  },
  machineLabelTextField: {
    width: theme.spacing(24)
  },
  machineLabelSeparator: {
    position: "relative",
    width: theme.spacing(4),
    alignSelf: "stretch",
    overflow: "hidden",
    marginRight: theme.spacing(1),
    '&:after': {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      display: "block",
      width: 0,
      height: 0,
      borderBottom: `${theme.spacing(9)}px solid transparent`,
      borderLeft: `${theme.spacing(4)}px solid white`,
    }
  },
  timeFieldWrapper: {
    minWidth: 0,
    marginRight: theme.spacing(1.5),
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    boxShadow: "0 0 8px 8px rgba(255, 255, 255, 0.2)",
    flexShrink: 1
  },
  sequenceLabel: {
    marginTop: "auto",
    marginRight: 0,
    marginBottom: "auto",
    marginLeft: theme.spacing(2),
    width: theme.spacing(3),
    height: theme.spacing(3),
    color: "black",
    background: "white",
    borderRadius: theme.spacing(1.5),
    boxSizing: "border-box",
    boxShadow: theme.shadows[1],
    textAlign: "center"
  },
  separator: { flexGrow: 1 }
}));

const Procedure = React.memo(({
  procedureRef,
  handleRef,
  id,
  readOnly,
  machineId,
  machineOptions,
  onMachineSelectChangeCallback,
  formattedTime,
  onTimeChangeCallback,
  sequence,
  opacity,
  backgroundColor
}) => {
  const classes = useStyles();
  return (
    <div
      ref={procedureRef}
      className={classes.procedure}
      style={{ opacity, backgroundColor }}
    >
      <div className={classes.machineLabel}>
        <TextField
          label="Machine"
          value={machineId}
          variant="outlined"
          margin="dense"
          select
          onChange={onMachineSelectChangeCallback}
          required
          error={!machineId}
          className={classes.machineLabelTextField}
          SelectProps={{
            SelectDisplayProps: {
              style: { height: "1.1875em" }
            }
          }}
          inputProps={readOnly ? { readOnly: true } : {}}
        >
          {machineOptions}
        </TextField>
      </div>
      <div className={classes.machineLabelSeparator} />
      <div className={classes.timeFieldWrapper}>
        <TimeField
          showSeconds
          value={formattedTime}
          style={{ width: "12em" }}
          onChange={onTimeChangeCallback}
          input={
            <TextField
              label="Time"
              margin="dense"
              variant="outlined"
              required
              error={!formattedTime || formattedTime === "00:00:00"}
              inputProps={{
                endAdornment: <InputAdornment position="end">hh:mm:ss</InputAdornment>,
                readOnly: readOnly ? true : undefined
              }}
            />
          }
        />
      </div>
      <div className={classes.sequenceLabel}>
        {sequence}
      </ div>
      <div className={classes.separator} />
      {!readOnly ?
        <div ref={handleRef}>
          <Tooltip title="Move" placement="right-end">
            <IconButton style={{ cursor: 'move' }}>
              <OpenWith />
            </IconButton>
          </Tooltip>
        </div> : null}
      {!readOnly ? <DeleteProcedureButton id={id} /> : null}
    </div>
  );
});

const ProcedureContainer = ({
  id
}) => {
  const readOnly = useReadOnly();
  const procedure = useProcedure(id);
  const dispatch = useContext(JobSetEditorDispatchContext);

  const machines = useMachines();
  const machineOptions = useMemo(
    () => {
      return machines.map(m => (
        <MenuItem key={m.id} value={m.id}>
          <Tooltip title={m.description ? m.description : ""} placement="right">
            <div style={{ width: "100%" }}>{m.title}</div>
          </Tooltip>
        </MenuItem>
      ));
    },
    [machines]
  );
  const onMachineSelectChangeCallback = useCallback(
    event => dispatch(updateProcedure(id, { ...procedure, machineId: event.target.value })),
    [dispatch, id, procedure]
  );

  const formattedTime = !procedure.processingMilliseconds ? undefined : msToFormattedTime(procedure.processingMilliseconds);
  const onTimeChangeCallback = useCallback(
    (_event, value) => dispatch(updateProcedure(id, { ...procedure, processingMilliseconds: formattedTimeToMs(value) })),
    [dispatch, id, procedure]
  );

  const ref = useRef(null);
  const handleRef = useRef(null);
  const getProcedureSequence = useGetProcedureSequence();
  const moveProcedureCallback = useCallback(
    (id, targetSequence) => dispatch(moveProcedure(id, targetSequence)), // note id is input parameter, not bound
    [dispatch]
  );

  const [isDragging] = useProcedureDragDrop(
    id,
    procedure.sequence,
    ref,
    handleRef,
    getProcedureSequence,
    moveProcedureCallback
  );
  const opacity = isDragging ? 0.4 : 1;

  const [backgroundColor] = useJobColor(procedure.jobId);
  return (
    <Procedure
      procedureRef={ref}
      handleRef={handleRef}
      id={id}
      readOnly={readOnly}
      machineId={procedure.machineId}
      machineOptions={machineOptions}
      onMachineSelectChangeCallback={onMachineSelectChangeCallback}
      formattedTime={formattedTime}
      onTimeChangeCallback={onTimeChangeCallback}
      sequence={procedure.sequence}
      opacity={opacity}
      backgroundColor={backgroundColor}
    />
  );
};

export default ProcedureContainer;