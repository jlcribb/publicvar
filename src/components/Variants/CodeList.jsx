import React, { useState, useEffect } from "react";
import axios from "axios";

const CodeList = ({ geneName, onCodesFetched, tab }) => {
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(0);
    console.log('antes de todo ', geneName, ' ', tab)
  useEffect(() => {
    console.log('primera parada ', geneName, ' ', tab)
    const fetchPubData = async () => {
        console.log('CodeList', tab)
      if (tab) {
        console.log("entra ", geneName);
        try {
          const response = await axios.get(
            `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=(${geneName}[Title/Abstract]%20AND%20%22review%22[Publication%20Type])%20AND%20(%222019/01/01%22[Date%20-%20Publication]%20:%20%223000%22[Date%20-%20Publication])&RetMax=20&retmode=json`
          );
          const data = await response.data;
          const codesList = data.esearchresult.idlist;
          onCodesFetched(codesList); // Pasa la lista de códigos al componente padre
        } catch (error) {
          console.error("Error fetching publications data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchPubData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return null;
};

export default CodeList;
