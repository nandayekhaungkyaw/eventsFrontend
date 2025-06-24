import React, { useEffect, useState } from 'react';
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';
import { RelatedMutateNormal } from '../../../../Services/Auth';

const TicketSection = ({ tickets, openModal, handleDelete, viewDetails, setTickets }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTickets, setFilteredTickets] = useState([]);

  useEffect(() => {
    RelatedMutateNormal('ticket', setTickets);
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredTickets(tickets);
    } else {
      const filtered = tickets.filter(ticket =>
        ticket.event_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredTickets(filtered);
    }
  }, [searchTerm, tickets]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Tickets Management</h1>

        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search by event name..."
            className="border px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <button
            onClick={() => openModal("ticket")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            + Add Ticket
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Event Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Available
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredTickets.length > 0 ? (
              filteredTickets.map((ticket) => (
                <tr key={ticket.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{ticket.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ticket.event_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${ticket.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ticket.available_quantity}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex items-center gap-4">
                    <button
                      onClick={() => viewDetails("ticket", ticket)}
                      className="text-green-400 hover:text-green-900"
                    >
                      <FaEye size={18} />
                    </button>
                    <button
                      onClick={() => openModal("ticket", ticket)}
                      className="text-indigo-400 hover:text-indigo-900"
                    >
                      <FaEdit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete("ticket", ticket.id)}
                      className="text-red-400 hover:text-red-900"
                    >
                      <FaTrash size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-10 text-gray-400">
                  No tickets found for this event.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TicketSection;
