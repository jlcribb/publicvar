import React, { useEffect, useRef, useState } from "react";
import { Stage } from "ngl";
import styles from "./styles/styles.css";

const ProteinViewerNuevo = ({ proteinCode }) => {
  const stageRef = useRef(null);
  const [sequence, setSequence] = useState("");
  const [hoveredResidue, setHoveredResidue] = useState(null);

  useEffect(() => {
    // Función para obtener la secuencia de aminoácidos desde una API
    const fetchSequence = async (code) => {
      try {
        const response = await fetch(
          `https://api.example.com/protein/${code}/sequence`
        );
        const data = await response.json();
        setSequence(data.sequence); // Asume que el campo 'sequence' contiene la cadena de aminoácidos
      } catch (error) {
        console.error("Error fetching sequence:", error);
      }
    };

    // Función para cargar la estructura de la proteína en NGL
    const loadProteinStructure = (code) => {
      const stage = new Stage(stageRef.current, { backgroundColor: "white" });

      // Cargar el archivo PDB o similar desde la API
      stage
        .loadFile(`https://files.rcsb.org/download/${code}.pdb`)
        .then((component) => {
          component.addRepresentation("cartoon");
          const seq = component.structure.getSequence().join("");
          setSequence(seq);
          stage.autoView();

          // Evento hover para resaltar el residuo sobrevolado
          stage.mouseControls.add("hoverPick", (pickData) => {
            if (pickData && pickData.atom) {
              const residueNumber = pickData.atom.resno;
              setHoveredResidue(residueNumber);
            } else {
              setHoveredResidue(null);
            }
          });
        });

      return () => {
        stage.dispose(); // Limpiar NGL al desmontar el componente
      };
    };

    // Llamar a las funciones con el código de proteína
    if (proteinCode) {
      // fetchSequence(proteinCode);
      loadProteinStructure(proteinCode);
    }
  }, [proteinCode]);

  return (
    <div className="flex">
      {/* Vista de la estructura 3D de la proteína */}
      <div className="protein-viewer" style={{ display: "flex" }}>
        <div ref={stageRef} style={{ width: "50%", height: "500px" }}></div>

        {/* Secuencia de aminoácidos */}
        <div className="w-1/2 p-4">
          <h3 className="text-xl font-bold mb-4">Secuencia de Aminoácidos</h3>
          <div className="sequence-container">
            {/* <div className="grid grid-cols-10 gap-1"> */}
            {sequence.split("").map((aa, index) => (
              <span
                key={index}
                className={`p-2 ${
                  hoveredResidue === index + 1 ? "bg-yellow-500" : "bg-gray-200"
                }`}
              >
                {aa}
              </span>
            ))}
            </div>
          </div>
        </div>
      </div>
    // </div>
  );
};

export default ProteinViewerNuevo;
