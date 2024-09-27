import React, { useState, useEffect } from 'react';

function VClinvarInfo({ variantId }) {
  const [vclinvarData, vsetClinvarData] = useState();

  useEffect(() => {
    const fetchClinvarData = async () => {
      try {
        const response = await fetch(`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=clinvar&id=${variantId}&retmode=json`);
        const data = await response.json();
        vsetClinvarData(data.result[variantId]);
      } catch (error) {
        console.error('Error fetching Clinvar data:', error);
      }
    };

    fetchClinvarData();
  }, [variantId]);

  return (
    <div>
      {/* <h2>Clinvar Information</h2> */}

      {vclinvarData ? (
          <div className="container relative flex flex-col justify-between h-full max-w-6xl px-10 mx-auto xl:px-0 mt-5">
            <h2 className="mb-1 text-3xl font-extrabold leading-tight text-gray-900">
              {/* {api2Data?.variation_set[0]?.variation_name} */}
              {vclinvarData.title}
            </h2>
            <h2 className="mb-1 text-3xl font-extrabold leading-tight text-gray-300">
              {vclinvarData?.germline_classification.description}
            </h2>
            
            <div className="w-full">
              <div className="flex flex-col w-full mb-10 sm:flex-row">
                <div className="w-full mb-10 sm:mb-0 sm:w-1/2">
                  <div className="relative h-full ml-0 mr-0 sm:mr-10">
                    <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-indigo-500 rounded-lg"></span>
                    <div className="relative h-full p-5 bg-white border-2 border-indigo-500 rounded-lg">
                      <div className="flex items-center -mt-1">
                        <h3 className="my-2 ml-3 text-lg font-bold text-gray-800">
                        Genomic analysis
                        </h3>
                      </div>
                      <p className="mt-3 mb-1 text-xs font-medium text-indigo-500 uppercase">
                        ------------
                      </p>
                      <div className="mb-2 text-gray-600">
                        UID: {vclinvarData.uid}
                      </div>
                      <div className="mb-2 text-gray-600">
                        {/* Título: {formData.title} */}
                        Tipo: {vclinvarData.obj_type}
                      </div>
                      <div className="mb-2 text-gray-600">
                        {/* {api2Data?.variation_set[0].cdna_change} */}
                        <ul>
                          {vclinvarData?.variation_set.map((variation, index) => (
                            <li key={index}>
                              <p>cDNA Change: {variation.cdna_change}</p>
                            </li>
                          ))}
                        </ul>
                        <ul>
                          {vclinvarData?.variation_set?.map((set, indexTr) => (
                            <li key={indexTr}>
                              <ul>
                                {set.variation_loc?.map((loc, indexLoc) => (
                                  <div key={indexLoc}>
                                    <p>
                                      {" "}
                                      Assembly name: {loc.assembly_name} - Chr:{" "}
                                      {loc.chr} - Band: {loc.band} - Display start: {loc.display_start} - Display stop: {loc.display_stop} - Assembly_acc_ver: {loc.assembly_acc_ver} 
                                    </p>
                                  </div>
                                ))}
                              </ul>
                              <ul>
                                {set.variation_xrefs?.map((ref, indexRef) =>(
                                  <div key={indexRef}>
                                    <p>
                                      {' '}
                                      {ref.db_source}: {ref.db_id}
                                    </p>
                                  </div>
                                ))}
                              </ul>
                            </li>
                          ))}
                        </ul>
                        <ul>
                          {vclinvarData?.genes.map((gene, index) => (
                            <li key={index}>
                              <p>DB Gene: {gene.geneid}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full sm:w-1/2">
                  <div className="relative h-full ml-0 md:mr-10">
                    <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-purple-500 rounded-lg"></span>
                    <div className="relative h-full p-5 bg-white border-2 border-purple-500 rounded-lg">
                      <div className="flex items-center -mt-1">
                        <h3 className="my-2 ml-3 text-lg font-bold text-gray-800">
                        Related diseases
                        </h3>
                      </div>
                      <p className="mt-3 mb-1 text-xs font-medium text-purple-500 uppercase">
                        ------------
                      </p>
                      <div className="mb-2 text-gray-600">
                        {/* {api2Data?.germline_classification?.trait_set[0]
                        ?.trait_name || ""} */}

                        <ul>
                          {vclinvarData?.germline_classification?.trait_set?.map(
                            (traitset, indexTr) => (
                              <li key={indexTr}>
                                <p> Nombre: {traitset.trait_name}</p>
                              </li>
                            )
                          )}
                        </ul>

                        <p className="mt-3 mb-1 text-xs font-medium text-purple-500 uppercase">
                          ----
                        </p>
                        <div>
                          
                          <ul>
                            {vclinvarData?.germline_classification?.trait_set?.map(
                              (set, indexTr) => (
                                <li key={indexTr}>
                                  <ul>
                                    {set.trait_xrefs?.map((xref, indexRf) => (
                                      <li key={indexRf}>
                                        <p>
                                          {" "}
                                          Source: {xref.db_source} - ID:{" "}
                                          {xref.db_id}{" "}
                                        </p>
                                      </li>
                                    ))}
                                  </ul>
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                        <p className="mt-3 mb-1 text-xs font-medium text-purple-500 uppercase">
                          ----
                        </p>
                        <p>
                          Last evaluated:
                          {vclinvarData?.germline_classification?.last_evaluated}
                        </p>
                        <p>
                          Review status:
                          {vclinvarData?.germline_classification?.review_status}
                        </p>
                      </div>
                      <p className="mb-2 text-gray-600"></p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-full mb-5 sm:flex-row">
                <div className="w-full mb-10 sm:mb-0 sm:w-1/2">
                  <div className="relative h-full ml-0 mr-0 sm:mr-10">
                    <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-blue-400 rounded-lg"></span>
                    <div className="relative h-full p-5 bg-white border-2 border-blue-400 rounded-lg">
                      <div className="flex items-center -mt-1">
                        <h3 className="my-2 ml-3 text-lg font-bold text-gray-800">
                          Molecular consequence
                        </h3>
                      </div>
                      <p className="mt-3 mb-1 text-xs font-medium text-blue-400 uppercase">
                        ------------
                      </p>
                      {/* <div>
                      {api2Data?.molecular_consequence_list?.map(
                        (molcon, index) => (
                          <div key={index}>
                            <p>{molcon}</p>
                          </div>
                        )
                      )}
                    </div> */}
                      <ul>
                        {vclinvarData?.molecular_consequence_list.map(
                          (molcon, index) => (
                            <li key={index}>
                              <p>{molcon}</p>
                            </li>
                          )
                        )}
                      </ul>

                      <p className="mb-2 text-gray-600"></p>
                    </div>
                  </div>
                </div>
                <div className="w-full mb-10 sm:mb-0 sm:w-1/2">
                  <div className="relative h-full ml-0 mr-0 sm:mr-10">
                    <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-yellow-400 rounded-lg"></span>
                    <div className="relative h-full p-5 bg-white border-2 border-yellow-400 rounded-lg">
                      <div className="flex items-center -mt-1">
                        <h3 className="my-2 ml-3 text-lg font-bold text-gray-800">
                        Protein change
                        </h3>
                      </div>
                      <p className="mt-3 mb-1 text-xs font-medium text-yellow-400 uppercase">
                        ------------
                      </p>
                      <p className="mb-2 text-gray-600">
                        {vclinvarData?.protein_change}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Mostrar un mensaje de carga mientras se obtienen los datos
          <p>Loading...</p>
        )}



    </div>
  );
}

export default VClinvarInfo;
