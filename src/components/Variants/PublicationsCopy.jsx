import React, { useState, useEffect } from "react";
import axios from "axios";
import { XMLParser } from "fast-xml-parser";

function PublicationsCopy({ geneName }) {
  const [codes, setCodes] = useState([]);
  const [articles, setArticles] = useState([]);
  const [abstract, setAbstract] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAbstract, setSelectedAbstract] = useState(null);

  const [selectedArticle, setSelectedArticle] = useState(null);
  // const [abstract, setAbstract] = useState('');

  // Este código queda de reserva, funciona bien

  
  const handleTitleClick = (abstract) => {
    setSelectedAbstract(abstract);
  };

  useEffect(() => {
    const fetchPubData = async () => {
      // const code = '39123460'
      try {
        const response = await axios.get(
          `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=(${geneName}[Title/Abstract]%20AND%20%22review%22[Publication%20Type])%20AND%20(%222019/01/01%22[Date%20-%20Publication]%20:%20%223000%22[Date%20-%20Publication])&RetMax=10&retmode=json`
        );
        const data = await response.data;
        const codesList = data.esearchresult.idlist;
        setCodes(codesList);
        const articlesData = [];
        const abstractData = [];

        for (const code of codesList) {
          const authorResponse = await axios.get(
            `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&api_key=4a1aa3b9cb7a4ff5c085d65b2caf5703d709&id=${code}&retmode=json`
          );
          const data = await authorResponse.data;
          // const data = await authorResponse.json()
          // const articleId = data.result.uids[0]; // "38757340"
          // const authorsList = data.result[articleId].authors;

          articlesData.push({
            code: code,
            pubdate: data.result[code].pubdate,
            epubdate: data.result[code].epubdate,
            source: data.result[code].source,
            authors: data.result[code].authors
              .map((author) => author.name)
              .join(", "),
            title: data.result[code].title,
            nlmuniqueid: data.result[code].nlmuniqueid,
            issn: data.result[code].issn,
            essn: data.result[code].essn,
            pubtype: data.result[code].pubtype,
            recordstatus: data.result[code].recordstatus,
            pubstatus: data.result[code].pubstatus,
            articleids: data.result[code].articleids
              .map((article) => `${article.idtype} ${": "} (${article.value})`)
              .join(", "),
            fulljournalname: data.result[code].fulljournalname,
            elocationid: data.result[code].elocationid,
          });
          // console.log(articlesData)
          const abstractResponse = await axios.get(
            `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=${code}&retmode=xml`,
            { headers: { "Content-Type": "application/xml" } }
          );
          const xmlData = abstractResponse.data;
          const parser = new XMLParser();
          const result = parser.parse(xmlData);

          const abstractText =
            result.PubmedArticleSet.PubmedArticle.MedlineCitation.Article
              .Abstract.AbstractText;
          setAbstract(abstractText);
          // console.log(abstractText)
        }
        console.log("1 ", articlesData);
        setArticles(articlesData);
        console.log("2 ", articles);
        setAbstract(abstractData);
      } catch (error) {
        console.error("Error fetching publications data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPubData();
  }, [geneName]);

  useEffect(() => {
    const fetchAbstract = async () => {
      if (selectedArticle) {
        console.log(selectedArticle);
        setLoading(true);
        try {
          const abstractResponse = await axios.get(
            `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=${selectedArticle.code}&retmode=xml`,
            { headers: { "Content-Type": "application/xml" } }
          );
          const xmlData = abstractResponse.data;
          const parser = new XMLParser();
          const result = parser.parse(xmlData);
          console.log("aca: ", result);

          const abstractText =
            result.PubmedArticleSet.PubmedArticle.MedlineCitation.Article
              .Abstract.AbstractText;
          setAbstract(abstractText); // Ajusta según la estructura de la respuesta
          console.log(abstractText);
        } catch (error) {
          console.error("Error fetching the abstract:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchAbstract();
  }, [selectedArticle]);

  // return (
  //   <div>
  //     {articles ? (
  //       <div className="h-screen w-full dark:bg-gray-800 flex">
  //         {/* Lista de artículos */}
  //         <section className="flex flex-col justify-center max-w-7xl px-4 py-10 mx-auto sm:px-6 w-2/3">
  //           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-1">
  //             <div className="overflow-y-auto h-96 p-4 flex flex-col justify-between gap-2 border rounded-lg shadow-md bg-white dark:bg-gray-700 dark:border-gray-400/40">
  //               {articles.map((article, index) => (
  //                 <div
  //                   key={index}
  //                   className="p-4 flex flex-col justify-between gap-2 border rounded-lg shadow-md bg-white dark:bg-gray-700 dark:border-gray-400/40"
  //                 >
  //                   <a
  //                     className="text-xl font-semibold text-blue-700 hover:underline dark:text-blue-100"
  //                     href="#"
  //                     onClick={() => handleTitleClick(article.abstract)}
  //                   >
  //                     {article.title}
  //                   </a>

  //                   <div className="text-gray-900 dark:text-gray-600 font-bold">
  //                     {article.authors}
  //                   </div>
  //                   <div className="text-gray-900 dark:text-gray-600">
  //                     {article.pubdate} {" - e:"} {article.pubdate}
  //                   </div>
  //                   <div className="text-gray-700 dark:text-gray-400">
  //                     {article.articleids}
  //                   </div>
  //                   <div className="text-gray-400 dark:text-gray-100">
  //                     {article.pubtype}
  //                   </div>
  //                 </div>
  //               ))}
  //             </div>
  //           </div>
  //         </section>

  //         {/* Columna para visualizar el abstract seleccionado */}
  //         {/* {selectedAbstract && (
  //     <section className="w-1/3 p-4 border-l dark:border-gray-600">
  //       <h2 className="mb-6 text-2xl font-bold text-gray-900 md:text-3xl dark:text-white">
  //         Abstract
  //       </h2>
  //       <p className="text-gray-800 dark:text-gray-300">{selectedAbstract}</p>
  //     </section>
  //   )} */}
  //       </div>
  //     ) : (
  //       <p>Loading...</p>
  //     )}
  //   </div>
  // );

  return (
    <div className="flex">
      {/* Área de visualización con dos columnas y scroll */}
      <div className="grid grid-cols-2 gap-4 h-screen overflow-y-scroll p-4 w-2/3">
        {articles.map((article, index) => (
          <div
            key={index}
            className="p-4 border rounded-lg shadow-md bg-white dark:bg-gray-700 dark:border-gray-400/40 cursor-pointer"
            onClick={() => setSelectedArticle(article)}
          >
            <h3 className="text-xl font-semibold text-blue-700 hover:underline dark:text-blue-100">
              {article.title}
            </h3>
            <p className="text-gray-900 dark:text-gray-600 font-bold">
              {article.authors}
            </p>

            <div className="text-gray-900 dark:text-gray-600">
              {article.pubdate} {" - e:"} {article.pubdate}
            </div>
            <div className="text-gray-700 dark:text-gray-400">
              {article.articleids}
            </div>
            <div className="text-gray-400 dark:text-gray-100">
              {article.pubtype}
            </div>
          </div>
        ))}
      </div>

      {/* Columna para visualizar el abstract */}
      <div className="flex-1 p-4 border-l border-gray-300">
        {selectedArticle ? (
          <div>
            <h2 className="text-2xl font-bold mb-4">{selectedArticle.title}</h2>
            <p>{abstract}</p>
          </div>
        ) : (
          <p className="text-gray-500">
            Selecciona un artículo para ver el abstract.
          </p>
        )}
      </div>
    </div>
  );
}

export default PublicationsCopy;
