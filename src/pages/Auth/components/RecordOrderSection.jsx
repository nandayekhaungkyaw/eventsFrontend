import React, { useCallback, useEffect, useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { AuthGet } from '../../../../Services/EventFetching';
import Pagination from './Pagination';
import debounce from 'lodash.debounce';

const RecordOrderSection = ({ viewDetails}) => {
  const [recordOrder, setRecordOrder] = useState([]);
  const [search, setSearch] = useState('');
  const [links, setLinks] = useState([]);
  const [currentUrl, setCurrentUrl] = useState(`${import.meta.env.VITE_API_URL}/order/saveRecord/all`);

  useEffect(() => {
    async function fetchData() {
      const fetched = await AuthGet(`${currentUrl}`);
      setRecordOrder(fetched.data);
      setLinks(fetched.links);
      console.log(fetched);
    }
    fetchData();
  }, [currentUrl]);

  const debouncedSearch = useCallback(
    debounce((value) => {
      if (value.trim() !== "") {
        setCurrentUrl(`http://127.0.0.1:8000/api/order/search/${value}`);
      } else {
        setCurrentUrl("http://127.0.0.1:8000/api/order/saveRecord/all");
      }
    }, 500),
    []
  );

  // Trigger debounced search
  useEffect(() => {
    debouncedSearch(search);
  }, [search]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Archived Orders Management</h1>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Name, Email, or Amount"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-4 py-2 rounded w-full md:w-1/3"
        />
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Event</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ticket</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {recordOrder.map((order) => (
              <tr key={order.id}>
                <td className="px-6 py-4 text-sm text-gray-900">{order.event_title}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{order.ticket_title}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{order.first_name} {order.last_name}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{order.email}</td>
                <td className="px-6 py-4 text-sm text-gray-500">${order.total_amount}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 inline-flex text-xs font-semibold rounded-full ${
                    order.status === "confirmed"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-200 text-gray-600"
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button onClick={() => viewDetails("RestoreOrder",order)} className="flex items-center gap-1 text-blue-500 hover:text-blue-700">
                    <FaEye size={16} /> View
                  </button>
                </td>
              </tr>
            ))}
            {recordOrder.length === 0 && (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center text-gray-500">No records found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
       <Pagination links={links} onPageChange={(url) => setCurrentUrl(url)} />
    </div>
  );
};

export default RecordOrderSection;
