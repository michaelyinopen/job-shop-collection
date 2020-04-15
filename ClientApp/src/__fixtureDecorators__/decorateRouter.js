import React from 'react';
import { MemoryRouter } from 'react-router-dom';

export default Component => (props) => {
  return (
    <MemoryRouter>
      <Component {...props} />
    </MemoryRouter>
  )
};