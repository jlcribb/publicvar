import React, { useState, useEffect } from 'react';

function GeneInfo({ geneId,tab } ) {
  const [geneData, setGeneData] = useState({
    description: "",
    otheraliases: "",
    otherdesignations: '',
    nomenclaturename: '',
    nomenclaturesymbol: '',
    nomenclaturestatus: '',
    summary: "",
  });
//   console.log('Id de gen: ',geneId)
  useEffect(() => {
    const fetchGeneData = async () => {
      try {
        const response = await fetch(`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=gene&id=${geneId}&retmode=json`);
        const data = await response.json();
        setGeneData(data.result[geneId]);
      } catch (error) {
        console.error('Error fetching gene data:', error);
      }
    };

    fetchGeneData();
  }, [geneId]);

  return (
    <div>
      {/* <h2>Gene Information</h2> */}
      {geneData ? (
          <div className="container relative flex flex-col justify-between h-full max-w-6xl px-10 mx-auto xl:px-0 mt-5">
            <p className="mb-2 text-gray-600">Description: {geneData?.description}</p>
            <p className="mb-2 text-gray-600">Other aliases: {geneData?.otheraliases}</p>
            <p className="mb-2 text-gray-600">Other designations: {geneData?.otherdesignations}</p>
            <p className="mb-2 text-gray-600">Name: {geneData?.nomenclaturename}</p>
            <p className="mb-2 text-gray-600">Symbol: {geneData?.nomenclaturesymbol}</p>
            <p className="mb-2 text-gray-600">Status: {geneData?.nomenclaturestatus}</p>
            <p className="mb-2 text-gray-600">Summary: {geneData?.summary}</p>
          </div>
        ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default GeneInfo;
