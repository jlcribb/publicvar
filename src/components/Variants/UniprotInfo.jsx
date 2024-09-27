import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UniprotInfo({ geneName, tab }) {
  const [uniprotData, setUniprotData] = useState();
  // console.log('Nombre del gen 1: ', geneName)
  useEffect(() => {
    const fetchUniprotData = async () => {
      try {
        // console.log('Nombre del gen 2: ', geneName)
        const response = await axios.get(`https://rest.uniprot.org/uniprotkb/search?query=gene:${geneName}+AND+organism_id:9606&format=json`
        );
        const data = await response.data;
        setUniprotData(data.results[0]);
      } catch (error) {
        console.error('Error fetching Uniprot data:', error);
      }
    };
    fetchUniprotData();
  }, [geneName]);

  return (
    <div>
      {/* <h2>Uniprot Information</h2> */}
      {uniprotData ? (
        <div className="w-full">
            <div className="flex flex-col w-full mb-10 sm:flex-row">
                <div className="w-full mb-10 sm:mb-0 sm:w-1/2">
                    <div className="relative h-full ml-0 mr-0 sm:mr-10">
                        <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-green-200 rounded-lg"></span>
                        <div className="relative h-full p-5 bg-white border-2 border-green-200 rounded-lg">
                            <div className="flex items-center -mt-1">
                                <h3 className="my-2 ml-3 text-lg font-bold text-gray-800">
                                UniProt
                                </h3>
                            </div>
                            <p className="mt-3 mb-1 text-xs font-medium text-green-200 uppercase">
                            ------------
                            </p>
                            <div className="mb-2 text-gray-600">
                                UID: {uniprotData.uniProtkbId}
                                <p>First publication: {uniprotData?.entryAudit?.firstPublicDate}</p>
                                <p>Last update: {uniprotData?.entryAudit?.lastAnnotationUpdateDate}</p>
                                <p>Last sequence: {uniprotData?.entryAudit?.lastSequenceUpdateDate}</p>
                                <p>Protein existence: {uniprotData?.proteinExistence}</p>
                                <p>{" "}</p>
                                <ul>
                                    <p className="font-bold text-gray-800">Squence Caution</p>
                                    {uniprotData?.comments?.map((comment, indexSeq) =>(
                                        comment?.commentType === 'SEQUENCE CAUTION' &&
                                        
                                        <li key={indexSeq}>
                                            <ul>
                                                <p>{comment?.sequenceCautionType} ({comment?.sequence}): {comment?.note}</p>
                                            </ul>
                                        </li>
                                    ))}
                                </ul>
                                <ul>
                                    <p className="font-bold text-gray-800">Web Resource</p>
                                    {uniprotData?.comments?.map((comment, indexWeb) =>(
                                        comment?.commentType === 'WEB RESOURCE' &&
                                        
                                        <li key={indexWeb}>
                                            <ul>
                                                {/* <p>{comment?.resourceName}:</p> */}
                                                <a href={comment?.resourceUrl}>{comment?.resourceName}</a>
                                            </ul>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full sm:w-1/2">
                  <div className="relative h-full ml-0 md:mr-10">
                    <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-green-200 rounded-lg"></span>
                    <div className="relative h-full p-5 bg-white border-2 border-green-200 rounded-lg">
                      <div className="flex items-center -mt-1">
                        <h3 className="my-2 ml-3 text-lg font-bold text-gray-800">
                        Uniprot - descripton
                        </h3>
                      </div>
                      <p className="mt-3 mb-1 text-xs font-medium text-green-200 uppercase">
                        ------------
                      </p>
                      <div className="mb-2 text-gray-600">
                        Recomended name : {uniprotData?.proteinDescription?.recommendedName?.fullName?.value}
                        <p>Evidence</p>
                        <ul>
                            {uniprotData?.proteinDescription?.recommendedName?.ecNumbers?.map(
                              (number, indexNu) => (
                                <li key={indexNu}>
                                  <ul>
                                    {number?.evidences?.map((evidence, indexEv) => (
                                      <li key={indexEv}>
                                        <p>
                                          {/* {" "} */}
                                          <p> {evidence.source} - {evidence.id}</p>
                                        </p>
                                      </li>
                                    ))}
                                  </ul>
                                </li>
                              )
                            )}
                        </ul>
                        <p></p>
                        <p>Alternative names</p>
                        <ul>
                            {uniprotData?.proteinDescription?.alternativeNames?.map((alternative, indexAlt) =>(
                                <li key={indexAlt}>
                                    <p>{alternative?.fullName?.value}</p>
                                </li>
                            ))}
                        </ul>

                      </div>
                      <div className="mb-2 text-gray-600">
                      </div>
                      <p className="mb-2 text-gray-600"></p>
                    </div>
                  </div>
                </div>
                
            </div>
            <div className="flex flex-col w-full mb-5 sm:flex-row">
                <div className="w-full mb-10 sm:mb-0 sm:w-1/2">
                  <div className="relative h-full ml-0 mr-0 sm:mr-10">
                    <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-green-400 rounded-lg"></span>
                    <div className="relative h-full p-5 bg-white border-2 border-green-400 rounded-lg">
                      <div className="flex items-center -mt-1">
                        <h3 className="my-2 ml-3 text-lg font-bold text-gray-800">
                          Uniprot - Function
                        </h3>
                      </div>
                      <p className="mt-3 mb-1 text-xs font-medium text-green-400 uppercase">
                        ------------
                      </p>
                      <ul>
                        {uniprotData?.comments?.map((comment, indexCom) =>(
                            comment?.commentType === 'FUNCTION' &&
                            <li key={indexCom}>
                                <ul>
                                    {comment?.texts?.map((text, indexText) =>(
                                        <li key={indexText}>
                                            <p>{text?.value}</p>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                      </ul>
                      <p className="mb-2 text-gray-600"></p>
                    </div>
                  </div>
                </div>
                <div className="w-full mb-10 sm:mb-0 sm:w-1/2">
                  <div className="relative h-full ml-0 mr-0 sm:mr-10">
                    <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-green-400 rounded-lg"></span>
                    <div className="relative h-full p-5 bg-white border-2 border-green-400 rounded-lg">
                      <div className="flex items-center -mt-1">
                        <h3 className="my-2 ml-3 text-lg font-bold text-gray-800">
                        Uniprot - Disease
                        </h3>
                      </div>
                      <p className="mt-3 mb-1 text-xs font-medium text-green-400 uppercase">
                        ------------
                      </p>
                      <p className="mb-2 text-gray-600">
                      <ul>
                        {uniprotData?.comments?.map((comment, indexDis) =>(
                            comment?.commentType === 'DISEASE' &&
                            <li key={indexDis}>
                                
                                <ul>
                                    <p className="font-bold text-gray-800">{comment?.disease?.diseaseId}</p>
                                    
                                    <p>{comment?.disease?.description}</p>
                                    <p>------</p>
                                    
                                </ul>
                                
                            </li>
                        ))}
                      </ul>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-full mb-5 sm:flex-row">
                <div className="w-full mb-10 sm:mb-0 sm:w-1/2">
                  <div className="relative h-full ml-0 mr-0 sm:mr-10">
                    <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-green-700 rounded-lg"></span>
                    <div className="relative h-full p-5 bg-white border-2 border-green-700 rounded-lg">
                      <div className="flex items-center -mt-1">
                        <h3 className="my-2 ml-3 text-lg font-bold text-gray-800">
                          Uniprot - Features
                        </h3>
                      </div>
                      <p className="mt-3 mb-1 text-xs font-medium text-green-700 uppercase">
                        ------------
                      </p>
                      <ul>
                        {uniprotData?.features?.map((feature, indexFea) =>(
                            <li key={indexFea}>
                                <ul>
                                    <p>{feature?.type} -- Start: {feature?.location?.start?.value} End:{feature?.location?.end?.value} Description:{feature?.description}</p>
                                    {feature?.evidences?.map((evidence, indexEv) =>(
                                        <li key={indexEv}>
                                            <p>{"-"}{evidence?.source}({evidence?.id})</p>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                      </ul>
                      <p className="mb-2 text-gray-600"></p>
                    </div>
                  </div>
                </div>
                <div className="w-full mb-10 sm:mb-0 sm:w-1/2">
                  <div className="relative h-full ml-0 mr-0 sm:mr-10">
                    <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-green-700 rounded-lg"></span>
                    <div className="relative h-full p-5 bg-white border-2 border-green-700 rounded-lg">
                      <div className="flex items-center -mt-1">
                        <h3 className="my-2 ml-3 text-lg font-bold text-gray-800">
                        Uniprot - Keywords
                        </h3>
                      </div>
                      <p className="mt-3 mb-1 text-xs font-medium text-green-700 uppercase">
                        ------------
                      </p>
                      <p className="mb-2 text-gray-600">
                      <ul>
                        {uniprotData?.keywords?.map((keyword, indexKey) =>(
                            
                            <li key={indexKey}>
                                <ul>
                                    <p>{keyword?.id} ({keyword.name})-{keyword.category}</p>
                                    
                                    
                                </ul>
                                
                            </li>
                        ))}
                      </ul>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-full mb-5 sm:flex-row">
                <div className="w-full mb-10 sm:mb-0 sm:w-1/2">
                  <div className="relative h-full ml-0 mr-0 sm:mr-10">
                    <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-green-700 rounded-lg"></span>
                    <div className="relative h-full p-5 bg-white border-2 border-green-700 rounded-lg">
                      <div className="flex items-center -mt-1">
                        <h3 className="my-2 ml-3 text-lg font-bold text-gray-800">
                          Uniprot - Database
                        </h3>
                      </div>
                      <p className="mt-3 mb-1 text-xs font-medium text-green-700 uppercase">
                        ------------
                      </p>
                      <ul>
                        {uniprotData?.uniProtKBCrossReferences?.map((database, indexCro) =>(
                            <li key={indexCro}>
                                <ul>
                                    <p>{database?.database} -- Id: {database?.id} </p>
                                    
                                </ul>
                            </li>
                        ))}
                      </ul>
                      <p className="mb-2 text-gray-600"></p>
                    </div>
                  </div>
                </div>
                <div className="w-full mb-10 sm:mb-0 sm:w-1/2">
                  <div className="relative h-full ml-0 mr-0 sm:mr-10">
                    <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-green-700 rounded-lg"></span>
                    <div className="relative h-full p-5 bg-white border-2 border-green-700 rounded-lg">
                      <div className="flex items-center -mt-1">
                        <h3 className="my-2 ml-3 text-lg font-bold text-gray-800">
                        3D Views
                        </h3>
                      </div>
                      <p className="mt-3 mb-1 text-xs font-medium text-green-700 uppercase">
                        ------------
                      </p>
                      <p className="mb-2 text-gray-600">
                      <ul>
                        {uniprotData?.keywords?.map((keyword, indexKey) =>(
                            
                            <li key={indexKey}>
                                <ul>
                                    <p>{keyword?.id} ({keyword.name})-{keyword.category}</p>
                                    
                                    
                                </ul>
                                
                            </li>
                        ))}
                      </ul>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default UniprotInfo;
