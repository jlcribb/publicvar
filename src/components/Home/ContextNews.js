const posts = [
    {
      title: 'Red Federal de Genómica y Bioinformática',
      href: '#',
      category: { name: 'Noticia', href: '' },
      description:
        'Recientemente se reportó una variante relacionada con el Síndrome de SINGAP1. La variante fue detectada y clasificada como Probablemente Patogénica en el marco de la RFGB',
      date: '',
      datetime: '',
      eventImg:
        'https://www.frontiersin.org/files/Articles/151587/fncel-10-00032-HTML-r1/image_m/fncel-10-00032-g003.jpg',
      readingTime: '1/2 min read',
      
      authorName: 'Marcelo Gamarra',
      authorHref: 'https://www.linkedin.com/in/marcelogamarraok/?originalSubdomain=ar',
      authorImg:  'Marcelo.jpg',
      
    },
    {
      title: 'La Bioinformática Estructural como Herramienta Complementaria para el Diagnóstico y Tratamiento de Enfermedades de base Genética',
      href: '#',
      category: { name: 'Divulgación científica', href: 'https://www.fceqyn.unam.edu.ar/recyt/index.php/recyt/article/view/795' },
      description:
        'La medicina personalizada, basada en la genética individual, ha avanzado gracias a la comprensión del genoma humano y al crecimiento exponencial de los datos biológicos recientes',
      date: 'Feb 07, 2024',
      datetime: '2024-02-07',
      eventImg:
        'https://www.fceqyn.unam.edu.ar/recyt/public/journals/1/cover_issue_64_es_ES.png',
      readingTime: '4 min read',
      
      authorName: 'Carlos Modenutti',
      authorHref: 'https://www.linkedin.com/in/carlos-modenutti-92921062/',
      authorImg:
        'https://pbs.twimg.com/profile_images/842695408392507392/gvuB0duw_400x400.jpg',
      
    },
    {
      title: 'JIS Summit 2024',
      href: 'https://www.hospitalitaliano.org.ar/#!/home/jornadasdis/noticia/603802',
      category: { name: 'Jornada', href: '#' },
      description:
        'Explorando los horizontes de la salud digital, las Jornadas de Informática en Salud del Hospital Italiano de Buenos Aires regresan con un enfoque híbrido, fusionando lo presencial y lo virtual para ofrecer un intercambio de conocimientos',
      date: 'Oct 02, 2024',
      datetime: '2024-10-02',
      eventImg:
        'JIS2024.jpg',
      readingTime: '08-18 hs',
      authorName: 'Hospital Italiano - Buenos Aires',
      authorHref: 'https://www.hospitalitaliano.org.ar/#!/home/principal',
      authorImg:
        'https://upload.wikimedia.org/wikipedia/commons/c/c3/Hosp_italiano_logo.png',
    },
  ]

  const ScientificCard = ({category, title, href, description, date, datetime, eventImg, readingTime, authorName, authorHref, authorImg}) =>{
    const getImageSource = (imagePath) =>{
      if (imagePath.startsWith('http://') || imagePath.startsWith('https://')){
        return imagePath;
      } else {
        return require(`../../../src/assets/img/${imagePath}`)
      }
    }
    return (
      // <div className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
      <div key={title} className="flex flex-col overflow-hidden rounded-lg shadow-lg">
        <div className="flex-shrink-0">
          <img className="h-48 w-full object-cover" src={getImageSource(eventImg)} alt="Imagen del evento" />
        </div>
        <div className="flex flex-1 flex-col justify-between bg-white p-6">
          <div className="flex-1">
            <p className="text-sm font-medium text-indigo-600">
              <a href={category.href} className="hover:underline">
                {category.name}
              </a>
            </p>
            <a href={href} className="mt-2 block">
              <p className="text-xl font-semibold text-gray-900">{title}</p>
              <p className="mt-3 text-base text-gray-500">{description}</p>
            </a>
          </div>
          <div className="mt-6 flex items-center">
            <div className="flex-shrink-0">
              <a href={authorHref}>
                <span className="sr-only">{authorName}</span>
                <img className="h-10 w-10 rounded-full" src={getImageSource(authorImg)} alt="Imagen ndel autor" />
              </a>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">
                <a href={authorHref} className="hover:underline">
                  {authorName}
                </a>
              </p>
              <div className="flex space-x-1 text-sm text-gray-500">
                <time dateTime={datetime}>{date}</time>
                <span aria-hidden="true">&middot;</span>
                <span>{readingTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      // </div>
    )

  }
  
  export default function ContextNews() {
    return(
      <div className="relative bg-gray-50 px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-24 lg:pb-28">
        <div className="absolute inset-0">
          <div className="h-1/3 bg-white sm:h-2/3" />
        </div>
        <div className="relative mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Contexto y novedades</h2>
            <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-500 sm:mt-4">
              Damos a conocer casos de éxito en el intercambio de información
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
              {posts.map((post, index) =>(
                <ScientificCard
                  key={index}
                  category={post.category}
                  title={post.title}
                  href={post.href}
                  description={post.description}
                  date={post.date}
                  datetime={post.datetime}
                  eventImg={post.eventImg}
                  readingTime={post.readingTime}
                  authorName={post.authorName}
                  authorHref={post.authorHref}
                  authorImg={post.authorImg}
                 />
              ))}
          </div>
        </div>
      </div>
    )
  }