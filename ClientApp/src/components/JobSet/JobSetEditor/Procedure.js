import React, { useContext, useCallback, useMemo, useRef } from 'react';
import JobSetEditorDispatchContext from './JobSetEditorDispatchContext';
import { updateProcedure, moveProcedure } from './store/actionCreators';
import { useProcedure, useMachines, useGetProcedureSequence, useJobColor } from './store/useSelectors';
import useProcedureDragDrop from './dragDrop/useProcedureDragDrop';
import { TextField, Tooltip, MenuItem, InputAdornment, IconButton } from '@material-ui/core';
import { OpenWith } from '@material-ui/icons';
import TimeField from 'react-simple-timefield';
import msToFormattedTime from './functions/msToFormattedTime';
import formattedTimeToMs from './functions/formattedTimeToMs';
import DeleteProcedureButton from './DeleteProcedureButton';

import classNames from 'classnames/bind';
import jobSetEditorStyles from '../css/JobSetEditor.module.css';

const cx = classNames.bind(jobSetEditorStyles);
const Procedure = React.memo(({
  procedureRef,
  handleRef,
  id,
  machineId,
  machineOptions,
  onMachineSelectChangeCallback,
  formattedTime,
  onTimeChangeCallback,
  sequence,
  opacity,
  backgroundColor
}) => {
  return (
    <div
      ref={procedureRef}
      className={cx("job-set-editor__procedure")}
      style={{ opacity, backgroundColor }}
    >
      <div className={cx("job-set-editor__machine-label")}>
        <TextField
          label="Machine"
          value={machineId}
          variant="outlined"
          margin="dense"
          select
          onChange={onMachineSelectChangeCallback}
          required
          error={!machineId}
          style={{ width: "12em" }}
          SelectProps={{
            SelectDisplayProps: {
              style: { height: "1.1875em" }
            }
          }}
        >
          {machineOptions}
        </TextField>
      </div>
      <div className={cx("job-set-editor__machine-label-separator")} />
      <div className={cx("job-set-editor__time-field")}>
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
              InputProps={{
                endAdornment: <InputAdornment position="end">hh:mm:ss</InputAdornment>,
              }}
            />
          }
        />
      </div>
      <div className={cx("job-set-editor__sequence-label")}>
        {sequence}
      </ div>
      <div style={{ flexGrow: 1 }} />
      <div ref={handleRef}>
        <Tooltip title="Move" placement="right-end">
          <IconButton style={{ cursor: 'move' }}>
            <OpenWith />
          </IconButton>
        </Tooltip>
      </div>
      <DeleteProcedureButton id={id} />
    </div>
  );
});

const ProcedureContainer = ({
  id
}) => {
  const procedure = useProcedure(id);
  const dispatch = useContext(JobSetEditorDispatchContext);

  const machines = useMachines();
  const machineOptions = useMemo(
    () => {
      return machines.map(m => (
        <MenuItem key={m.id} value={m.id}>
          <Tooltip title={m.description} placement="right">
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
    value => dispatch(updateProcedure(id, { ...procedure, processingMilliseconds: formattedTimeToMs(value) })),
    [dispatch, id, procedure]
  );

  const ref = useRef(null);
  const handleRef = useRef(null);
  const getProcedureSequence = useGetProcedureSequence();
  const moveProcedureCallback = useCallback(
    (id, targetSequence) => dispatch(moveProcedure(id, targetSequence)), // note id is input parameter, not bound
    [dispatch, moveProcedure]
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