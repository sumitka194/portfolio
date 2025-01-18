import React from 'react';
import { createRoot } from 'react-dom/client';
import Portfolio from './portfolio';

const root = createRoot(document.getElementById('app'));

root.render(
  <Portfolio />
);
