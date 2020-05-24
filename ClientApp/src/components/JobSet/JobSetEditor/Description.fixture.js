import React from 'react';
import { flowRight } from 'lodash';
import { useValue } from 'react-cosmos/fixture';
import decorateStyle from '../../../__fixtureDecorators__/decorateStyle';
import decorateRedux from '../../../__fixtureDecorators__/decorateRedux';
import decorateInteractiveRedux from '../../../__fixtureDecorators__/decorateInteractiveRedux';
import Description from './Description';
import { initialState } from '../../../store/reducer';
import { jobSetEditorInit } from '../../JobSet';

const decorate = initialState => flowRight(decorateStyle, decorateRedux(initialState));
const decorateInteractive = initialState => flowRight(decorateStyle, decorateInteractiveRedux(initialState));

const readOnlyDescriptionInitialState = {
  ...initialState,
  jobSetEditor: jobSetEditorInit({ readOnly: true, jobSet: { description: null } })
};
const readOnlyDescription = decorate(readOnlyDescriptionInitialState)(Description);

const editableDescriptionInitialState = {
  ...initialState,
  jobSetEditor: jobSetEditorInit({ readOnly: false, jobSet: { description: null } })
};
const editableDescription = decorate(editableDescriptionInitialState)(Description);

const readOnlyInitializedDescriptionInitialState = {
  ...initialState,
  jobSetEditor: jobSetEditorInit({ readOnly: true, jobSet: { description: "Initial Value" } })
};
const readOnlyInitializedDescription = decorate(readOnlyInitializedDescriptionInitialState)(Description);

const editableInitializedDescriptionInitialState = {
  ...initialState,
  jobSetEditor: jobSetEditorInit({ readOnly: false, jobSet: { description: "Initial Value" } })
};
const editableInitializedDescription = decorate(editableInitializedDescriptionInitialState)(Description);

const IntereactiveDescriptionFixture = () => {
  const [readonly] = useValue('Readonly', { defaultValue: false });
  const [initialDescription] = useValue('Initial Description', { defaultValue: '' });
  const interactiveDescriptionInitialState = {
    ...initialState,
    jobSetEditor: jobSetEditorInit({ readOnly: readonly, jobSet: { description: initialDescription } })
  };
  const InteractiveDescription = decorateInteractive(interactiveDescriptionInitialState)(Description);
  return <InteractiveDescription />;
};

export default {
  readOnlyDescription,
  editableDescription,
  readOnlyInitializedDescription,
  editableInitializedDescription,
  interactiveDescription: <IntereactiveDescriptionFixture />,
};