import React, { useEffect, useRef } from 'react';
import { PluginContext } from 'molstar/lib/mol-plugin/context';
import { createPluginUI } from 'molstar/lib/mol-plugin-ui';

const ProteinViewerMolstar = ({ pdbId }) => {
  const viewerRef = useRef(null);

  useEffect(() => {
    if (!viewerRef.current) return;

    // Crear el plugin
    const plugin = createPluginUI(viewerRef.current, { 
      // Asegúrate de pasar las opciones necesarias
      // Puedes configurar opciones aquí
    });

    // Cargar y visualizar la estructura proteica
    async function loadProtein() {
      try {
        const data = await plugin.builders.data.download({ url: `https://files.rcsb.org/download/${pdbId}.pdb`, isBinary: false });

        if (!data || !data.data) {
          console.error('Error: No se pudo obtener los datos PDB correctamente.');
          return;
        }

        const trajectory = await plugin.builders.structure.parseTrajectory(data.data, 'pdb');
        if (!trajectory) {
          console.error('Error: No se pudo parsear la trayectoria del PDB.');
          return;
        }

        await plugin.builders.structure.hierarchy.applyPreset(trajectory, 'default');
      } catch (error) {
        console.error('Error al cargar la proteína:', error);
      }
    }

    loadProtein();

    return () => {
      plugin?.dispose(); // Limpiar el plugin al desmontar
      viewerRef.current.innerHTML = ''; // Limpiar el contenido del div al desmontar
    };
  }, [pdbId]);

  return <div ref={viewerRef} style={{ width: '100%', height: '500px' }} />;
};

export default ProteinViewerMolstar;
