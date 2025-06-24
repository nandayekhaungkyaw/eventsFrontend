import React, { useEffect, useState } from 'react';
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';
import { RelatedMutateNormal } from '../../../../Services/Auth';

const FaqSection = ({ setFaqs, faqs, viewDetails, handleDelete, openModal }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFaqs, setFilteredFaqs] = useState([]);

  useEffect(() => {
    RelatedMutateNormal('faq', setFaqs);
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredFaqs(faqs);
    } else {
      const filtered = faqs.filter(faq =>
        faq.event_title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredFaqs(filtered);
    }
  }, [searchTerm, faqs]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">FAQ Management</h1>

        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search by event name..."
            className="border px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <button
            onClick={() => openModal("faq")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            + Add FAQ
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq) => (
            <div key={faq.id} className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between">
              <h3 className="text-xl font-semibold text-gray-700 mb-2 text-center">{faq.event_title}</h3>
              <div>
                <h2 className="text-lg text-gray-500 mb-2">{faq.question}</h2>
                <p className="text-gray-500 text-sm line-clamp-2">{faq.answer}</p>
              </div>

              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => viewDetails("faq", faq)}
                  className="flex items-center gap-1 text-blue-500 hover:text-blue-700 text-sm"
                >
                  <FaEye /> View
                </button>

                <button
                  onClick={() => openModal("faq", faq)}
                  className="flex items-center gap-1 text-indigo-500 hover:text-indigo-700 text-sm"
                >
                  <FaEdit /> Edit
                </button>

                <button
                  onClick={() => handleDelete("faq", faq.id)}
                  className="flex items-center gap-1 text-red-500 hover:text-red-700 text-sm"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-400 py-10">
            No FAQ found for this event.
          </div>
        )}
      </div>
    </div>
  );
};

export default FaqSection;
