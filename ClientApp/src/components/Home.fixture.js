import React from 'react';
import { flowRight } from 'lodash';
import decorateStyle from '../__fixtureDecorators__/decorateStyle';
import decorateRouter from '../__fixtureDecorators__/decorateRouter';
import Home from './Home';

const decorate = flowRight(decorateStyle, decorateRouter);

export default decorate(Home);