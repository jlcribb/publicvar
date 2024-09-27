import React, { useEffect, useState, useRef } from "react";
import { Stage } from "ngl";
import axios from "axios";
// import styles from "./styles/styles.css";

const ProteinViewerNuevo = ({ pdbIdCanonical, pdbIdAlternative }) => {
  const [canonicalSequence, setCanonicalSequence] = useState("");
  const [alternativeSequence, setAlternativeSequence] = useState("");
  const stage1 = useRef(null);
  const stage2 = useRef(null);
  const component1Ref = useRef(null);
  const component2Ref = useRef(null);

  const [highlightedAA1, setHighlightedAA1] = useState(null);
  const [highlightedAA2, setHighlightedAA2] = useState(null);

  useEffect(() => {
    stage1.current = new Stage("viewer1");
    // loadProtein(stage1, pdbIdCanonical, setCanonicalSequence, component1Ref)
    
    stage1.current.loadFile(`rcsb://${pdbIdCanonical}`).then((component1) => {
      component1.addRepresentation("cartoon", { pickable: true });
      const sequenceCanonical = component1.structure.getSequence().join('');
      setCanonicalSequence(sequenceCanonical);
      component1.autoView();
      component1Ref.current = component1;
  
      stage1.current.signals.hovered.add((pickingProxy) => {
        if (pickingProxy && pickingProxy.atom){
            console.log('funciona 1')
        };
      });
    });
  
    // stage2.current = new Stage("viewer2");
    // loadProtein(stage2, pdbIdAlternative, setAlternativeSequence, component2Ref)

    stage2.current.loadFile(`rcsb://${pdbIdAlternative}`).then((component2) => {
      component2.addRepresentation("cartoon", { pickable: true });
      const sequenceAlternative = component2.structure.getSequence().join('');
      setAlternativeSequence(sequenceAlternative);
      component2.autoView();
      component2Ref.current = component2;
  
      stage2.current.signals.hovered.add((pickingProxy) => {
        if (pickingProxy && pickingProxy.atom){
            console.log('funciona 2')
        };
      });
    });
  }, [pdbIdCanonical, pdbIdAlternative]);

  const loadProtein = async (stage, pdbId, setPdb, ref) => {
    try {
      // Intentar cargar desde PDBe en formato .cif
      await stage.current.loadFile(`https://www.ebi.ac.uk/pdbe/entry-files/download/${pdbId}.cif`).then(component => {
        component.addRepresentation("cartoon", { pickable: true });
        const sequence = component.structure.getSequence().join('');
        setPdb(sequence);
          component.autoView();
          ref.current = component
      });
    } catch (error) {
      console.error(`Error loading CIF from PDBe for ${pdbId}, trying PDB format...`, error);
      // Si falla, intentar cargar desde RCSB en formato .pdb
      await stage.current.loadFile(`https://files.rcsb.org/download/${pdbId}.pdb`).then(component => {
        component.addRepresentation("cartoon", { pickable: true });
        const sequence = component.structure.getSequence().join('');
        setPdb(sequence);
          component.autoView();
          ref.current = component
      });
    }
  };
  
    const handleHoverSequence = (residueIndex, componentRef, setHighlightedAA) => {
    const component = componentRef.current;

    if (component) {
      component.removeAllRepresentations();
      component.addRepresentation("cartoon");
      component.addRepresentation("spacefill", {
        sele: `:${residueIndex}`,
        color: "red",
      });
      setHighlightedAA(residueIndex);
    }
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
};

export default ProteinViewerNuevo;
