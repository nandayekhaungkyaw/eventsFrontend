import React from 'react';

const OrderView = ({ viewingItem }) => {
  if (!viewingItem) return <div>No order data available.</div>;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 border-b pb-3">
        📦 Order Details
      </h2>

      {/* Customer Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p className="text-gray-500">First Name</p>
          <p className="text-lg font-semibold">{viewingItem.first_name}</p>
        </div>

        <div>
          <p className="text-gray-500">Last Name</p>
          <p className="text-lg font-semibold">{viewingItem.last_name}</p>
        </div>

        <div>
          <p className="text-gray-500">Phone</p>
          <p className="text-lg font-semibold">{viewingItem.phone}</p>
        </div>

        <div>
          <p className="text-gray-500">Email</p>
          <p className="text-lg font-semibold">{viewingItem.email}</p>
        </div>

        <div>
          <p className="text-gray-500">Confirmed Email</p>
          <p className="text-lg font-semibold">{viewingItem.confirmed_email}</p>
        </div>

        <div>
          <p className="text-gray-500">Payment Method</p>
          <p className="text-lg font-semibold">{viewingItem.payment_method}</p>
        </div>

        <div>
          <p className="text-gray-500">Transaction ID</p>
          <p className="text-lg font-semibold">{viewingItem.transaction_id}</p>
        </div>

        <div>
          <p className="text-gray-500">Status</p>
          <p className={`text-lg font-semibold ${viewingItem.status === 'pending' ? 'text-yellow-600' : 'text-green-600'}`}>
            {viewingItem.status}
          </p>
        </div>

        <div>
          <p className="text-gray-500">Quantity</p>
          <p className="text-lg font-semibold">{viewingItem.quantity}</p>
        </div>

        <div>
          <p className="text-gray-500">Total Amount</p>
          <p className="text-lg font-semibold text-green-700">${parseFloat(viewingItem.total_amount).toFixed(2)}</p>
        </div>
      </div>

      {/* Ticket Info */}
      <div className="border-t pt-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">🎫 Ticket Info</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-500">Title</p>
            <p className="text-lg font-semibold">{viewingItem.ticket?.title}</p>
          </div>
          <div>
            <p className="text-gray-500">Amount</p>
            <p className="text-lg font-semibold">${parseFloat(viewingItem.ticket?.amount).toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Event Info */}
      <div className="border-t pt-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">🎉 Event Info</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-500">Title</p>
            <p className="text-lg font-semibold">{viewingItem.event?.title}</p>
          </div>
          <div>
            <p className="text-gray-500">Price</p>
            <p className="text-lg font-semibold">{viewingItem.event?.price}</p>
          </div>
          <div>
            <p className="text-gray-500">Start</p>
            <p className="text-lg font-semibold">{viewingItem.event?.start_date} at {viewingItem.event?.start_time}</p>
          </div>
          <div>
            <p className="text-gray-500">End</p>
            <p className="text-lg font-semibold">{viewingItem.event?.end_date} at {viewingItem.event?.end_time}</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-gray-500">Location</p>
            <p className="text-lg font-semibold">{viewingItem.event?.location}</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-gray-500">Description</p>
            <p className="text-lg font-semibold">{viewingItem.event?.description}</p>
          </div>
          <div>
            <p className="text-gray-500">Category</p>
            <p className="text-lg font-semibold">{viewingItem.event?.category?.name}</p>
          </div>
          <div>
            <p className="text-gray-500">Type</p>
            <p className="text-lg font-semibold">{viewingItem.event?.type?.name}</p>
          </div>
        </div>
      </div>

      {/* Google Map */}
      {viewingItem.event?.googleMap && (
        <div className="border-t pt-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">📍 Location Map</h3>
          <iframe
            src={viewingItem.event.googleMap}
            className="w-full h-96 rounded-lg border"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Event Location"
          ></iframe>
        </div>
      )}

    </div>
  );
};

export default OrderView;
