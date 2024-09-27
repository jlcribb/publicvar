import React, { useState } from 'react';
import DataDisplay from './DataDisplay';

const VariantDataTabs = ({ data }) => {
  const [activeTab, setActiveTab] = useState('molecularChanges');

  return (
    <div className="tabs">
      <div className={`tab ${activeTab === 'molecularChanges' ? 'active' : ''}`} onClick={() => setActiveTab('molecularChanges')}>
        Molecular Changes
      </div>
      <div className={`tab ${activeTab === 'proteinAlterations' ? 'active' : ''}`} onClick={() => setActiveTab('proteinAlterations')}>
        Protein Alterations
      </div>
      <div className={`tab ${activeTab === 'clinicalConsequences' ? 'active' : ''}`} onClick={() => setActiveTab('clinicalConsequences')}>
        Clinical Consequences
      </div>
      <div className={`tab ${activeTab === 'caseCitations' ? 'active' : ''}`} onClick={() => setActiveTab('caseCitations')}>
        Case Citations
      </div>
      <div className={`tab ${activeTab === 'therapeutics' ? 'active' : ''}`} onClick={() => setActiveTab('therapeutics')}>
        Recommended Therapeutics
      </div>
      <div className={`tab ${activeTab === 'variantPublications' ? 'active' : ''}`} onClick={() => setActiveTab('variantPublications')}>
        Variant Publications
      </div>

      <div className="tab-content">
        {activeTab === 'molecularChanges' && <DataDisplay data={data.molecularChanges} />}
        {activeTab === 'proteinAlterations' && <DataDisplay data={data.proteinAlterations} />}
        {activeTab === 'clinicalConsequences' && <DataDisplay data={data.clinicalConsequences} />}
        {activeTab === 'caseCitations' && <DataDisplay data={data.caseCitations} />}
        {activeTab === 'therapeutics' && <DataDisplay data={data.therapeutics} />}
        {activeTab === 'variantPublications' && <DataDisplay data={data.variantPublications} />}
      </div>
    </div>
  );
};

export default VariantDataTabs;
