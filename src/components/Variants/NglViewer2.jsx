import React, { useEffect, useRef, useState } from "react";
import { Stage } from "ngl";
import axios from "axios";

const NGLViewer = ({ pdbId }) => {
  const stageRef = useRef(null);
  const stageInstance = useRef(null);
  const [sequence, setSequence] = useState("");
  const uniprotId = "P12345";
  const viewerRef = useRef(null);

  useEffect(() => {
    // Crear una nueva instancia de NGL Stage
    if (stageRef.current) {
      stageInstance.current = new Stage(stageRef.current, {
        backgroundColor: "white",
      });

      // const stage = new Stage(stageRef.current, { backgroundColor: 'white' });

      // Obtener la secuencia FASTA desde UniProt
      // axios
      //   .get(`https://www.uniprot.org/uniprot/${uniprotId}.fasta`)
      //   .then((response) => response.text())
      //   .then((data) => {
      //     const lines = data.split("\n");
      //     const seq = lines.slice(1).join("");
      //     setSequence(seq);
      //   })
      //   .catch((error) => console.error("Error fetching sequence:", error));

      // // Cargar una estructura de proteína usando su ID de PDB
      // stageInstance.current.loadFile(`rcsb://${pdbId}`).then((component) => {
      //   component.addRepresentation("ball+stick"); // , { color: "chainid" }
      //   component.autoView();
      // });

      // Función para manejar el redimensionamiento
      const handleResize = () => {
        if (stageInstance.current) {
          stageInstance.current.handleResize();
        }
      };

      // Ajustar el tamaño del visor al redimensionar la ventana
      window.addEventListener("resize", handleResize);

      // Limpiar el efecto al desmontar el componente
      return () => {
        // stageInstance.removeAllComponents();
        window.removeEventListener("resize", handleResize);
        // stage.dispose()
      };
    }
  }, []); // pdbId

  const synchronizeViews = (stage1, stage2) => {
    const syncCamera = () => {
      stage2.viewer.camera.position.copy(stage1.viewer.camera.position);
      stage2.viewer.camera.quaternion.copy(stage1.viewer.camera.quaternion);
      stage2.viewer.camera.up.copy(stage1.viewer.camera.up);
      stage2.viewer.camera.updateProjectionMatrix();
      stage2.viewer.requestRender();
    };
  
    // Utilizar onRender directamente en lugar de signals.rendered
    stage1.viewer.signals.cameraChanged.add(syncCamera);
  };
  
  const loadProteins = (pdbIdCanonical, pdbIdAlternative) => {
    const stage1 = new Stage("viewer1");
    const stage2 = new Stage("viewer2");
  
    stage1.loadFile(`rcsb://${pdbIdCanonical}`).then((component1) => {
      component1.addRepresentation("ball+stick")
      const sequenceCanonical = component1.structure.getSequence();
      console.log("Secuencia de la proteína canónica:", sequenceCanonical);
      renderSequence("sequence1", sequenceCanonical)
      component1.autoView();
    });
 
    stage2.loadFile(`rcsb://${pdbIdAlternative}`).then((component2) => {
      component2.addRepresentation("ball+stick");
    // Obtener la secuencia de aminoácidos de la proteína alternativa
      const sequenceAlternative = component2.structure.getSequence();
      console.log("Secuencia de la proteína alternativa:", sequenceAlternative);
      renderSequence("sequence2", sequenceAlternative);
      component2.autoView();
    });

    
      
    // Sincronizar ambas visualizaciones
    // synchronizeViews(stage1, stage2);
  };
  

  const renderSequence = (elementId, sequence) => {
    // Obtener el contenedor por ID
    const container = document.getElementById(elementId);
  
    // Verificar si el contenedor existe
    if (!container) {
      console.error(`Elemento con ID '${elementId}' no encontrado.`);
      return;
    }
  
    // Verificar si la secuencia es un array, en caso afirmativo, unirla en una cadena
    if (Array.isArray(sequence)) {
      sequence = sequence.join('');
    }
  
    // Renderizar la secuencia
    container.innerHTML = sequence.split('').map((aa, index) => 
      `<span class="amino-acid" data-index="${index}">${aa}</span>`).join('');
  };
    
  const pdbIdCanonical = '1T2V'  


    
  const ProteinViewer = () => {
    const [pdbIdCanonical, setPdbIdCanonical] = useState("1T2V");
    const [pdbIdAlternative, setPdbIdAlternative] = useState("1T2U");
  
    useEffect(() => {
      loadProteins(pdbIdCanonical, pdbIdAlternative);
    }, [pdbIdCanonical, pdbIdAlternative]);
  
    return (
      <div className="grid grid-cols-6 h-screen">
        <div className="col-span-1 p-4 bg-gray-100 dark:bg-gray-800">
          <select onChange={(e) => setPdbIdAlternative(e.target.value)}>
            <option value="1T2V">Alternative 1</option>
            <option value="1T2U">Alternative 2</option>
          </select>
        </div>
        <div className="col-span-2 p-4">
          <div id="viewer1" className="h-full"></div>
        </div>
        <div className="col-span-2 p-4">
          <div id="viewer2" className="h-full"></div>
        </div>
      </div>
    );
  };
        
  return (
    // <div
    //   ref={stageRef}
    //   className="relative w-full h-96 bg-yellow-100"
    //   // style={{ width: "50%", height: "500px" }}
    // />
    <div className="grid grid-cols-6 h-screen">
      <div className="col-span-1 p-4 bg-gray-100 dark:bg-gray-800">
        {/* Aquí van los parámetros */}
        <select onChange={(e) => loadProteins(pdbIdCanonical, e.target.value)}>
          <option value="1T2V">Alternative 1</option>
          <option value="1T2U">Alternative 2</option>
        </select>
      </div>
      <div className="col-span-2 p-4">
        {/* Visualización de la proteína canónica */}
        <div id="viewer1" className="h-full"></div>
      </div>
      <div className="col-span-2 p-4">
        {/* Visualización de la proteína alternativa */}
        <div id="viewer2" className="h-full"></div>
      </div>
    </div>
  );
};

export default NGLViewer;
