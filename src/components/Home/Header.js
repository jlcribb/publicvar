// import MasterHeader from 'components/Common/MasterHeader'
import { Link } from 'react-router-dom'
import { Typewriter } from 'react-simple-typewriter'

function Header(){
    return(
        <main>
        {/* <MasterHeader page={'PublicVar'} description={''}/> */}
        <div className="relative px-6 lg:px-8 pt-0">
          <div className="mx-auto max-w-3xl pt-20 pb-32 sm:pt-10 sm:pb-40">
            <div>
              <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                <div className="relative overflow-hidden rounded-full py-1.5 px-4 text-sm leading-6 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                  <span className="text-gray-600">
                    Actualización permanente de variantes genéticas.{' '}
                    <a href="#" className="font-semibold text-indigo-800">
                      <span className="absolute inset-0" aria-hidden="true" />
                      Lea política de actualización <span aria-hidden="true">&rarr;</span>
                    </a>
                  </span>
                </div>
              </div>
              <div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-center sm:text-2xl">
                  PublicVar <Typewriter
                            words={['Pacientes', 'Variantes', 'CeNaGeM - IGeHM']}
                            loop={5}
                            cursor
                            cursorStyle='_'
                            typeSpeed={70}
                            deleteSpeed={50}
                            delaySpeed={700}
                            // onLoopDone={handleDone}
                            // onType={handleType}
                          />

                </h1>
                <ul className='flex gap-8 justify-center py-12'>
                  <li className='inline-flex border-b-2 border-transparent hover:border-indigo-buttom transition duration-700 ease-in-out'>
                    <Link to='/patients'>
                      Pacientes
                    </Link>
                    
                  </li>
                  <li className='inline-flex border-b-2 border-transparent hover:border-indigo-buttom transition duration-700 ease-in-out'>
                    <Link to='/variants'>
                      Variantes
                    </Link>
                    
                  </li>
                </ul>
                <p className="mt-6 text-lg leading-8 text-gray-600 sm:text-center">
                  Sitio de publicación de variantes genéticas presentes en pacientes de instituciones públicas. Las variantes son identificadas por secuenciación
                </p>
                <div className="mt-8 flex gap-x-4 sm:justify-center">
                  <a
                    href="#"
                    className="inline-block rounded-lg bg-indigo-600 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-indigo-600 hover:bg-indigo-700 hover:ring-indigo-700"
                  >
                    Get started
                    <span className="text-indigo-200" aria-hidden="true">
                      &rarr;
                    </span>
                  </a>
                  <a
                    href="#"
                    className="inline-block rounded-lg px-4 py-1.5 text-base font-semibold leading-7 text-gray-900 ring-1 ring-gray-900/10 hover:ring-gray-900/20"
                  >
                    Live demo
                    <span className="text-gray-400" aria-hidden="true">
                      &rarr;
                    </span>
                  </a>
                </div>
              </div>
              <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
              </div>
            </div>
          </div>
        </div>
      </main>
    )
}
export default Header