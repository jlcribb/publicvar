import React, { useEffect, useRef } from 'react';
import { Stage } from 'ngl';

const NglViewer = ({ pdbId }) => {
  const viewerRef = useRef();

  useEffect(() => {
    const stage = new Stage(viewerRef.current);
    console.log('pdb: ',pdbId)

    // Cargar y visualizar el archivo PDB
    stage.loadFile(`https://files.rcsb.org/view/${pdbId}.pdb`, { ext: 'pdb' })
      .then((component) => {
        console.log('PDB file loaded successfully');
        console.log('ok')
        component.addRepresentation('cartoon');
        component.autoView();
      })
      .catch((error) => {
        console.error("Error loading PDB file:", error);
      });

    window.addEventListener('resize', () => {
      stage.handleResize();
    });

    // Limpiar el componente cuando se desmonte
    return () => {
      window.removeEventListener('resize', stage.handleResize);
      stage.dispose();
    };
  }, [pdbId]);

  return <div ref={viewerRef} style={{ width: '100%', height: '600px', backgroundColor: 'black' }}></div>;
};

export default NglViewer;

