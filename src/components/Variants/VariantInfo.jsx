import React, { useState, useEffect } from 'react';

function VariantInfo({ variantId }) {
  const [variantData, setVariantData] = useState(null);

  useEffect(() => {
    const fetchVariantData = async () => {
      try {
        const response = await fetch(`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=clinvar&id=${variantId}&retmode=json`);
        const data = await response.json();
        setVariantData(data.result[variantId]);
      } catch (error) {
        console.error('Error fetching variant data:', error);
      }
    };

    fetchVariantData();
  }, [variantId]);

  return (
    <div>
      <h2>Variant Information</h2>
      {variantData ? (
        <div>
          {/* Render variant information here */}
          <p>{JSON.stringify(variantData, null, 2)}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default VariantInfo;
