import React from 'react';
import ReduxProviderDecortator from '../../../__fixtures__/decorators/ReduxProviderDecorator';
import Title from './Title';

const TitleFixture = () => {
  return (
    <ReduxProviderDecortator>
      <Title />
    </ReduxProviderDecortator>
  )
};

export default TitleFixture;