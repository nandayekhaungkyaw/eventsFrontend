import React from 'react';

const RecordOrderView = ({ viewingItem }) => {
    console.log(viewingItem);
  if (!viewingItem) {
    return <div>No Record Order Data Available.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto my-10 bg-white shadow-lg rounded-lg p-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Record Order Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-semibold text-gray-600 mb-1">Event Title</h4>
          <p className="text-gray-800">{viewingItem.event_title}</p>
        </div>

        <div>
          <h4 className="font-semibold text-gray-600 mb-1">Ticket Title</h4>
          <p className="text-gray-800">{viewingItem.ticket_title}</p>
        </div>

        <div>
          <h4 className="font-semibold text-gray-600 mb-1">Customer Name</h4>
          <p className="text-gray-800">{viewingItem.first_name} {viewingItem.last_name}</p>
        </div>

        <div>
          <h4 className="font-semibold text-gray-600 mb-1">Email</h4>
          <p className="text-gray-800">{viewingItem.email}</p>
        </div>

        <div>
          <h4 className="font-semibold text-gray-600 mb-1">Phone</h4>
          <p className="text-gray-800">{viewingItem.phone}</p>
        </div>

        <div>
          <h4 className="font-semibold text-gray-600 mb-1">Payment Method</h4>
          <p className="text-gray-800">{viewingItem.payment_method}</p>
        </div>

        <div>
          <h4 className="font-semibold text-gray-600 mb-1">Transaction ID</h4>
          <p className="text-gray-800">{viewingItem.transaction_id}</p>
        </div>

        <div>
          <h4 className="font-semibold text-gray-600 mb-1">Status</h4>
          <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
            viewingItem.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
          }`}>
            {viewingItem.status}
          </span>
        </div>

        <div>
          <h4 className="font-semibold text-gray-600 mb-1">Quantity</h4>
          <p className="text-gray-800">{viewingItem.quantity}</p>
        </div>

        <div>
          <h4 className="font-semibold text-gray-600 mb-1">Total Amount</h4>
          <p className="text-gray-800">${viewingItem.total_amount}</p>
        </div>

        <div>
          <h4 className="font-semibold text-gray-600 mb-1">Confirmed Email</h4>
          <p className="text-gray-800">{viewingItem.confirmed_email}</p>
        </div>

        <div>
          <h4 className="font-semibold text-gray-600 mb-1">Created At</h4>
          <p className="text-gray-800">{new Date(viewingItem.created_at).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default RecordOrderView;
