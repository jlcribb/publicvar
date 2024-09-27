import React from 'react';
import { createRoot } from 'react-dom/client';
import ProteinViewer from './ProteinViewer';

const container = document.getElementById('root');
const root = createRoot(container); // Crear el root con la nueva API

root.render(
  <React.StrictMode>
    <ProteinViewer uniprotId="P12345" pdbId="1A2B" />
  </React.StrictMode>
);
