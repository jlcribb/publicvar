import React, { useEffect, useState } from 'react';
import styles from './styles/styles.css'

const ProteinSequenceViewer = ({ sequence }) => {
  const [formattedSequence, setFormattedSequence] = useState('');

  useEffect(() => {
    if (sequence) {
      // Formatear la secuencia, por ejemplo, para agregar spans o cualquier otra manipulación .split('')
      const stringSequence = sequence
      const formatted = stringSequence.split('').map((aa, index) => (
        <span key={index} className="sequence-container">
          {aa}
        </span>
      ));
      setFormattedSequence(formatted);
    }
  }, [sequence]);

  return (
    <div className="sequence-container">
      {formattedSequence}
    </div>
  );
};

export default ProteinSequenceViewer;
