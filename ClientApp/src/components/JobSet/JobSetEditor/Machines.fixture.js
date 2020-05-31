import React from 'react';
import { flowRight } from 'lodash';
import { useValue } from 'react-cosmos/fixture';
import decorateStyle from '../../../__fixtureDecorators__/decorateStyle';
import decorateRedux from '../../../__fixtureDecorators__/decorateRedux';
import decorateInteractiveRedux from '../../../__fixtureDecorators__/decorateInteractiveRedux';
import Machines from './Machines';
import { initialState } from '../../../store/reducer';
import { jobSetEditorInit } from '../../JobSet';

const decorate = initialState => flowRight(decorateStyle, decorateRedux(initialState));
const decorateInteractive = initialState => flowRight(decorateStyle, decorateInteractiveRedux(initialState));

const readOnlyMachinesInitialState = {
  ...initialState,
  jobSetEditor: jobSetEditorInit({
    readOnly: true,
    jobSet: {
      machines: [{ id: 1, title: 'M1', description: 'Machine 1' }]
    }
  })
};
const readOnlyMachines = decorate(readOnlyMachinesInitialState)(Machines);

const editableMachinesInitialState = {
  ...initialState,
  jobSetEditor: jobSetEditorInit({
    readOnly: false,
    jobSet: {
      machines: [{ id: 1, title: 'M1', description: 'Machine 1' }]
    }
  })
};
const editableMachines = decorate(editableMachinesInitialState)(Machines);

const IntereactiveMachinesFixture = () => {
  const [readonly] = useValue('Readonly', { defaultValue: false });
  const [initialMachineCount] = useValue('Initial Machines', { defaultValue: 0 });
  const interactiveMachinesInitialState = {
    ...initialState,
    jobSetEditor: jobSetEditorInit({
      readOnly: readonly,
      jobSet: {
        machines: [...Array(initialMachineCount).keys()]
          .map(i => i + 1)
          .map(n => ({ id: n, title: `M${n}`, description: `Machine ${n}` }))
      }
    })
  };
  const InteractiveMachines = decorateInteractive(interactiveMachinesInitialState)(Machines);
  return <InteractiveMachines />;
};

export default {
  readOnlyMachines,
  editableMachines,
  intereactiveMachinesFixture: <IntereactiveMachinesFixture />
};