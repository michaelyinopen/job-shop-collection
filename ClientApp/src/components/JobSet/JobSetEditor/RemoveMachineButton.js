import React, { useCallback, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import prettyMs from 'pretty-ms';
import { makeMachineSelector, makeProceduresOfMachineSelector } from '../store/selectors'
import { removeMachine } from '../store/actionCreators';
import {
  Button,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  IconButton,
  List,
  ListItem,
  ListItemText
} from '@material-ui/core';
import { Delete, ExpandMore } from '@material-ui/icons';

const RemoveMachineDialogChildren = ({
  id,
  selectMachine,
  selectProceduresOfMachine,
  closeCallback
}) => {
  const machine = useSelector(state => selectMachine(state, id));
  const title = machine.title ? `Remove machine ${machine.title}?` : "Remove this machine?";
  const dispatch = useDispatch();
  const confirmCallback = useCallback(
    () => {
      dispatch(removeMachine(id));
      closeCallback();
    },
    [dispatch, id, closeCallback]
  );
  const proceduresOfMachine = useSelector(state => selectProceduresOfMachine(state, id));
  const machineTitle = machine.title ? `machine ${machine.title}` : "this machine";

  const content = !proceduresOfMachine || proceduresOfMachine.length === 0 ? null :
    (
      <DialogContent style={{ backgroundColor: "#cfe8fc" }}>
        Removing {machineTitle} will clear the machine selection of {proceduresOfMachine.length} procedures.
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMore />}
          >
            View affected procedures
          </ExpansionPanelSummary>
          <Divider />
          <ExpansionPanelDetails style={{ padding: 0 }}>
            <List dense style={{ padding: 0 }}>
              {proceduresOfMachine.map((p, index) => (
                <React.Fragment>
                  <ListItem>
                    <ListItemText
                      primary={`Job ${p.jobId}; sequence ${p.sequence}; time: ${prettyMs(p.processingMilliseconds ? p.processingMilliseconds : 0)}`}
                    />
                  </ListItem>
                  {index < proceduresOfMachine.length - 1 ? <Divider component="li" /> : null}
                </React.Fragment>
              ))}
            </List>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </DialogContent >
    );

  return (
    <React.Fragment>
      <DialogTitle>{title}</DialogTitle>
      {content}
      <DialogActions>
        <Button onClick={closeCallback} variant="outlined" color="primary">
          Cancel
          </Button>
        <Button onClick={confirmCallback} variant="contained" color="primary" autoFocus>
          Ok
        </Button>
      </DialogActions>
    </React.Fragment>
  );
}

const RemoveMachineButton = React.memo(({
  id
}) => {
  const { current: selectMachine } = useRef(makeMachineSelector());
  const { current: selectProceduresOfMachine } = useRef(makeProceduresOfMachineSelector());
  const machine = useSelector(state => selectMachine(state, id));
  const removeTooltip = machine.title ? `Remove machine ${machine.title}` : "Remove this machine";

  const [open, setOpen] = useState(false);
  const clickOpenCallback = useCallback(
    () => setOpen(true),
    [setOpen]
  );
  const closeCallback = useCallback(
    () => setOpen(false),
    [setOpen]
  );
  return (
    <div style={{ display: 'inline-flex' }}>
      <Tooltip title={removeTooltip} placement="right-end">
        <IconButton onClick={clickOpenCallback}>
          <Delete />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={closeCallback}
      >
        <RemoveMachineDialogChildren
          id={id}
          selectMachine={selectMachine}
          selectProceduresOfMachine={selectProceduresOfMachine}
          closeCallback={closeCallback}
        />
      </Dialog>
    </div >
  );
});

export default RemoveMachineButton;