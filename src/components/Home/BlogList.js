const posts = [
    {
      title: 'Hereditary Cancer Syndromes: A Comprehensive Review with a Visual Tool',
      href: 'https://pubmed.ncbi.nlm.nih.gov/37239385/',
      category: { name: 'Publicación', href: '#', color: 'bg-indigo-100 text-indigo-800' },
      description:
        'Hereditary cancer syndromes account for nearly 10% of cancers even though they are often underdiagnosed. Finding a pathogenic gene variant could have dramatic implications in terms of pharmacologic treatments, tailored preventive programs, and familiar cascade testing',
      date: 'Abr 30, 2023',
      datetime: '202-04-30',
      authorName: 'Mattia Garutti',
      authorHref: 'https://www.linkedin.com/in/mattia-garutti-184a6a243/?originalSubdomain=it',
      authorImg:  'https://media.licdn.com/dms/image/v2/C4D03AQHojQ_QgiAQWg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1656521205900?e=1732752000&v=beta&t=7PYEkOafRJCGj4L6oZK83cqxStGvrJS-SE6kH8Zvh38',
      readingTime: '9 min',
    },
    {
      title: 'Unveiling crucial amino acids in the carbohydrate recognition domain of a viral protein through a structural bioinformatic approach',
      href: 'https://academic.oup.com/glycob/advance-article-abstract/doi/10.1093/glycob/cwae068/7746103?redirectedFrom=fulltext',
      category: { name: 'Publicación', href: '#', color: 'bg-pink-100 text-pink-800' },
      description:
        'Carbohydrate binding modules (CBMs) are protein domains that typically reside near catalytic domains, increasing substrate-protein proximity by constraining the conformational space of carbohydrates. ',
      date: 'Ago 30, 2024',
      datetime: '2024-08-30',
      authorName: 'Marcelo Gamarra',
      authorHref: 'https://www.linkedin.com/in/marcelogamarraok/?originalSubdomain=ar',
      authorImg:  'Marcelo.jpg',
      readingTime: '10 min',
    },
    {
      title: 'Un viaje por el mundo invisible de la genética en Misiones',
      href: 'https://www.novum.com.ar/un-viaje-por-el-mundo-invisible-de-la-genetica-en-misiones/',
      category: { name: 'Lectura', href: '#', color: 'bg-green-100 text-green-800' },
      description: 'En Misiones, la genética se ha convertido en una herramienta fundamental para mejorar la salud de la población. La provincia es pionera en la gestión de enfermedades poco frecuentes, gracias a la LEY XVII – N° 81 que, desde 2012, dio marco a la creación del Instituto de Genética Humana',
      date: 'Ago 26, 2024',
      datetime: '2024-08-26',
      authorName: 'Marcelo Gamarra',
      authorHref: 'https://www.linkedin.com/in/marcelogamarraok/?originalSubdomain=ar',
      authorImg:  'Marcelo.jpg',
      readingTime: '4 min',
    },
  ]
  
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  const ScientificCard = ({category, title, href, description, date, datetime, readingTime, authorName, authorHref, authorImg}) =>{
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
        {/* <div className="flex-shrink-0">
          <img className="h-48 w-full object-cover" src={getImageSource(eventImg)} alt="Imagen del evento" />
        </div> */}
        <div className="flex flex-1 flex-col justify-between bg-white p-6">
          <div className="flex-1">
            <a href={category.href} className="inline-block">
              <span
                className={classNames(
                  category.color,
                  'inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium'
                )}
              >
                {category.name}
              </span>
            </a>
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
  


  export default function BlogList() {
    return (
      <div className="bg-white px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-24 lg:pb-28">
        <div className="relative mx-auto max-w-lg divide-y-2 divide-gray-200 lg:max-w-7xl">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Publicaciones recientes</h2>
            <p className="mt-3 text-xl text-gray-500 sm:mt-4">
              Se presentan las últimas publicaciones científicas de interés en prestigiosas revistas del sector
            </p>
          </div>
          <div className="mt-12 grid gap-16 pt-12 lg:grid-cols-3 lg:gap-x-5 lg:gap-y-12">

            {posts.map((post, index) => (
                <ScientificCard
                key={index}
                category={post.category}
                title={post.title}
                href={post.href}
                description={post.description}
                date={post.date}
                datetime={post.datetime}
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