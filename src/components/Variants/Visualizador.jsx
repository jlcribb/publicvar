import React from 'react';
import ProteinViewer from './ProteinViewer';

const Visualizador = () => {
    const isWebGLAvailable = () => {
        try {
          const canvas = document.createElement('canvas');
          return !!(window.WebGLRenderingContext && 
                    (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
        } catch (e) {
          return false;
        }
      };
    
  return (
    <div>
      <h1>Visualización de Proteína</h1>
      <ProteinViewer pdbId="1CRN" />
    </div>
  );
};

