import React, { useState, useEffect } from 'react';
import GeneInfo from './GeneInfo';
import VariantInfo from './VariantInfo';
import UniprotInfo from './UniprotInfo';
import VClinvarInfo from './VClinvarInfo';
import Publications from './Publications';
// import MolstarViewer from './MolstarViewer';
// import NglViewer from './NglViewer';
import Dropdown from 'components/Common/DropDown';
// import Visualizador from './Visualizador';
// import NglViewer from './NglViewer';
import NGLViewer from './NglViewer2';
// import ProteinViewer from './ViewSequence';
// import DmolViewer from './DmolViewer';
// import PVViewer from './PVViewer';
// import ProteinSequence from './ViewSeq'; 
import { createRoot } from 'react-dom/client';
import ProteinViewer from './ProteinViewer';
import MolecularViewer from './MolecularView';
import PublicationsCopy from './PublicationsCopy';
import ProteinViewerNuevo from './ProteinViewerNuevo';
import ProteinViewerNuevo2 from './ProteinViewerNuevo2';
import ProteinViewerNuevo3 from './ProteinViewerNuevo3';
import ProteinViewerMolstar from './ProteinViewerMolstar';

const genes = ['BRCA1', 'BRCA2', 'TP53']; // Lista acotada de genes
const container = document.getElementById('root');
const root = createRoot(container); // Crear el root con la nueva API

function Master() {
  const [selectedGene, setSelectedGene] = useState('');
  const [geneId, setGeneId] = useState('');
  const [variants, setVariants] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState('');
  const [showTabs, setShowTabs] = useState(false);
  const [showVariantTabs, setShowVariantTabs] = useState(false);
  const [openTab, setOpenTab] = useState(1);

  const activeClasses = 'border-l border-t border-r rounded-t text-blue-700';
  const inactiveClasses = 'text-blue-500 hover:text-blue-700';

  useEffect(() => {
    if (selectedGene) {
      fetchGeneId(selectedGene);
    }
  }, [selectedGene]);

  useEffect(() => {
    if (geneId) {
      fetchVariants(geneId);
      setShowTabs(true);
    }
  }, [geneId]);

  useEffect(() => {
    if (selectedVariant) {
      setShowVariantTabs(true);
    }
  }, [selectedVariant]);

  const fetchGeneId = async (gene) => {
    try {
      const response = await fetch(`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=gene&term=${gene}[Gene%20Name]%20AND%20Homo%20sapiens[Organism]&retmode=json`);
      const data = await response.json();
      setGeneId(data.esearchresult.idlist[0]);
      setOpenTab(1)

    } catch (error) {
      console.error('Error fetching gene ID:', error);
    }
  };

  const fetchVariants = async (geneId) => {
    try {
      const response = await fetch(`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=clinvar&term=(${selectedGene}[Gene%20Name])%20AND%20%22single%20nucleotide%20variant%22[Type%20of%20variation]&RetMax=15000&retmode=json`);
      const data = await response.json();
      setVariants(data.esearchresult.idlist);
    } catch (error) {
      console.error('Error fetching variants:', error);
    }
  };

  return (
    <div className="relative px-6 lg:px-8 pt-0">
            {/* <label>Select a Gene: </label> */}
      <div className="dropdown inline-block relative px-6 lg:px-8 pt-0">
        
       <div className="Gene">
          <Dropdown
            options={genes}
            selectedValue={selectedGene}
            onValueChange={setSelectedGene}
            placeholder="Select a gene..."
            renderOption={(gene) => <span>{gene}</span>}
            renderValue={(gene) => <strong>{gene}</strong>}
          />
        </div>

      </div>

      {variants.length > 0 && (
        <div className="Variants">
          <Dropdown
            options={variants}
            selectedValue={selectedVariant}
            onValueChange={setSelectedVariant}
            placeholder="Select a variant..."
            renderOption={(variants) => <span>{variants}</span>}
            renderValue={(variants) => <strong>{variants}</strong>}
          />
        </div>
      )}
      <div className="p-6">
        <ul className="flex border-b">
            <li className={`${openTab === 1 ? '-mb-px' : ''} mr-1`} onClick={() => setOpenTab(1)}>
              <a
                  href="#"
                  className={`bg-white inline-block py-2 px-4 font-semibold ${openTab === 1 ? activeClasses : inactiveClasses}`}
              >
                  Gene
              </a>
            </li>
            <li className={`${openTab === 2 ? '-mb-px' : ''} mr-1`} onClick={() => setOpenTab(2)}>
              <a
                  href="#"
                  className={`bg-white inline-block py-2 px-4 font-semibold ${openTab === 2 ? activeClasses : inactiveClasses}`}
              >
                  UniProt
              </a>
            </li>
            <li className={`${openTab === 3 ? '-mb-px' : ''} mr-1`} onClick={() => setOpenTab(3)}>
              <a
                  href="#"
                  className={`bg-white inline-block py-2 px-4 font-semibold ${openTab === 3 ? activeClasses : inactiveClasses}`}
              >
                  PubMed
              </a>
            </li>
            <li className={`${openTab === 4 ? '-mb-px' : ''} mr-1`} onClick={() => setOpenTab(4)}>
              <a
                  href="#"
                  className={`bg-white inline-block py-2 px-4 font-semibold ${openTab === 4 ? activeClasses : inactiveClasses}`}
              >
                  ClinVar
              </a>
            </li>
            <li className={`${openTab === 5 ? '-mb-px' : ''} mr-1`} onClick={() => setOpenTab(5)}>
              <a
                  href="#"
                  className={`bg-white inline-block py-2 px-4 font-semibold ${openTab === 5 ? activeClasses : inactiveClasses}`}
              >
                  Viewer
              </a>
            </li>
        </ul>
      <div className="w-full">
        {openTab === 1 && <GeneInfo geneId={geneId} tab={1}/>}
        {openTab === 2 && <UniprotInfo  geneName={selectedGene} tab={2}/>}
        {openTab === 3 && <Publications geneName={selectedGene} tab={3}/>}
        {openTab === 4 && <VClinvarInfo variantId={selectedVariant}/>}
        {/* {openTab === 5 && <ProteinSequence uniprotId= {'P38398'}/> }  */}
        {/* {openTab === 5 && <ProteinViewer pdbIdCanonical='5ly8'/>} */}
        {openTab === 5 && <ProteinViewerNuevo2 proteinCode='5ly8'/>}
        {/* {openTab === 5 && <ProteinViewerMolstar pdbId={'5ly8'}/>} */}
        {/* {openTab === 5 && <ProteinViewerNuevo3 pdbId="1crn" width="800px" height="600px"/>} */}
        {/* {openTab === 5 && <ProteinViewer pdbIdCanonical="1T2U" />} */}
        {/* {openTab === 5 && <MolecularViewer pdbId="1A2B"/>} */}
        
        {/* {openTab === 5 && root.render(
          <React.StrictMode>
            <ProteinViewer uniprotId="P12345" pdbId="1A2B" />
          </React.StrictMode>)
        } */}


        {/* {openTab === 2 && <Tab2 />}
        {openTab === 3 && <Tab3 />} */}
      </div>
    </div>

      {/* {showTabs && (



        <div>
          <div className="tabs">
            <button>Gene Information</button>
            <button>Uniprot Information</button>
          </div>
          <div className="tab-content">
            <GeneInfo geneId={geneId} />
            <UniprotInfo geneName={selectedGene} />
          </div>
        </div>
      )}

      {variants.length > 0 && (
        <div>
          <label>Select a Variant: </label>
          <select value={selectedVariant} onChange={(e) => setSelectedVariant(e.target.value)}>
            <option value="">Select a variant</option>
            {variants.map((variant) => (
              <option key={variant} value={variant}>
                {variant}
              </option>
            ))}
          </select>
        </div>
      )}

      {showVariantTabs && (
        <div>
          <div className="tabs">
            <button>Variant Information</button>
            <button>Clinvar Information</button>
            <button>Publications</button>
          </div>
          <div className="tab-content">
            <VariantInfo variantId={selectedVariant} />
            <ClinvarInfo variantId={selectedVariant} />
            <PublicationsInfo variantId={selectedVariant} />
          </div>
        </div>
      )} */}
    </div>
  );
}

export default Master;
