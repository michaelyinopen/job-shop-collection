import React from 'react';
import { flowRight } from 'lodash';
import decorateStyle from '../__fixtureDecorators__/decorateStyle';
import decorateRouter from '../__fixtureDecorators__/decorateRouter';
import Layout from './Layout';

const decorate = flowRight(decorateStyle, decorateRouter);

const DecoratedLayout = decorate(Layout);

const fitChild = () => (
  <DecoratedLayout>
    <div
      style={{
        borderStyle: "dashed",
        backgroundImage: "linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%, #eee 100%),linear-gradient(45deg, #eee 25%, white 25%, white 75%, #eee 75%, #eee 100%)",
        backgroundSize: "20px 20px",
        backgroundPosition: "0px 0px, 10px 10px",
        boxSizing: "border-box",
        fontSize: "xxx-large",
        height: "100%",
      }}
    >
      Children
      </div>
  </DecoratedLayout>
);

const tallChild = ()=> (
  <DecoratedLayout>
    <div
      style={{
        borderStyle: "dashed",
        backgroundImage: "linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%, #eee 100%),linear-gradient(45deg, #eee 25%, white 25%, white 75%, #eee 75%, #eee 100%)",
        backgroundSize: "20px 20px",
        backgroundPosition: "0px 0px, 10px 10px",
        boxSizing: "border-box",
        fontSize: "xxx-large",
        height: "1000px",
      }}
    >
      Children
      </div>
  </DecoratedLayout>
);

export default {
  fitChild,
  tallChild
};