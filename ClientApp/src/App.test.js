import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import TestBackend from 'react-dnd-test-backend';
import App from './App';

it('renders without crashing', async () => {
  const div = document.createElement('div');
  ReactDOM.render(
    (
      <MemoryRouter>
        <DndProvider backend={TestBackend}>
          <App />
        </DndProvider>
      </MemoryRouter >
    ),
    div
  );
  await new Promise(resolve => setTimeout(resolve, 1000));
});
