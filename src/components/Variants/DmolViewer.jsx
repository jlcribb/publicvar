import React, { useEffect, useRef } from 'react';
import $3Dmol from '3dmol';

const DmolViewer = () => {
  const viewerRef = useRef(null);
    // Código no funcional
  useEffect(() => {
    const element = viewerRef.current;
    const config = { backgroundColor: 'white' };
    const viewer = $3Dmol.createViewer(element, config);

    $3Dmol.download('pdb:1CRN', viewer, {}, () => {
      viewer.setStyle({}, { cartoon: { color: 'spectrum' } });
      viewer.zoomTo();
      viewer.render();
      viewer.zoom(1.2, 1000);
    });

    return () => {
      element.innerHTML = '';
    };
  }, []);

  return <div ref={viewerRef} style={{ width: '100%', height: '600px' }} />;
};

export default DmolViewer;
