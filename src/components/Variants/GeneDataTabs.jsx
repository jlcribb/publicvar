import React, { useState } from 'react';

import DataDisplay from './DataDisplay';

const GeneDataTabs = ({ data }) => {
  const [activeTab, setActiveTab] = useState('chromosome');

  if (!data) {
    return (
      <div className="tabs disabled">
        <div className="tab">Chromosomal Data</div>
        <div className="tab">Genomic Data</div>
      </div>
    );
  }

  return (
    <div className="tabs">
      <div className={`tab ${activeTab === 'chromosome' ? 'active' : ''}`} onClick={() => setActiveTab('chromosome')}>
        Chromosomal Data
      </div>
      <div className={`tab ${activeTab === 'genomic' ? 'active' : ''}`} onClick={() => setActiveTab('genomic')}>
        Genomic Data
      </div>
      <div className={`tab ${activeTab === 'proteomic' ? 'active' : ''}`} onClick={() => setActiveTab('proteomic')}>
        Proteomic Data
      </div>
      <div className={`tab ${activeTab === 'pathology' ? 'active' : ''}`} onClick={() => setActiveTab('pathology')}>
        Associated Pathologies
      </div>
      <div className={`tab ${activeTab === 'publications' ? 'active' : ''}`} onClick={() => setActiveTab('publications')}>
        Scientific Publications
      </div>

      <div className="tab-content">
        {activeTab === 'chromosome' && <DataDisplay data={data.chromosomal} />}
        {activeTab === 'genomic' && <DataDisplay data={data.genomic} />}
        {activeTab === 'proteomic' && <DataDisplay data={data.proteomic} />}
        {activeTab === 'pathology' && <DataDisplay data={data.pathologies} />}
        {activeTab === 'publications' && <DataDisplay data={data.publications} />}
      </div>
    </div>
  );
};

export default GeneDataTabs;
