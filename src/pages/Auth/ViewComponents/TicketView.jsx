import React from 'react';

const TicketView = ({ viewingItem }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 border-b pb-3">
        🎟️ Ticket Details
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p className="text-gray-500">Title</p>
          <p className="text-lg font-semibold">{viewingItem.title}</p>
        </div>

        <div>
          <p className="text-gray-500">Amount</p>
          <p className="text-lg font-semibold text-green-600">
            ${parseFloat(viewingItem.amount).toFixed(2)}
          </p>
        </div>

        <div>
          <p className="text-gray-500">Available Quantity</p>
          <p className="text-lg font-semibold">{viewingItem.available_quantity}</p>
        </div>

        <div>
          <p className="text-gray-500">Event Name</p>
          <p className="text-lg font-semibold">{viewingItem.event_name}</p>
        </div>

        <div>
          <p className="text-gray-500">Sale Start Date</p>
          <p className="text-lg font-semibold">{viewingItem.sale_start_date}</p>
        </div>

        <div>
          <p className="text-gray-500">Sale End Date</p>
          <p className="text-lg font-semibold">{viewingItem.sale_end_date}</p>
        </div>

        <div>
          <p className="text-gray-500">Start Time</p>
          <p className="text-lg font-semibold">{viewingItem.start_time}</p>
        </div>

        <div>
          <p className="text-gray-500">End Time</p>
          <p className="text-lg font-semibold">{viewingItem.end_time}</p>
        </div>

        <div className="md:col-span-2">
          <p className="text-gray-500">Description</p>
          <p className="text-lg font-semibold">{viewingItem.description}</p>
        </div>
      </div>

      <div className="pt-4 text-sm text-gray-400">
        Created: {new Date(viewingItem.created_at).toLocaleString()}<br/>
        Updated: {new Date(viewingItem.updated_at).toLocaleString()}
      </div>
    </div>
  );
};

export default TicketView;
