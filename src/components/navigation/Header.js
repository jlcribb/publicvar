import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header class="text-gray-600 body-font">
      <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            class="w-10 h-10 text-white p-2 bg-yellow-500  rounded-full"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span class="ml-3 text-xl">PublicVar</span>
        </a>
        <nav class="md:ml-auto flex flex-wrap items-center text-base justify-center top-0">
          <NavLink
            to="/patient"
            className="text-lg inline-flex font-medium leading-6 mr-5 hover:text-yellow-600 border-2 hover:border-b-2-orange-500"
          >
            Pacientes
          </NavLink>
          <NavLink
            to="/variant"
            className="text-lg inline-flex font-medium leading-6 mr-5 hover:text-yellow-600 border-2 hover:border-b-2-orange-500"
          >
            Variantes
          </NavLink>
          <NavLink
            to="/search"
            className="text-lg inline-flex font-medium leading-6 mr-5 hover:text-yellow-600 border-2 hover:border-b-2-orange-500"
          >
            Búsqueda
          </NavLink>
          <NavLink
            to="/about"
            className="text-lg inline-flex font-medium leading-6 mr-5 hover:text-yellow-600 border-2 hover:border-b-2-orange-500"
          >
            Quiénes somos
          </NavLink>
        </nav>
        <button class="inline-flex items-center bg-yellow-buttom hover:bg-black border-0 py-1 px-3 focus:outline-none transition duration-300 hover:ease-in-out rounded text-base mt-4 md:mt-0">
          Ingresa
          <svg
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            class="w-4 h-4 ml-1"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </header>
  );
}
export default Header;
