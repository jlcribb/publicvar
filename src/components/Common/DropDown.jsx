import React, { useState } from 'react';

/**
 * @typedef {Object} DropdownProps
 * @property {Array} options - Array de opciones para el dropdown.
 * @property {any} selectedValue - Valor seleccionado actualmente.
 * @property {function(any): void} onValueChange - Función para manejar el cambio de valor.
 * @property {function(any): React.ReactNode} [renderOption] - Función para renderizar una opción.
 * @property {function(any): React.ReactNode} [renderValue] - Función para renderizar el valor seleccionado.
 * @property {string} [placeholder] - Texto de marcador de posición.
 * @property {string} [className] - Clases adicionales para el componente.
 */

/**
 * @param {DropdownProps} props
 */
const Dropdown = ({
  options,
  selectedValue,
  onValueChange,
  renderOption,
  renderValue,
  placeholder = 'Select...',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen(!isOpen);
  const handleSelect = (value) => {
    onValueChange(value);
    setIsOpen(false);
  };

  return (
    <div className={`relative inline-block text-left ${className}`}>
      <div>
        <button
          type="button"
          className="inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
          onClick={handleToggle}
        >
          {selectedValue ? (
            renderValue ? renderValue(selectedValue) : selectedValue.toString()
          ) : (
            placeholder
          )}
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <ul className="dropdown-menu absolute z-10 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          {options.map((option, index) => (
            <li
              key={index}
              className="cursor-pointer"
              onClick={() => handleSelect(option)}
            >
              <a
                className={`block px-4 py-2 text-sm ${
                  option === selectedValue
                    ? 'bg-gray-200 dark:bg-gray-600'
                    : 'bg-white dark:bg-gray-800 hover:bg-gray-400 dark:hover:bg-gray-700'
                }`}
              >
                {renderOption ? renderOption(option) : option.toString()}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
