import React from 'react';
import { flowRight } from 'lodash';
import decorateStyle from '../../../__fixtureDecorators__/decorateStyle';
import decorateRedux from '../../../__fixtureDecorators__/decorateRedux';
import decorateInteractiveRedux from '../../../__fixtureDecorators__/decorateInteractiveRedux';
import Title from './Title';
import { initialState } from '../../../store/reducer';
import { jobSetEditorInit } from '../../JobSet';

const decorate = initialState => flowRight(decorateStyle, decorateRedux(initialState));
const decorateInteractive = initialState => flowRight(decorateStyle, decorateInteractiveRedux(initialState));

const readOnlyTitleInitialState = {
  ...initialState,
  jobSetEditor: jobSetEditorInit({ readOnly: true, jobSet: { title: null } })
};
const readOnlyTitle = decorate(readOnlyTitleInitialState)(Title);

const editableTitleInitialState = {
  ...initialState,
  jobSetEditor: jobSetEditorInit({ readOnly: false, jobSet: { title: null } })
};
const editableTitle = decorate(editableTitleInitialState)(Title);

const readOnlyInitializedTitleInitialState = {
  ...initialState,
  jobSetEditor: jobSetEditorInit({ readOnly: true, jobSet: { title: "Initial Value" } })
};
const readOnlyInitializedTitle = decorate(readOnlyInitializedTitleInitialState)(Title);

const editableInitializedTitleInitialState = {
  ...initialState,
  jobSetEditor: jobSetEditorInit({ readOnly: false, jobSet: { title: "Initial Value" } })
};
const editableInitializedTitle = decorate(editableInitializedTitleInitialState)(Title);

const reduxTitleInitialState = {
  ...initialState,
  jobSetEditor: jobSetEditorInit({ readOnly: false, jobSet: { title: "Initial Value" } })
};
const reduxTitle = decorateInteractive(reduxTitleInitialState)(Title);

export default {
  readOnlyTitle,
  editableTitle,
  readOnlyInitializedTitle,
  editableInitializedTitle,
  reduxTitle
};