import React from 'react';
import { flowRight } from 'lodash';
import { useValue } from 'react-cosmos/fixture';
import decorateStyle from '../../../__fixtureDecorators__/decorateStyle';
import decorateRedux from '../../../__fixtureDecorators__/decorateRedux';
import decorateInteractiveRedux from '../../../__fixtureDecorators__/decorateInteractiveRedux';
import decorateErrorBoundary from '../../../__fixtureDecorators__/decorateErrorBoundary';
import Machine from './Machine';
import { initialState } from '../../../store/reducer';
import { jobSetEditorInit } from '../../JobSet';

const decorate = initialState => flowRight(decorateStyle, decorateRedux(initialState), decorateErrorBoundary);
const decorateInteractive = initialState => flowRight(decorateStyle, decorateInteractiveRedux(initialState), decorateErrorBoundary);

const readOnlyMachineInitialState = {
  ...initialState,
  jobSetEditor: jobSetEditorInit({ readOnly: true, jobSet: { machines: [{ id: 1 }] } })
};
const ReadOnlyMachineComponent = decorate(readOnlyMachineInitialState)(Machine);
const readOnlyMachine = <ReadOnlyMachineComponent id={1} />;

const editableMachineInitialState = {
  ...initialState,
  jobSetEditor: jobSetEditorInit({ readOnly: false, jobSet: { machines: [{ id: 1 }] } })
};
const EditableMachineComponent = decorate(editableMachineInitialState)(Machine);
const editableMachine = <EditableMachineComponent id={1} />;

const readOnlyInitializedMachineInitialState = {
  ...initialState,
  jobSetEditor: jobSetEditorInit({
    readOnly: true,
    jobSet: {
      machines:[
        { id: 1 , title: 'Hydraulic Press' , description: 'Things go squash' }
      ]
    }
  })
};
const ReadOnlyInitializedMachineComponent = decorate(readOnlyInitializedMachineInitialState)(Machine);
const readOnlyInitializedMachine = <ReadOnlyInitializedMachineComponent id={1} />;

const editableInitializedMachineInitialState = {
  ...initialState,
  jobSetEditor: jobSetEditorInit({
    readOnly: false,
    jobSet: {
      machines:[
        { id: 1 , title: 'Hydraulic Press' , description: 'Things go squash' }
      ]
    }
  })
};
const EditableInitializedMachineComponent = decorate(editableInitializedMachineInitialState)(Machine);
const editableInitializedMachine = <EditableInitializedMachineComponent id={1} />;

const IntereactiveMachineFixture = () => {
  const [readonly] = useValue('Readonly', { defaultValue: false });
  const [initialMachineTitle] = useValue('Title', { defaultValue: '' });
  const [initialMachineDescription] = useValue('Description', { defaultValue: '' });
  const interactiveMachineInitialState = {
    ...initialState,
    jobSetEditor: jobSetEditorInit({
      readOnly: readonly,
      jobSet: {
        machines:[
          { id: 1 , title: initialMachineTitle , description: initialMachineDescription }
        ]
      }
    })
  };
  const InteractiveMachine = decorateInteractive(interactiveMachineInitialState)(Machine);
  return <InteractiveMachine id={1} />;
};

export default {
  readOnlyMachine,
  editableMachine,
  readOnlyInitializedMachine,
  editableInitializedMachine,
  interactiveMachine: <IntereactiveMachineFixture />,
};