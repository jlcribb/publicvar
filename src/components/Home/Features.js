import { CheckIcon } from '@heroicons/react/24/outline'

const features = [
  {
    name: 'Contacto con investigadores',
    description: 'Póngase en contacto con los investigadores que aportan en nuestra plataforma',
  },
  { name: 'Lista de variantes', description: 'Acceda a información de variantes presentes en pacientes notificados en nuestra plataforma' },
  {
    name: 'Búsquedas simplificadas',
    description: 'Puede localizar características de interés de manera rápida y fácil',
  },
  { name: 'Calendario de eventos', description: 'El calendario de actividades de interés de distintos orígenes en un sólo lugar' },
  { name: 'Notificaciones', description: 'Puede suscribirse a nuestro servicio de notificación de manera gratuita' },
  { name: 'Contacto con los desarrolladores', description: 'Los desarrolladores se encuentran a disposición para requerimientos y evaluación de factibilidad' },
  { name: 'Reportes exitosos', description: 'Contar con ésta poderosa herramienta, nos ha prmitido dar respuesta bioinformática precisa y en poco tiempo' },
  { name: 'Pruebe nuestra App', description: 'Suscríbase de manera gratuita para investigar y sea parte de un grupo colaborativo interdisciplinario' },
]

export default function Features() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl py-16 px-4 sm:px-6 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:py-24 lg:px-8">
        <div>
          <h2 className="text-lg font-semibold text-indigo-600">Todo lo que usted necesita</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900">En una sola plataforma</p>
          <p className="mt-4 text-lg text-gray-500">
            Estamos para colaborar con usted
          </p>
        </div>
        <div className="mt-12 lg:col-span-2 lg:mt-0">
          <dl className="space-y-10 sm:grid sm:grid-flow-col sm:grid-cols-2 sm:grid-rows-4 sm:gap-x-6 sm:gap-y-10 sm:space-y-0 lg:gap-x-8">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <dt>
                  <CheckIcon className="absolute h-6 w-6 text-green-500" aria-hidden="true" />
                  <p className="ml-9 text-lg font-medium leading-6 text-gray-900">{feature.name}</p>
                </dt>
                <dd className="mt-2 ml-9 text-base text-gray-500">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}