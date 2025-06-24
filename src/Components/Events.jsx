import React from 'react'
import EventCard from './EventCartd'

const Events = ({filteredEvents,categories}) => {
  return (
     <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Upcoming Events</h2>
            <p className="text-xl text-gray-600">Discover events that match your interests and career goals</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} categories={categories} />
            ))}
          </div>
        </div>
      </section>
  )
}

export default Events