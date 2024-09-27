// Selector.js
import React, { useState, useEffect } from "react";

function Selector({ option, setSelectedItem }) {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        // console.log(option)
      const api = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=clinvar&term=(${option}[Gene%20Name])%20AND%20%22single%20nucleotide%20variant%22[Type%20of%20variation]&RetMax=15000&retmode=json`;
      try {
        const response = await fetch(api);
        const data = await response.json();
        setOptions(data.esearchresult.idlist);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  },[option]);

  const handleSelectChange = (event) => {
    setSelectedItem(event.target.value);
  };

  return (
    <select onChange={handleSelectChange}>
      {options.map((item, index) => (
        <option key={index} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
}

export default Selector;
