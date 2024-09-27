import React, { useEffect, useState, useRef } from "react";
import ReactDOM from 'react-dom/client';
import ProteinSequenceViewer from "./ProteinSequenceViewer"; // Importar tu componente
import { Stage } from "ngl";
import axios from "axios";
import styles from "./styles/styles.css";

const ProteinViewer = ({ pdbIdCanonical, pdbIdAlternative }) => {
  const [canonicalSequence, setCanonicalSequence] = useState("");
  const [alternativeSequence, setAlternativeSequence] = useState("");
  const stage1 = useRef(null);
  const stage2 = useRef(null);
  const component1Ref = useRef(null);
  const component2Ref = useRef(null);

  const [highlightedAA1, setHighlightedAA1] = useState(null);
  const [highlightedAA2, setHighlightedAA2] = useState(null);

  useEffect(() => {
    // Cargar la primera proteína
    stage1.current = new Stage("viewer1");
    stage1.current.loadFile(`rcsb://${pdbIdCanonical}`).then((component1) => {
      component1.addRepresentation("cartoon");
      const sequenceCanonical = component1.structure.getSequence().join('');
      setCanonicalSequence(sequenceCanonical)
      console.log("Secuencia de la proteína canónica:", sequenceCanonical);

      component1.autoView();
      component1Ref.current = component1;
    });

    // Cargar la segunda proteína
    stage2.current = new Stage("viewer2");
    stage2.current.loadFile(`rcsb://${pdbIdAlternative}`).then((component2) => {
      component2.addRepresentation("cartoon");

      const sequenceAlternative = component2.structure.getSequence().join('');
      setAlternativeSequence(sequenceAlternative)
      console.log("Secuencia de la proteína canónica:", sequenceAlternative);
      component2.autoView();
      component2Ref.current = component2;
    });
  }, [pdbIdCanonical, pdbIdAlternative]);

  const handleHoverSequence = (residueIndex, componentRef, setHighlightedAA) => {
    const component = componentRef.current;

    if (component) {
      // Eliminar la representación previa
      try {
        // Primero, eliminar cualquier representación anterior
        component.removeAllRepresentations();

        // Añadir de nuevo la representación principal
        component.addRepresentation("cartoon");

        // Añadir una representación específica para el
        // console.log('Index: ', residueIndex)
        // console.log(`Seleccionando /A:${residueIndex}`)
        const sele = `${residueIndex}`; // Cambia la cadena según sea necesario
        component.autoView(sele);

        component.addRepresentation("spacefill", {
          sele: sele, // Selecciona el residuo por índice
          color: "red",
        });
        
        // Centrar la vista en el residuo resaltado
        // component.autoView(`${residueIndex}`);

        // Actualizar el estado del aminoácido resaltado
        setHighlightedAA(residueIndex);
      } catch (error) {
        console.error("Error al resaltar el residuo en la molécula:", error);
      }
    }
  };

  const handleHoverMolecule = (residueIndex, setSequenceHighlight) => {
    setSequenceHighlight(residueIndex); // Resaltar la secuencia en pantalla
  };

  return (
    <div className="protein-viewer" style={{ display: "flex" }}>
      <div style={{ flex: 1 }}>
        <div className="sequence-container">
          {canonicalSequence.split("").map((residue, index) => (
            <span
              key={index}
              style={{
                backgroundColor: highlightedAA1 === index + 1 ? "green" : "transparent",
              }}
              onMouseEnter={() =>
                handleHoverSequence(index + 1, component1Ref, setHighlightedAA1)
              }
            >
              {residue}
            </span>
          ))}
        </div>
        <div id="viewer1" style={{ width: "100%", height: "500px" }} />
      </div>

      <div style={{ flex: 1 }}>
        <div className="sequence-container">
          {alternativeSequence.split("").map((residue, index) => (
            <span
              key={index}
              style={{
                backgroundColor: highlightedAA2 === index + 1 ? "yellow" : "transparent",
              }}
              onMouseEnter={() =>
                handleHoverSequence(index + 1, component2Ref, setHighlightedAA2)
              }
            >
              {residue}
            </span>
          ))}
        </div>
        <div id="viewer2" style={{ width: "100%", height: "500px" }} />
      </div>
    </div>
  );
}
export default ProteinViewer;

// const [canonicalSequence, setCanonicalSequence] = useState("");
// const [alternativeSequence, setAlternativeSequence] = useState("");

// const sequenceCanonical = component1.structure.getSequence().join('');
// setCanonicalSequence(sequenceCanonical)
// console.log("Secuencia de la proteína canónica:", sequenceCanonical);
