import { BrowserRouter as Router, Route, Routes, useLocation} from 'react-router-dom'
import { Helmet, HelmetProvider} from 'react-helmet-async'
import AnimatedRoutes from 'Routes';

function App() {
  
  return (
    <HelmetProvider>
      <Helmet>
        <title>Public-Var</title>
        <meta name='description' content='Sitio de variantes genéticas de Salud Pública'/>
        <meta name='keywords' content='variantes genéticas, genómica, variantes genómicas, variantes génicas'/>
        <meta name='robots' content='all'/>
        <meta name='author' content='José Luis Cribb Libardi'/>
        <meta name='publisher' content='IGeHM-CeNaGeM'/>
        <meta property='og:title' content={'Public-Var'}/>
        <meta property='og:description' content='Sitio de variantes genéticas de Salud Pública'/>
        <meta property='og:url' content='https://www.publicvar.com'/>
        <meta property='og:image' content=''/>
        <link rel='canonical' href='https://www.publicvar.com'/>
      </Helmet>
      <Router>
        <AnimatedRoutes/>
      </Router>

    </HelmetProvider>
    
  );
}

export default App;
