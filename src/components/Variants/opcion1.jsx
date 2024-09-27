import { useState, useEffect } from 'react';
import axios from 'axios';

const ArticleList = ({ articles }) => {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [abstract, setAbstract] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAbstract = async () => {
      if (selectedArticle) {
        setLoading(true);
        try {
          const response = await axios.get(
            `https://api.example.com/getAbstract?id=${selectedArticle.id}`
          );
          setAbstract(response.data.abstract); // Ajusta según la estructura de la respuesta
        } catch (error) {
          console.error("Error fetching the abstract:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchAbstract();
  }, [selectedArticle]);

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
              {article.authors.join(', ')}
            </p>
          </div>
        ))}
      </div>

      {/* Columna para visualizar el abstract */}
      <div className="flex-1 p-4 border-l border-gray-300">
        {loading ? (
          <p className="text-gray-500">Cargando abstract...</p>
        ) : selectedArticle ? (
          <div>
            <h2 className="text-2xl font-bold mb-4">{selectedArticle.title}</h2>
            <p>{abstract}</p>
          </div>
        ) : (
          <p className="text-gray-500">Selecciona un artículo para ver el abstract.</p>
        )}
      </div>
    </div>
  );
};

export default ArticleList;
