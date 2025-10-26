import React, { useEffect, useState } from 'react';
import { RelatedMutate } from '../../../../Services/Auth';
import TicketSalesChart from './TicketSalesChart';

const DashboardSection = ({ events, orders, categories, tickets, mutate: { setEvents, setTickets, setOrders, setCategories,recordedOrders,setRecordedOrders } }) => {

  const [selectedEvent, setSelectedEvent] = useState('');
  const [eventOptions, setEventOptions] = useState([]);

  useEffect(() => {
    console.log('dashboard fetching');
    RelatedMutate("event", setEvents);
    RelatedMutate("ticket", setTickets);
    RelatedMutate("order", setOrders);
    RelatedMutate("category", setCategories);
    RelatedMutate("recordOrder", setRecordedOrders);
    console.log('recordOrder',recordedOrders);
  }, []);

  useEffect(() => {
    if (recordedOrders.length > 0) {
      const uniqueEvents = Array.from(new Set(recordedOrders.map(order => order.event_title)));
      setEventOptions(uniqueEvents);
      if (!selectedEvent && uniqueEvents.length > 0) {
        setSelectedEvent(uniqueEvents[0]); // default selection
      }
    }
  }, [recordedOrders]);
  const transformedSalesData = () => {
  const grouped = {};
  const ticketTypesSet = new Set();

  recordedOrders
    .filter(order => order.event_title === selectedEvent)
    .forEach(order => {
      const date = new Date(order.created_at).toLocaleDateString();
      const ticketType = order.ticket_title;

      ticketTypesSet.add(ticketType);

      if (!grouped[date]) {
        grouped[date] = { date };
      }

      if (!grouped[date][ticketType]) {
        grouped[date][ticketType] = 0;
      }

      grouped[date][ticketType] += order.quantity;
    });

  const ticketTypes = Array.from(ticketTypesSet);
  const chartData = Object.values(grouped).map(entry => {
    ticketTypes.forEach(type => {
      if (!entry[type]) entry[type] = 0;
    });
    return entry;
  });

  return chartData;
};


  // 🧠 Transform recordedOrders into chart data

  const salesData = transformedSalesData();

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard Overview</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Total Events</h3>
          <p className="text-3xl font-bold text-blue-600">{events.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Total Orders</h3>
          <p className="text-3xl font-bold text-green-600">{orders.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Categories</h3>
          <p className="text-3xl font-bold text-purple-600">{categories.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Total Tickets</h3>
          <p className="text-3xl font-bold text-purple-600">{tickets.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Total Previous Order</h3>
          <p className="text-3xl font-bold text-purple-600">{recordedOrders?.length}</p>
        </div>
      </div>

      {/* 🎯 Chart Filter + Chart */}
      <div className="mb-6   ">
        <label htmlFor="event-select" className="block mb-2 font-semibold text-gray-700">Select Event</label>
        <select
          id="event-select"
          value={selectedEvent}
          onChange={e => setSelectedEvent(e.target.value)}
          className="border p-2 rounded-md"
        >
          {eventOptions.map(event => (
            <option key={event} value={event}>{event}</option>
          ))}
        </select>
      </div>

    <div className='bg-white p-6 rounded-lg shadow w-2/3'>
        <TicketSalesChart salesData={salesData} />
    </div>
    </div>
  );
};

export default DashboardSection;
