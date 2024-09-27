import React, { useEffect, useRef } from 'react';
import pv from 'bio-pv';

const PVViewer = () => {
  const viewerRef = useRef(null);

  useEffect(() => {
    const viewer = pv.Viewer(viewerRef.current, {
      width: 'auto',
      height: 'auto',
      antialias: true,
      outline: true,
    });

    pv.io.fetchPdb('1CRN', (structure) => {
      viewer.cartoon('structure', structure);
      viewer.centerOn(structure);
    });

    return () => {
      viewer.destroy();
    };
  }, []);

  return <div ref={viewerRef} style={{ width: '100%', height: '600px' }} />;
};

export default PVViewer;
