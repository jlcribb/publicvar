// Descripcion.js
import React, {useState, useEffect} from 'react';

function Descripcion({ selectedItem }) {
    const [description, setDescription] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
          console.log(selectedItem)
        const api = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=clinvar&id=${selectedItem}&retmode=json`;
        try {
          const response = await fetch(api);
          const data = await response.json();
          setDescription(data.esearchresult.idlist);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      fetchData();
    });
  
  return (
    <div>

      {selectedItem && <p>Descripción para {selectedItem}</p>}
    </div>
  );
}

export default Descripcion;
