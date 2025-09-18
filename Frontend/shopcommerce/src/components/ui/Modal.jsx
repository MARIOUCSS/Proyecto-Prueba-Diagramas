import React from "react";

const Modal = ({ isOpen, onClose, onSubmit, formData, onInputChange }) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit();
  };
  // f pasa a v return null
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
        >
          ×
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Agregar Nueva Dirección
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campo Dirección */}
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Dirección:
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={onInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ingresa tu dirección completa"
            />
          </div>

          {/* Campo Teléfono */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Teléfono:
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={onInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ingresa tu número de teléfono"
            />
          </div>
          <div className="flex flex-row gap-x-1 justify-between">
            {/* <button
              type="submit"
              className="w-full  text-black py-2 px-4   border-b-gray-700 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Close
            </button> */}
            <button
              onClick={onClose}
              class="px-4 py-2 border border-gray-500 text-gray-500 rounded hover:bg-gray-500 hover:text-white transition"
            >
              Cerrar
            </button>
            <button class="px-4 py-2 border border-gray-500 text-gray-500 rounded hover:bg-gray-500 hover:text-white transition">
              Add Address
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
