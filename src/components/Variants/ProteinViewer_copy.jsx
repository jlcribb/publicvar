import React, { useEffect, useState } from 'react';
import ProteinSequenceViewer from './ProteinSequenceViewer'; // Importar tu componente
import { Stage } from "ngl";
import axios from "axios";
import styles from './styles/styles.css'


const ProteinViewer = ({ pdbIdCanonical, pdbIdAlternative }) => {
  const [canonicalSequence, setCanonicalSequence] = useState('');
  const [alternativeSequence, setAlternativeSequence] = useState('');

  useEffect(() => {
    const loadProteins = async () => {
      const stage1 = new Stage("viewer1");
      const stage2 = new Stage("viewer2");

      // Cargar la primera proteína
      stage1.loadFile(`rcsb://${pdbIdCanonical}`).then((component1) => {
        component1.addRepresentation("ball+stick")
        const sequenceCanonical = component1.structure.getSequence();
        setCanonicalSequence(sequenceCanonical)
        console.log("Secuencia de la proteína canónica:", sequenceCanonical);
        component1.autoView();
      });
  
      // Cargar la segunda proteína
      stage2.loadFile(`rcsb://${pdbIdAlternative}`).then((component2) => {
        component2.addRepresentation("ball+stick");
      // Obtener la secuencia de aminoácidos de la proteína alternativa
        const sequenceAlternative = component2.structure.getSequence();
        setAlternativeSequence(sequenceAlternative)
        console.log("Secuencia de la proteína alternativa:", sequenceAlternative);
        component2.autoView();
      });
      };

    loadProteins();
  }, [pdbIdCanonical, pdbIdAlternative]);

  return (
    <div className="protein-viewer-container">
      <div className="parameters-column">
        {/* Aquí irán tus controles de parámetros */}
      </div>
      <div className="viewer-column">
        <ProteinSequenceViewer sequence={canonicalSequence} />
        <div id="viewer1" className="ngl-viewer"></div>
      </div>
      <div className="viewer-column">
        <ProteinSequenceViewer sequence={alternativeSequence} />
        <div id="viewer2" className="ngl-viewer"></div>
      </div>
    </div>
  );
};

export default ProteinViewer;
