import React, { useEffect, useState } from 'react';
import { EventGet } from '../../../../Services/EventFetching';

const EventView = ({ viewingItem }) => {
    const [images, setImages] = useState([]);
    const [tickets, setTicket] = useState(null);
    const [faqs, setFaqs] = useState([]);

      const [activeIndex, setActiveIndex] = useState(null);
    
      const toggle = (index) => {
        setActiveIndex(index === activeIndex ? null : index);
      };

    useEffect(() => {
        if (!viewingItem) return;
        const fetching = async () => {
            const fetchedimage = await EventGet(`${import.meta.env.VITE_API_URL}/image/event/${viewingItem.id}`);
            const fetchedticket= await EventGet(`${import.meta.env.VITE_API_URL}/ticket/event/${viewingItem.id}`);
            const fetchedfaq=await EventGet(`${import.meta.env.VITE_API_URL}/faq/event/${viewingItem.id}`);
            setFaqs(fetchedfaq);
            setTicket(fetchedticket);
            setImages(fetchedimage);
        };
        fetching();
    }, [viewingItem]);

    if (!viewingItem) return null;

  return (
    <div className="space-y-4 text-gray-800">
      <h2 className="text-2xl font-bold mb-4">{viewingItem.title}</h2>

      <div>
        <p><strong>Description:</strong></p>
        <p className="text-gray-600">{viewingItem.description}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p><strong>Start Date:</strong> {viewingItem.start_date}</p>
          <p><strong>Start Time:</strong> {viewingItem.start_time}</p>
        </div>
        <div>
          <p><strong>End Date:</strong> {viewingItem.end_date}</p>
          <p><strong>End Time:</strong> {viewingItem.end_time}</p>
        </div>
      </div>

      <div>
        <p><strong>Location:</strong> {viewingItem.location}</p>
      </div>

      <div>
        <p><strong>Price:</strong> {viewingItem.price}</p>
      </div>

      <div>
        <p><strong>Category:</strong> {viewingItem.category?.name}</p>
        <p className="text-sm text-gray-500">{viewingItem.category?.description}</p>
      </div>

      <div>
        <p><strong>Type:</strong> {viewingItem.type?.name}</p>
      </div>
      <p className={`${images.length === 0 ? 'hidden' : ''}`}><strong>Event Images:</strong></p>
      <div className='grid grid-cols-3 gap-4'>
      {images?.map((image) => (
        <img
          key={image.id}
          src={image.url}
          alt={`Image ${image.id}`}
          className="w-full h-full object-cover"
        />
      ))}

      </div>

      <div className="mt-4">
        <p><strong>Google Map Location:</strong></p>
        <div className="w-full h-64 rounded-md overflow-hidden border">
          <iframe
            src={viewingItem.googleMap}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
   {faqs && faqs.length > 0 && (
        <div className="max-w-4xl mx-auto my-10">
      <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
      <div id="accordion-flush" className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-200 rounded-xl shadow-sm">
            <h2>
              <button
                type="button"
                className="flex items-center justify-between w-full px-6 py-5 font-medium text-gray-500 border-b border-gray-200 gap-3"
                onClick={() => toggle(index)}
                aria-expanded={activeIndex === index}
              >
                <span>{faq.question}</span>
                <svg
                  className={`w-3 h-3 transform transition-transform duration-300 ${activeIndex === index ? 'rotate-180' : ''}`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5 5 1 1 5"
                  />
                </svg>
              </button>
            </h2>
            <div className={`${activeIndex === index ? 'block' : 'hidden'} px-6 py-5 bg-gray-50 text-gray-700`}>
              {faq.answer}
            </div>
          </div>
        ))}
      </div>
    </div>
   )}
         <div className="mb-8">
          <h2 className={` ${tickets?.length === 0 ? 'hidden' : 'text-2xl font-bold text-gray-900 mb-4'}`}>Available Tickets</h2>
          <div className="grid gap-4">
            {tickets?.map((ticket) => (
              <div
                key={ticket.id}
                className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{ticket.title}</h3>
                    <p className="text-gray-600">Available: {ticket.available_quantity} tickets</p>
                    <p className="text-sm text-gray-500">
                      Sale: {new Date(ticket.sale_start_date).toLocaleDateString()} -{" "}
                      {new Date(ticket.sale_end_date).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-500">
                       Time: {(ticket.start_time, ticket.end_time)}
                    </p>
                      <p className="text-sm text-gray-500">
                      Benefit:{ticket.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">${ticket.amount}</p>
                   
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      <div className="text-sm text-gray-500">
        <p><strong>Created At:</strong> {new Date(viewingItem.created_at).toLocaleString()}</p>
        <p><strong>Updated At:</strong> {new Date(viewingItem.updated_at).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default EventView;
