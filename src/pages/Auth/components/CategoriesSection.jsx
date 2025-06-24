import React, { useEffect } from 'react'
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa'
import { RelatedMutateNormal } from '../../../../Services/Auth';


const CategoriesSection = ({categories,openModal,handleDelete,viewDetails,setCategories}) => {
  useEffect (()=>{
       RelatedMutateNormal('category',setCategories);
    },[ ]);
  return (
     <div>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-900">Categories Management</h1>
              <button
                onClick={() => openModal("category")}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Add Category
              </button>
            </div>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {categories.map((category) => (
                    <tr key={category.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{category.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{category.description}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex items-center gap-4">
                                            
                          <button
                            onClick={() => viewDetails("category", category)}
                            className="text-green-400 hover:text-green-900"
                          >
                            <FaEye size={18} />
                          </button>
                          <button
                            onClick={() => openModal("category", category)}
                            className="text-indigo-400 hover:text-indigo-900"
                          >
                            <FaEdit size={18} />
                          </button>
                        
                          <button
                            onClick={() => handleDelete("category", category.id)}
                            className="text-red-400 hover:text-red-900"
                          >
                            <FaTrash size={18} />
                          </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
  )
}

export default CategoriesSection