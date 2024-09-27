import React from 'react';

const DataDisplay = ({ data }) => {
  if (!data) {
    return <div>No data available</div>;
  }

  return (
    <div>
      {Object.entries(data).map(([key, value]) => (
        <div key={key}>
          <h3>{key}</h3>
          <p>{value}</p>
        </div>
      ))}
    </div>
  );
};

export default DataDisplay;
