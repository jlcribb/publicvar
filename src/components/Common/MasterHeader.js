import { Helmet, HelmetProvider} from 'react-helmet-async'

export default function MasterHeader({page, description, menu}){
    return(
        <main>
        <HelmetProvider>
          <Helmet>
            <title>{menu}</title>
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
          <div className="relative px-6 lg:px-8 pt-0">
            <div className="mx-auto max-w-full xl:mx-12 xl:pt-0 lg:pt-0 lg:pb-0">
            {/* <div className="mx-auto max-w-3xl pt-20 pb-32 sm:pt-10 sm:pb-40"> */}
              <div>
                <div>
                  <h1 className="text-4xl font-semibold tracking-tight pb-8 sm:text-left sm:text-full">
                    {page}
                  </h1>
                  <p className="mt-2 text-xl leading-2 text-black max-w-5xl">
                    {description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </HelmetProvider>
      </main>

    )
}