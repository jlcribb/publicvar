import React, { useEffect, useRef } from 'react';
import { Stage } from 'ngl';

const ProteinViewerNuevo3 = ({ pdbId, width = '100%', height = '400px' }) => {
  const stageRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current && !stageRef.current) {
      stageRef.current = new Stage(containerRef.current);
    }

    const loadMolecule = async () => {
      if (stageRef.current) {
        // Limpiar visualizaciones previas
        stageRef.current.removeAllComponents();

        try {
          // Cargar la molécula
          const component = await stageRef.current.loadFile(`rcsb://${pdbId}`);
          
          // Añadir representación
          component.addRepresentation('cartoon');
          
          // Ajustar la vista
          component.autoView();
        } catch (error) {
          console.error('Error al cargar la molécula:', error);
        }
      }
    };

    loadMolecule();

    // Limpieza
    return () => {
      if (stageRef.current) {
        stageRef.current.dispose();
      }
    };
  }, [pdbId]);

  useEffect(() => {
    const handleResize = () => {
      if (stageRef.current) {
        stageRef.current.handleResize();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <div ref={containerRef} style={{ width, height }} />;
};

export default ProteinViewerNuevo3;