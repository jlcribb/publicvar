import React, { useState, useEffect } from "react";
import axios from "axios";
import { XMLParser } from "fast-xml-parser";

function Publications({ geneName }) {
  const [codes, setCodes] = useState([]);
  const [articles, setArticles] = useState([]);
  const [abstract, setAbstract] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesDisplay, setArticlesDisplay] = useState();
  const [loading, setLoading] = useState(true);
  const [selectedAbstract, setSelectedAbstract] = useState(null);

  const [selectedArticle, setSelectedArticle] = useState(null);
  // const [abstract, setAbstract] = useState('');

  const articlesPerPage = 10;
  const maxArticles = 50;

  const handleTitleClick = (abstract) => {
    setSelectedAbstract(abstract);
  };
  // useEffect(() => {});
  useEffect(() => {
    const fetchPubData = async () => {
      // const code = '39123460'
      try {
        const response = await axios.get(
          `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=(${geneName}[Title/Abstract]%20AND%20%22review%22[Publication%20Type])%20AND%20(%222019/01/01%22[Date%20-%20Publication]%20:%20%223000%22[Date%20-%20Publication])&RetMax=50&retmode=json`
        );
        const data = await response.data;
        const codesList = data.esearchresult.idlist;
        setCodes(codesList);
      } catch (error) {
        console.error("Error fetching publications data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPubData();
  }, [geneName]);

  useEffect(() => {
    const startIndex = currentPage * articlesPerPage;
    const endIndex = startIndex + articlesPerPage;
    const fetchArticles = async () => {
      const articlesData = [];

      const codesList = codes.slice(startIndex, endIndex);

      for (const code of codesList) {
        const authorResponse = await axios.get(
          `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&api_key=4a1aa3b9cb7a4ff5c085d65b2caf5703d709&id=${code}&retmode=json`
        );
        const data = await authorResponse.data;

        articlesData.push({
          code: code,
          pubdate: data.result[code].pubdate,
          epubdate: data.result[code].epubdate,
          source: data.result[code].source,
          // authors: data.result[code].authors
          //   .map((author) => author.name)
          //   .join(", "),
          title: data.result[code].title,
          nlmuniqueid: data.result[code].nlmuniqueid,
          issn: data.result[code].issn,
          essn: data.result[code].essn,
          pubtype: data.result[code].pubtype,
          recordstatus: data.result[code].recordstatus,
          pubstatus: data.result[code].pubstatus,
          // articleids: data.result[code].articleids
          //   .map((article) => `${article.idtype} ${": "} (${article.value})`)
          //   .join(", "),
          fulljournalname: data.result[code].fulljournalname,
          elocationid: data.result[code].elocationid,
        });
        // console.log(articlesData)
      }
      setArticles(articlesData);
    };
    fetchArticles();
  }, [currentPage, codes]);

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
          const xmlData = await abstractResponse.data;
          const parser = new XMLParser();
          const result = await parser.parse(xmlData);
          // console.log("aca: ", result);

          let abstractText = await result.PubmedArticleSet.PubmedArticle
            .MedlineCitation.Article.Abstract.AbstractText;
          if (typeof abstractText !== "string") {
            console.error(
              "Expected abstract to be a string but got:",
              typeof abstractText
            );
            abstractText = JSON.stringify(abstractText)
          }

          setAbstract(await abstractText); // Ajusta según la estructura de la respuesta
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

  const handleNext = () => {
    if ((currentPage + 1) * articlesPerPage < maxArticles) {
      setCurrentPage((prev) => prev + 1);
      setAbstract("");
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
      setAbstract("");
    }
  };

  return (
    <div className="flex">
      <div className="flex flex-col h-screen">
        {/* Botones de navegación */}
        <div className="flex justify-between p-4 bg-gray-200 dark:bg-gray-800">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 0}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Anteriores
          </button>
          <button
            onClick={handleNext}
            disabled={(currentPage + 1) * articlesPerPage >= maxArticles}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Siguientes
          </button>
        </div>

        <div className="flex flex-grow overflow-hidden">
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
                  {/* {article.authors} */}
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
          <div className="flex flex-col w-1/3 p-4 border-l overflow-y-auto border-gray-300 ">
            {loading ? (
              <p className="text-gray-500">Cargando abstract...</p>
            ) : selectedArticle && abstract ? (
              <div>
                <h2 className="text-xl font-bold mb-4">
                  {selectedArticle.title}
                </h2>
                <p>
                  {abstract
                    ? abstract
                    : "Selecciona el artículo para ver el abstract"}
                </p>
              </div>
            ) : (
              <p className="text-gray-500">
                Selecciona un artículo para ver el abstract.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Publications;
