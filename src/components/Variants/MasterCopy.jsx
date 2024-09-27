import React, { useState, useEffect } from 'react';
import GeneInfo from './GeneInfo';
import VariantInfo from './VariantInfo';
import UniprotInfo from './UniprotInfo';
import ClinvarInfo from './VClinvarInfo';
import PublicationsInfo from './Publications';

const genes = ['BRCA1', 'BRCA2', 'TP53']; // Lista acotada de genes

function MasterC() {
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
    <div>
      <h1>Gene and Variant Information</h1>
      <label>Select a Gene: </label>
      <select value={selectedGene} onChange={(e) => setSelectedGene(e.target.value)}>
        <option value="">Select a gene</option>
        {genes.map((gene) => (
          <option key={gene} value={gene}>
            {gene}
          </option>
        ))}
      </select>

      {showTabs && (
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
      )}
    </div>
  );
}

export default MasterC;
