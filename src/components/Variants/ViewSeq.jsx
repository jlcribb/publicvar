import React, { useState, useEffect } from "react";

const ProteinSequence = ({ uniprotId }) => {
  const [sequence, setSequence] = useState("");

  useEffect(() => {
    fetch(`https://www.uniprot.org/uniprot/${uniprotId}.fasta`)
      .then(response => response.text())
      .then(data => {
        // La secuencia FASTA tiene un encabezado que empieza con '>'
        const lines = data.split("\n");
        const seq = lines.slice(1).join("");
        setSequence(seq);
      })
      .catch(error => console.error("Error fetching sequence:", error));
  }, [uniprotId]);

  return (
    <div>
      <h2>Secuencia de Aminoácidos</h2>
      <pre>{sequence}</pre>
    </div>
  );
};

export default ProteinSequence;
// no