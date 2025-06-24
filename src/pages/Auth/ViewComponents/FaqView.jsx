import React from 'react';

const FaqView = ({ viewingItem, onClose }) => {
  if (!viewingItem) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">FAQ Details</h2>

        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-700">Event</h3>
          <p className="text-gray-600">{viewingItem.event_title}</p>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-700">Question</h3>
          <p className="text-gray-600">{viewingItem.question}</p>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-700">Answer</h3>
          <p className="text-gray-600">{viewingItem.answer}</p>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default FaqView;
