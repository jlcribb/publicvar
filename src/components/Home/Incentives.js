 import compartir from 'assets/img/compartir.svg'
import actualizacion from 'assets/img/actualizacion2.svg'
import intercambio from 'assets/img/genetic-algorithm-svgrepo-com.svg'
const incentives = [
    {
      name: 'Socialización pública',
    //   imageSrc: 'https://tailwindui.com/img/ecommerce/icons/icon-shipping-simple.svg',
      imageSrc: compartir,
      description: "Acceda a nuestra web",
    },
    {
      name: 'Actualización permanente',
      imageSrc: actualizacion,
      description: "Base de datos de variantes genéticas",
    },
    {
      name: 'Intercambio científico',
      imageSrc: intercambio,
      description:
        "Para personal de salud, investigadores y becarios",
    },
  ]
  
  export default function Incentives() {
    return (
      <div className="bg-white">
        <div className="mx-auto max-w-7xl py-24 sm:px-2 sm:py-32 lg:px-4">
          <div className="mx-auto max-w-2xl px-4 lg:max-w-none">
            <div className="max-w-3xl">
              <h2 className="text-4xl font-bold tracking-tight text-gray-900">
                Ponemos a disposición un sitio público de variantes genéticas
              </h2>
              <p className="mt-4 text-gray-500">
                Un sitio para compartir información relacionada con variantes genéticas de patologías registradas en el sistema público de salud
              </p>
            </div>
            <div className="mt-16 grid grid-cols-1 gap-y-10 gap-x-8 lg:grid-cols-3">
              {incentives.map((incentive) => (
                <div key={incentive.name} className="sm:flex lg:block">
                  <div className="sm:flex-shrink-0">
                    <img className="h-16 w-16" src={incentive.imageSrc} alt="" />
                  </div>
                  <div className="mt-4 sm:mt-0 sm:ml-6 lg:mt-6 lg:ml-0">
                    <h3 className="text-sm font-medium text-gray-900">{incentive.name}</h3>
                    <p className="mt-2 text-sm text-gray-500">{incentive.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }