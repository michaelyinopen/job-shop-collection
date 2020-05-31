import React from 'react';
import { flowRight } from 'lodash';
import decorateStyle from '../../../__fixtureDecorators__/decorateStyle';
import decorateRedux from '../../../__fixtureDecorators__/decorateRedux';
import decorateInteractiveRedux from '../../../__fixtureDecorators__/decorateInteractiveRedux';
import AddMachine from './AddMachine';
import { initialState } from '../../../store/reducer';
import { jobSetEditorInit } from '../../JobSet';

const decorate = initialState => flowRight(decorateStyle, decorateRedux(initialState));
const decorateInteractive = initialState => flowRight(decorateStyle, decorateInteractiveRedux(initialState));

const addMachineInitialState = {
  ...initialState,
  jobSetEditor: jobSetEditorInit({ readOnly: true, jobSet: { machines: [{ id: 1 }] } })
};
const addMachine = decorate(addMachineInitialState)(AddMachine);

const interactiveAddMachine = decorateInteractive(addMachineInitialState)(AddMachine);

export default {
  addMachine,
  interactiveAddMachine
};