import React, { useEffect, useRef } from 'react';
import { Stage } from 'ngl';

const MolecularViewer = () => {
  const stageRef = useRef(null);
  const stageInstance = useRef(null);

  useEffect(() => {
    if (stageRef.current) {
      // Crear la instancia de Stage
      stageInstance.current = new Stage(stageRef.current);

      // Cargar un ejemplo de proteína (puedes cambiarlo por tu propio archivo o cadena)
      stageInstance.current.loadFile('rcsb://1crn')
      .then((component) => {
        component.addRepresentation('cartoon');
        component.autoView();
      });

      // Función para ajustar el tamaño de la vista cuando se redimensiona la ventana
      const handleResize = () => {
        if (stageInstance.current) {
          stageInstance.current.handleResize();
        }
      };

      // Agregar el listener para el evento resize
      window.addEventListener('resize', handleResize);

      // Limpiar el listener cuando el componente se desmonte
      return () => {
        window.removeEventListener('resize', handleResize);
        // stageInstance.current.dispose();
      };
    }
  }, []);

  return (
    <div
      ref={stageRef}
      className="relative w-full h-96 bg-yellow-500"
    />
  );
};

export default MolecularViewer;
