import React from 'react';
import { flowRight } from 'lodash';
import decorateStyle from '../../../__fixtureDecorators__/decorateStyle';
import decorateRedux from '../../../__fixtureDecorators__/decorateRedux';
import decorateInteractiveRedux from '../../../__fixtureDecorators__/decorateInteractiveRedux';
import decorateErrorBoundary from '../../../__fixtureDecorators__/decorateErrorBoundary';
import RemoveMachineButton from './RemoveMachineButton';
import { initialState } from '../../../store/reducer';
import { jobSetEditorInit } from '../../JobSet';

const decorate = initialState => flowRight(decorateStyle, decorateRedux(initialState), decorateErrorBoundary);
const decorateInteractive = initialState => flowRight(decorateStyle, decorateInteractiveRedux(initialState), decorateErrorBoundary);

const removeMachineButtonWithoutRelatedProceduresInitialState = {
  ...initialState,
  jobSetEditor: jobSetEditorInit({
    jobSet: {
      machines: [
        {
          id: 1,
          title: 'M1',
          description: 'Machine 1'
        },
        {
          id: 2,
          title: 'M2',
          description: 'Machine 2'
        }
      ],
      jobs: []
    }
  })
};
const RemoveMachineButtonWithoutRelatedProceduresComponent = decorate(removeMachineButtonWithoutRelatedProceduresInitialState)(RemoveMachineButton);
const removeMachineButtonWithoutRelatedProcedures = <RemoveMachineButtonWithoutRelatedProceduresComponent id={1} />;

const removeMachineButtonWithRelatedProceduresInitialState = {
  ...initialState,
  jobSetEditor: jobSetEditorInit({
    jobSet: {
      machines: [
        {
          id: 1,
          title: 'M1',
          description: 'Machine 1'
        },
        {
          id: 2,
          title: 'M2',
          description: 'Machine 2'
        }
      ],
      jobs: [
        {
          id: 1,
          procedures: [
            {
              id: 1,
              jobId: 1,
              machineId: 1,
              sequence: 1,
              processingMilliseconds: 60000,
            },
            {
              id: 2,
              jobId: 1,
              machineId: 2,
              sequence: 2,
              processingMilliseconds: 120000,
            }
          ]
        },
        {
          id: 2,
          procedures: [
            {
              id: 4,
              jobId: 2,
              machineId: 1,
              sequence: 1,
              processingMilliseconds: 120000,
            },
            {
              id: 3,
              jobId: 2,
              machineId: 2,
              sequence: 2,
              processingMilliseconds: 60000,
            },
            {
              id: 5,
              jobId: 2,
              machineId: 1,
              sequence: 3,
              processingMilliseconds: 180000,
            },
          ]
        }
      ]
    }
  })
};
const RemoveMachineButtonWithRelatedProceduresComponent = decorate(removeMachineButtonWithRelatedProceduresInitialState)(RemoveMachineButton);
const removeMachineButtonWithRelatedProcedures = <RemoveMachineButtonWithRelatedProceduresComponent id={1} />;

const ReduxRemoveMachineButtonComponent = decorateInteractive(removeMachineButtonWithRelatedProceduresInitialState)(RemoveMachineButton);
const reduxRemoveMachineButton = <ReduxRemoveMachineButtonComponent id={1} />;

export default {
  removeMachineButtonWithoutRelatedProcedures,
  removeMachineButtonWithRelatedProcedures,
  reduxRemoveMachineButton,
};