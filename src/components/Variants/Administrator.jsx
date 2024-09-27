import React, { useState, useEffect } from 'react';
import TabComponent from './TabComponent';
import DataComponent1 from './DataComponent1';
import DataComponent2 from './DataComponent2';
import DataComponent3 from './DataComponent3';
// import { select } from 'd3-selection';
// import { fetchData1, fetchData2, fetchData3 } from './api';

const genesOptions = ["BRCA1", "BRCA2", "PTPN11", 'SPTA1'];

const Administrator = () => {
//   const [selectedOption1, setSelectedOption1] = useState(null);
//   const [selectedOption2, setSelectedOption2] = useState(null);
  const [data1, setData1] = useState(null);
  const [data2, setData2] = useState(null);
  const [data3, setData3] = useState(null);

  const [selectedGene, setSelectedGene] = useState("");
  const [apiVariants, setApiVariants] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState("");
  const [apiVariant, setApiVariant] = useState({
    uid: "",
    obj_type: "",
    accession: "",
    title: "",
    protein_change: "",
    // geneid: "",
    symbol: "",
    strand: "",
    source: "",
    variation_set: [],
    cdna_change: "",
    variation_loc: [],
    assembly_name: "",
    chr: "",
    band: "",
    start: "",
    stop: "",
    germline_classification: "",
    description: "",
    last_evaluated: "",
    review_status: "",
    trait_set: [],
    trait_xrefs: [],

    db_source: "",
    db_id: "",
    trait_name: "",
    variation_name: "",
    display_start: "",
    display_stop: "",
    assembly_acc_ver: '',
    genes: [],
    geneid: "",
    molecular_consequence_list: [],

    oncogenicity_classification: "",
  }); // JSON con 3 niveles
  const [apiGene, setApiGene] = useState({
    description: "",
    otheraliases: "",
    otherdesignations: "",
    summary: "",
  });


  useEffect(() => {
    //   fetchData1(selectedOption1).then((result) => setData1(result));
    const fetchVariants = async () => {
        if (selectedGene) {
          try {
            const responseGen = await fetch(`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=gene&term=${selectedGene}[Gene%20Name]%20AND%20Homo%20sapiens[Organism]&retmode=json`)

            const dataGen = await responseGen.json()
            dataGen.result[selectedGene].esearchresult.list.forEach(async (geneid)=>{
                try {
                    // console.log(dato.geneid)
                  const responseAPI2 = await fetch(`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=gene&id=${geneid}&retmode=json`);
                  const dataAPI2 = await responseAPI2.json();
                  setApiGene(dataAPI2.result[geneid])
        
                //   console.log(dataAPI2);
                } catch (error) {
                  console.error('Error fetching data from GENE:', error);
                }
              });

            const response = await fetch(
              `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=clinvar&term=(${selectedGene}[Gene%20Name])%20AND%20%22single%20nucleotide%20variant%22[Type%20of%20variation]&RetMax=15000&retmode=json`
            );
            const data = await response.json();
            //   console.log("data ", data.esearchresult.idlist);
            //   setVariants(data.variants);
            setApiVariants(data.esearchresult.idlist);
          } catch (error) {
            console.error("Error fetching CLINVAR Variantes:", error);
          }
        
        }
      };
      fetchVariants();
    }, [selectedGene]);

  useEffect(() => {
    //   fetchData2(selectedOption2).then((result) => setData2(result));
    const fetchVariant = async () => {
        if (selectedVariant) {
          try {
            const response = await fetch(
              `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=clinvar&id=${selectedVariant}&retmode=json`
            );
            const data = await response.json();
            setApiVariant(data.result[selectedVariant]);
            
          } catch (error) {
            console.error("Error fetching data from CLINVAR Variante:", error);
          }
        }
      };
  
      fetchVariant();
  
  }, [selectedVariant]);

  const handleSelectGene = (event) => {
    setSelectedGene(event.target.value);
  };

  const handleSelectVariant = (event) => {
    setSelectedVariant(event.target.value);
  };

  return (
    <div>
        <label htmlFor="genes">Select a gene:</label>
        <select id="genes" value={selectedGene} onChange={handleSelectGene}>
          <option value="">Select...</option>
          {genesOptions.map((gene) => (
            <option key={gene} value={gene}>
              {gene}
            </option>
          ))}
        </select>

        <label htmlFor="variants">Select a variant:</label>
        <select
          id="variants"
          value={selectedVariant}
          onChange={handleSelectVariant}
        >
          <option value="">Select...</option>
          {apiVariants.map((variant, index) => (
            <option key={index} value={variant}>
              {variant}
            </option>
          ))}
        </select>

      <TabComponent>
        <DataComponent1 data={data1} />
        <DataComponent2 data={data2} />
        {/*selectedOption2 && <DataComponent3 data={data3} />*/}
      </TabComponent>
    </div>
  );
};

export default Administrator;
