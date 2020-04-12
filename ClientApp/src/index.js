import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { unregister } from './registerServiceWorker';
import { DndProvider } from 'react-dnd';
import MultiBackend from 'react-dnd-multi-backend';
import HTML5toTouch from 'react-dnd-multi-backend/dist/esm/HTML5toTouch';
import App from './App';
import './index.css';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

ReactDOM.render(
  (
    <BrowserRouter basename={baseUrl}>
      <DndProvider backend={MultiBackend} options={HTML5toTouch}>
        <App />
      </DndProvider>
    </BrowserRouter>
  ),
  rootElement
);

unregister();

