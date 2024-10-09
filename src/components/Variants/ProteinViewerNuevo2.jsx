import React, { useEffect, useRef, useState } from "react";
import { Stage } from "ngl";
import "./styles/styles.css";
const ProteinViewerNuevo2 = ({ proteinCode }) => {
    const stageRef1 = useRef(null);
    const stageRef2 = useRef(null);
  
    // Estados separados para cada cámara
    const [sequence1, setSequence1] = useState(""); // Secuencia para la cámara 1
    const [sequence2, setSequence2] = useState(""); // Secuencia para la cámara 2
    const [hoveredResidue1, setHoveredResidue1] = useState(null); // Residuo seleccionado en la cámara 1
    const [hoveredResidue2, setHoveredResidue2] = useState(null); // Residuo seleccionado en la cámara 2
  
    useEffect(() => {
      const loadProteinStructure = (code, stageRef, setSequence, setHoveredResidue) => {
        const stage = new Stage(stageRef.current, { backgroundColor: "white" });
  
        // Cargar la estructura desde el código de la proteína
        stage
          .loadFile(`https://files.rcsb.org/download/${code}.pdb`)
          .then((component) => {
            component.addRepresentation("cartoon");
            stage.autoView();
  
            // Obtener la secuencia desde el componente cargado
            const sequenceData = component.structure.getSequence().join("");
            setSequence(sequenceData);
  
            // Hover para resaltar el residuo sobrevolado
            stage.signals.hovered.add(pickData => {
              if (pickData && pickData.atom) {
                const residueNumber = pickData.atom.resno;
                setHoveredResidue(residueNumber);  // Actualiza el residuo destacado
              } else {
                setHoveredResidue(null);  // Limpiar si no hay residuo bajo el mouse
              }
            });
          });
      };
  
      if (proteinCode) {
        // Cargar la estructura en ambas cámaras, con estados separados
        loadProteinStructure(proteinCode, stageRef1, setSequence1, setHoveredResidue1);
        loadProteinStructure(proteinCode, stageRef2, setSequence2, setHoveredResidue2);
      }
    }, [proteinCode]);
  
    return (
      <div className="flex flex-col items-center">
        {/* Contenedor para secuencias de aminoácidos */}
        <div className="flex justify-between w-full">
          <div className="w-1/2 p-3">
            <h3 className="text-xl font-bold mb-2">Cámara 1</h3>
            <div className="sequence-container2">
              {sequence1.split("").map((aa, index) => (
                <span
                  key={index}
                  className={`p-1 ${
                    hoveredResidue1 === index + 1 ? "bg-yellow-500" : "bg-gray-200"
                  }`}
                >
                  {aa}
                </span>
              ))}
            </div>
          </div>
          <div className="w-1/2 p-2">
            <h3 className="text-xl font-bold mb-2">Cámara 2</h3>
            <div className="sequence-container2">
              {sequence2.split("").map((aa, index) => (
                <span
                  key={index}
                  className={`p-1 ${
                    hoveredResidue2 === index + 1 ? "bg-yellow-500" : "bg-gray-200"
                  }`}
                >
                  {aa}
                </span>
              ))}
            </div>
          </div>
        </div>
  
        {/* Contenedor para las visualizaciones 3D */}
        <div className="flex w-full mt-4">
          <div
            ref={stageRef1}
            className="w-1/2 h-96 border-2 border-gray-300"
          ></div>
          <div
            ref={stageRef2}
            className="w-1/2 h-96 border-2 border-gray-300"
          ></div>
        </div>
      </div>
    );
  };
  
  export default ProteinViewerNuevo2;