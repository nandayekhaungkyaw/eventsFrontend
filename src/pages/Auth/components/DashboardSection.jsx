import React, { useEffect } from 'react'
import { RelatedMutate } from '../../../../Services/Auth'


const DashboardSection = ({events,orders,categories,tickets,mutate:{setEvents,setTickets,setOrders,setCategories}}) => {
  useEffect(() => {
    console.log('dashboard fetching')
   RelatedMutate("event",setEvents);
   RelatedMutate("ticket",setTickets);
   RelatedMutate("order",setOrders);
   RelatedMutate("category",setCategories);
  },[])
  return (
     <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard Overview</h1>
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
            </div>
          </div>
  )
}

export default DashboardSection