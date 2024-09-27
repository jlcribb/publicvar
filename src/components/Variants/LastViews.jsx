import React, { useEffect, useRef, useState } from 'react';
import NGL from 'ngl';

const ProteinViewer = ({ uniprotId, pdbId }) => {
  const [sequence, setSequence] = useState('');
  const viewerRef = useRef(null);
  const stageRef = useRef(null);

  useEffect(() => {
    // Obtener la secuencia FASTA desde UniProt
    fetch(`https://www.uniprot.org/uniprot/${uniprotId}.fasta`)
      .then(response => response.text())
      .then(data => {
        const lines = data.split('\n');
        const seq = lines.slice(1).join('');
        setSequence(seq);
      })
      .catch(error => console.error('Error fetching sequence:', error));
  }, [uniprotId]);

  useEffect(() => {
    if (viewerRef.current && !stageRef.current) {
      // Inicializar NGL Stage
      stageRef.current = new NGL.Stage(viewerRef.current);

      // Cargar la estructura PDB usando NGL
      stageRef.current.loadFile(`https://files.rcsb.org/download/${pdbId}.pdb`)
        .then(component => {
          component.addRepresentation('cartoon');
          stageRef.current.autoView();
        })
        .catch(error => console.error('Error loading PDB:', error));
    }
  }, [pdbId]);

  const handleMouseOver = (index) => {
    if (stageRef.current) {
      stageRef.current.eachComponent((comp) => {
        comp.eachRepresentation((repr) => {
          repr.setParameters({
            sele: `${index + 1}`,
            color: 'red'
          });
        });
      });
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1, padding: '10px' }}>
        <h2>Secuencia de Aminoácidos</h2>
        <div style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word', cursor: 'pointer' }}>
          {sequence.split('').map((char, index) => (
            <span
              key={index}
              onMouseOver={() => handleMouseOver(index)}
              onMouseOut={() => handleMouseOver(null)}
            >
              {char}
            </span>
          ))}
        </div>
      </div>
      <div ref={viewerRef} style={{ flex: 1, padding: '10px', width: '500px', height: '500px' }} />
    </div>
  );
};

export default ProteinViewer;
