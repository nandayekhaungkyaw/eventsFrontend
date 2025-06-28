"use client"

import { useEffect, useState } from "react"
import HeroSection from "../Components/HeroSection"
import AboutSection from "../Components/AboutSection"
import Testominal from "../Components/Testominal"
import Footer from "../Components/Footer"
import StaticSection from "../Components/StaticSection"
import Events from "../Components/Events"
import { EventGet } from "../../Services/EventFetching"



const EventPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(0)
  const [searchTerm, setSearchTerm] = useState("")
  const [events,setEvents]=useState([])
  const [categories,setCategory]=useState([])

  const apiBaseUrl = import.meta.env.VITE_API_URL;
  console.log(apiBaseUrl)
const fetching=async ()=>{
  const output=await EventGet(`${apiBaseUrl}/event`)
setEvents(output)
console.log(output)

const output1=await EventGet(`${apiBaseUrl}/category`)
setCategory(output1)
console.log(output1)

}


  useEffect(() => {
    fetching()
  }, [])


const Frontendcategories = [
  { id: 0, name: 'All' },
  ...categories
];
const categoriesWithCount = Frontendcategories.map(category => {
  if (category.id === 0) {
    // "All" case: count total events
    return { ...category, count: events.length };
  } else {
    // count events for this category
    const count = events.filter(event => event.category.id === category.id).length;
    return { ...category, count };
  }
});


  const filteredEvents = events.filter((event) => {
    const matchesCategory = selectedCategory === 0 || event.category_id === selectedCategory
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Product Manager",
      company: "TechCorp",
      image: "/placeholder.svg?height=60&width=60",
      quote:
        "The networking events have been invaluable for my career growth. I've made connections that led to amazing opportunities.",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Software Engineer",
      company: "StartupXYZ",
      image: "/placeholder.svg?height=60&width=60",
      quote:
        "The workshops are incredibly well-organized and practical. I always leave with actionable insights I can implement immediately.",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Marketing Director",
      company: "GrowthCo",
      image: "/placeholder.svg?height=60&width=60",
      quote:
        "These events consistently deliver high-quality content and speakers. It's my go-to platform for professional development.",
    },
  ]

  return (
    <div className="min-h-screen max-w-[1550px] mx-auto bg-gray-50">
      {/* Hero Section */}
   
      <HeroSection/>
      {/* Search and Filter Section */}
      <section className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {categoriesWithCount.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition duration-300 ${
                    selectedCategory === category.id
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <Events filteredEvents={filteredEvents} categories={categories}/>
    <AboutSection/>

      {/* Events Grid */}
     

      {/* Statistics Section */}
     <StaticSection/>

      {/* Testimonials Section */}
    <Testominal testimonials={testimonials}/>

      {/* Newsletter Section */}
    

      {/* Footer */}
    <Footer/>
    </div>
  )
}

export default EventPage
