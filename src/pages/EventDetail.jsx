"use client"

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { EventGet, EventImageGet, OrderPost } from "../../Services/EventFetching"
import Breadcrumb from "../Components/Breadcrumb"
import toast, { Toaster } from "react-hot-toast"
import Swal from "sweetalert2"
import FaqSection from "../Components/FaqSection"
import Loading from "../Components/Loading"

export default function EventDetail() {
  const [selectedTicket, setSelectedTicket] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [showOrderForm, setShowOrderForm] = useState(false)
  const [event, setEvent] = useState({})
  const [tickets, setTicket] = useState([])
  const [loading, setLoading] = useState(true);
  const [faqs,setFaqs]=useState([]);
    const formatDate = (startDate, endDate) => {
    const start = new Date(startDate)
    const end = new Date(endDate)

    if (startDate === endDate) {
      return start.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    } else {
      return `${start.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })} - ${end.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })}`
    }
  }
    const formatTime = (startTime, endTime) => {
    const formatTimeString = (time) => {
      const [hours, minutes] = time.split(":")
      const hour = Number.parseInt(hours)
      const ampm = hour >= 12 ? "PM" : "AM"
      const displayHour = hour % 12 || 12
      return `${displayHour}:${minutes} ${ampm}`
    }

    return `${formatTimeString(startTime)} - ${formatTimeString(endTime)}`
  }

  const paymentOptions = [
  "KBZ",
  "AYA",
  "WAVE MONEY",
  "CB PAY",
  "MPT PAY",
  "OK PAY",
  "K PAY",
  "E-WALLET",
  ]

  const initialOrderData = {
  first_name: "",
  last_name: "",
  email: "",
  confirmed_email: "",
  phone: "",
  transaction_id: "",
  payment_method: "KBZ",
};
useEffect(() => {
  if (Number(selectedTicket?.amount) === 0) {
    setOrderData((prev) => ({
      ...prev,
      transaction_id: "Free Event",
      payment_method: "Free",
    }));
  }
}, [selectedTicket]);


const [orderData, setOrderData] = useState(initialOrderData);

  
const { id } = useParams();


useEffect(() => {
  const fetchData = async () => {
     setLoading(true); // set loading true at start
    const eventticket=await EventGet(`${import.meta.env.VITE_API_URL}/ticket/event/${id}`);
    const eventdata = await EventGet(`${import.meta.env.VITE_API_URL}/event/${id}`);
    const imageUrls = await EventImageGet(`${import.meta.env.VITE_API_URL}/image/event/${id}`);
    const faqurls=await EventGet(`${import.meta.env.VITE_API_URL}/faq/event/${id}`);
 console.log(eventdata)
 setFaqs(faqurls)
    setTicket(eventticket);
    setEvent({
      ...eventdata,
      images: imageUrls,
      price: "Free",
      date: formatDate(eventdata.start_date, eventdata.end_date),
      time: formatTime(eventdata.start_time, eventdata.end_time),
      type: eventdata.type.name,
      location: eventdata.location,
      category: eventdata.category.name,
      ...tickets,
    });
      setLoading(false);
  };
  fetchData();
}, []);






  const handleInputChange = (e) => {
    setOrderData({
      ...orderData,
      [e.target.name]: e.target.value,
    })
  }

  const handleTicketSelect = (ticket) => {
    setSelectedTicket(ticket)
    setShowOrderForm(true)
  }

 const handleSubmitOrder = async (e) => {
  e.preventDefault();

  const result = await Swal.fire({
    title: "Are you sure to buy this ticket?",
    text: "Check ticket,quantity and event name",
    icon: "info",
    showCancelButton: true,
    reverseButtons: true,
    
     cancelButtonColor: "#d33",
    confirmButtonColor: "#3085d6",
   
    confirmButtonText: "Yes, confirm!"
  });

  if (result.isConfirmed) {
    if (orderData.email !== orderData.confirmed_email) {
      toast.error("Email and Confirmed Email do not match.");
      return;
    }

    const order = {
      event_id: event.id,
      ticket_id: selectedTicket.id,
      quantity: quantity,
      total_amount: (selectedTicket.amount * quantity).toFixed(2),
      ...orderData,
      status: "pending",
    };

    try {
      console.log(order)
      const response = await OrderPost(`${import.meta.env.VITE_API_URL}/order`, order);
      console.log(response.statusCode);
      toast.success(response.message);

      if (response.statusCode === 200) {
        await Swal.fire({
          title: "We will send your coupon to your email after checking the order.",
          icon: "success",
          draggable: true
        });
        setOrderData(initialOrderData);
        setSelectedTicket(null);
        setQuantity(1);
        setShowOrderForm(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  }
};


  const totalAmount = selectedTicket ? selectedTicket.amount * quantity : 0

if (loading) {
  return <Loading />;
}

if (!event) {
  return <div>No event data found.</div>;
}

  return (
    <>
      {event && (
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            <div><Toaster
  position="top-right"
  reverseOrder={false}
/></div>
         
          {/* Event Images */}
          <div className="relative">
           
            <img src={  event?.images[0]?.url || "/placeholder.svg"} alt={event?.title} className="w-full h-64 object-cover" />
            <div className="absolute top-4 left-4">
              <span className="bg-purple-100 text-purple-800 text-sm font-semibold px-3 py-1 rounded-full">
                {event?.category}
              </span>
            </div>
            <div className="absolute top-4 right-4">
              <span className="bg-green-100 text-green-800 text-lg font-bold px-3 py-1 rounded-full">{event?.type}</span>
            </div>
          </div>

      <div className="p-6">
        <Breadcrumb name={event?.title} />
        {/* Event Title and Description */}
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{event?.title}</h1>
        <p className="text-gray-600 text-lg mb-6">{event?.description}</p>

        {/* Event Details */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-4">
            <div className="flex items-center text-gray-700">
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <div>
                <p className="font-semibold">Date & Time</p>
               <p> {event?.date} • {event?.time}</p>
              </div>
            </div>

            <div className="flex items-center text-gray-700">
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <div>
                <p className="font-semibold">Location</p>
                <p>{event.location}</p>
                <p className="text-sm text-gray-500">{event.type}</p>
              </div>
            </div>
          </div>

          {/* Additional Images */}
          <div className="grid grid-cols-2 gap-2">
            {event.images?.slice(1).map((image, index) => (
              <img
                key={index}
                src={image?.url || "/placeholder.svg"}
                alt={`${event.title} ${index + 2}`}
                className="w-full h-24 object-cover rounded-lg"
              />
            ))}
          </div>
        </div>
   <div className="w-full h-96 rounded-lg overflow-hidden">
  <iframe
    src={event.googleMap}
    className="w-full h-full"
    allowFullScreen=""
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  ></iframe>
</div>

<FaqSection faqs={faqs}/>




        {/* Available Tickets */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Available Tickets</h2>
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
                       Time: {formatTime(ticket.start_time, ticket.end_time)}
                    </p>
                      <p className="text-sm text-gray-500">
                      Benefit:{ticket.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">${ticket.amount}</p>
                    <button
                      onClick={() => handleTicketSelect(ticket)}
                      className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Select
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Form */}
        {showOrderForm && selectedTicket && (
          <div className="border-t pt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Details</h2>

            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="font-semibold text-lg">{selectedTicket.title}</h3>
              <p className="text-gray-600">Price: ${selectedTicket.amount} per ticket</p>

              <div className="flex items-center mt-4">
                <label className="mr-4 font-medium">Quantity:</label>
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(Number.parseInt(e.target.value))}
                  className="border border-gray-300 rounded px-3 py-1"
                >
                  {[...Array(Math.min(10, selectedTicket.available_quantity))].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-4 text-xl font-bold">Total: ${totalAmount.toFixed(2)}</div>
            </div>

            <form onSubmit={handleSubmitOrder} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    name="first_name"
                    value={orderData.first_name}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    name="last_name"
                    value={orderData.last_name}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={orderData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Email</label>
                <input
                  type="email"
                  name="confirmed_email"
                  value={orderData.confirmed_email}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={orderData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
               <div className="grid md:grid-cols-2 gap-4">
{Number(selectedTicket?.amount) === 0 ? (
  <>
   

    {/* Disabled input only for display */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Transaction Info
      </label>
      <input
        type="text"
        value="Free Event"
        disabled
        className="w-full bg-gray-100 text-gray-600 border border-gray-300 rounded-lg px-3 py-2"
      />
    </div>
  </>
) : (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Transaction Id from your payment
    </label>
    <input
      type="text"
      name="transaction_id"
      value={orderData.transaction_id}
      onChange={handleInputChange}
      required
      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
)}


                
              {Number(selectedTicket?.amount)  !==0 &&(
                 <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
               <select
  name="payment_method"
  
  onChange={handleInputChange}
  required
  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
>
  {paymentOptions.map((method) => (
    <option  key={method} value={method}>
      {method === "KBZ"
        ? "KBZ Pay"
        : method === "AYA"
        ? "AYA Pay"
        : method === "CB PAY"
        ? "CB Pay"
        : method === "MPT PAY"
        ? "MPT Pay"
        : method === "OK PAY"
        ? "OK Pay"
        : method === "K PAY"
        ? "K Pay"
        : method === "E-WALLET"
        ? "E-Wallet"
        : method === "WAVE MONEY"
        ? "Wave Money"
        
        : method}
    </option>
  ))}
</select>
              </div>
              )}
              </div>

              

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowOrderForm(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Submit Order
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>)}
     </>
  )
}