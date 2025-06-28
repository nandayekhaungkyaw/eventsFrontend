import { useEffect, useState } from "react";
import { EventImageGet } from "../../Services/EventFetching";
import { Link } from "react-router-dom";
import miniloading from "../../public/loadingMini.gif"

export default function EventCard({ event }) {
  // Transform the data to match the UI expectations

  const [images, setImages] = useState([]);
  const [eventData, setEventData] = useState(null);


  useEffect(() => {
    const fetchImages = async () => {
        console.log(event.id)
      const imageUrls = await EventImageGet(`${import.meta.env.VITE_API_URL}/image/event/${event.id}`);
      console.log(event)
      setImages(imageUrls);
 setEventData({
  ...event,
  image: imageUrls[0]?.url || "/placeholder.svg",
  images: imageUrls,
  
  date: formatDate(event.start_date, event.end_date),
  time: formatTime(event.start_time, event.end_time),
  type: event.type.name,
  location: event.location,
 
  category: event.category_id,
});

    };
    fetchImages();
  }, [event.id]);
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


  const categories = [event.category] // In real app, this would be passed as prop
if (!eventData) return <div className="">
  <img src={miniloading} alt="" className="size-10 flex justify-center items-center" />
</div>;


  return (
    <Link to={`/event/${event.id}`}  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
      <img src={eventData.image } alt={eventData.title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
            {categories.find((cat) => cat.id === eventData.category)?.name}
          </span>
          <span className="text-2xl font-bold text-green-600">{eventData.price}</span>
        </div>
        <h3 className="text-xl font-semibold mb-2 text-gray-900">{eventData.title}</h3>
        <p className="text-gray-600 mb-4">{eventData.description}</p>
        <div className="space-y-2 text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            {eventData.date} • {eventData.time}
          </div>
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {eventData.type}
          </div>
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0z"
              />
            </svg>
            {eventData.location} 
          </div>
        </div>
        <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300">
          Register Now
        </button>
      </div>
    </Link>
  )
}

