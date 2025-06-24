import React, { useEffect } from 'react';
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';

import { RelatedMutateNormal } from '../../../../Services/Auth';

const TypeSection = ({ types, openModal, handleDelete ,setTypes}) => {
    useEffect (()=>{
         RelatedMutateNormal('type',setTypes);
      },[ ]);
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Event Types Management</h1>
        <button
          onClick={() => openModal("type")}
          className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-2 rounded-lg shadow-md hover:opacity-90 transition"
        >
          + Add Type
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {types.map((type) => (
          <div key={type.id} className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-700">{type.name}</h2>
            </div>

            <div className="flex justify-between items-center mt-4">
              

              <button
                onClick={() => openModal("type", type)}
                className="flex items-center gap-1 text-indigo-500 hover:text-indigo-700 text-sm"
              >
                <FaEdit /> Edit
              </button>

              <button
                onClick={() => handleDelete("type", type.id)}
                className="flex items-center gap-1 text-red-500 hover:text-red-700 text-sm"
              >
                <FaTrash /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TypeSection;
