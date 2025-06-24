import React, { useEffect, useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { OrderConfirm, RelatedMutate, StoreOrder } from '../../../../Services/Auth';
import { AuthGet } from '../../../../Services/EventFetching';

const OrderSection = ({ orders, viewDetails, handleDelete, setOrders }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOrders, setFilteredOrders] = useState([]);

  const handleConfirm = (id) => {
    OrderConfirm(id);
    RelatedMutate('order', setOrders);
  };

  useEffect(() => {
    RelatedMutate('order', setOrders);
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredOrders(orders);
    } else {
      const filtered = orders.filter((order) =>
        `${order.first_name} ${order.last_name}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
      setFilteredOrders(filtered);
    }
  }, [searchTerm, orders]);

  const handleStoreOrder=async()=>{
   await StoreOrder();
    RelatedMutate('order', setOrders);
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Orders Management</h1>
       
      </div>

      <div className="flex justify-between items-center mb-6">
         <input
          type="text"
          placeholder="Search by customer name"
          className="border px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleStoreOrder} className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded'> Store Order</button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredOrders.map((order) => (
              <tr key={order.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {order.first_name} {order.last_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${order.total_amount}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      order.status === 'confirmed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex items-center gap-2">
                  {/* View */}
                  <button
                    onClick={() => viewDetails('order', order)}
                    className="flex items-center gap-1 text-green-600 hover:text-green-800 px-2 py-1 border border-green-600 rounded-md"
                    title="View Order"
                  >
                    <FaEye size={14} /> View
                  </button>

                  {/* Confirm */}
                  {order.status !== 'confirmed' && (
                    <button
                      onClick={() => handleConfirm(order.id)}
                      className="flex items-center gap-1 text-blue-600 hover:text-blue-800 px-2 py-1 border border-blue-600 rounded-md"
                      title="Confirm Order"
                    >
                      ✅ Confirm
                    </button>
                  )}

                  {/* Cancel */}
                  {order.status !== 'confirmed' && (
                    <button
                      onClick={() => handleDelete('order', order.id)}
                      className="flex items-center gap-1 text-yellow-600 hover:text-yellow-800 px-2 py-1 border border-yellow-600 rounded-md"
                      title="Cancel Order"
                    >
                      ❌ Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {filteredOrders.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-8 text-gray-400">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderSection;
