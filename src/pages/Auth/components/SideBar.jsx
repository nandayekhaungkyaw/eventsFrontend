import React from 'react'
import { FcFaq } from 'react-icons/fc'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const SideBar = ({sidebarOpen, activeSection, setActiveSection }) => {
  const navigate=useNavigate();
  function  handleLogout() {
Swal.fire({
  title: "Are you sure?",
  text: "You will be logged out",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, I do",
}).then((result) => {
  if (result.isConfirmed) {
       Cookies.remove("token");
   navigate("/login");
  }
});


 }
  return (
   <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`}
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900">Event Dashboard</h2>
          </div>
          <ul className="space-y-2 font-medium">
            <li>
              <button
                onClick={() => setActiveSection("dashboard")}
                className={`flex items-center w-full p-2 text-gray-900 rounded-lg hover:bg-gray-100 group ${
                  activeSection === "dashboard" ? "bg-gray-100" : ""
                }`}
              >
                <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 22 21">
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                <span className="ms-3">Dashboard</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveSection("events")}
                className={`flex items-center w-full p-2 text-gray-900 rounded-lg hover:bg-gray-100 group ${
                  activeSection === "events" ? "bg-gray-100" : ""
                }`}
              >
                <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="ms-3">Events</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveSection("tickets")}
                className={`flex items-center w-full p-2 text-gray-900 rounded-lg hover:bg-gray-100 group ${
                  activeSection === "tickets" ? "bg-gray-100" : ""
                }`}
              >
                <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
                </svg>
                <span className="ms-3">Tickets</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveSection("categories")}
                className={`flex items-center w-full p-2 text-gray-900 rounded-lg hover:bg-gray-100 group ${
                  activeSection === "categories" ? "bg-gray-100" : ""
                }`}
              >
                <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 18 18">
                  <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                </svg>
                <span className="ms-3">Categories</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveSection("types")}
                className={`flex items-center w-full p-2 text-gray-900 rounded-lg hover:bg-gray-100 group ${
                  activeSection === "types" ? "bg-gray-100" : ""
                }`}
              >
                <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z" />
                  <path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z" />
                </svg>
                <span className="ms-3">Event Types</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveSection("orders")}
                className={`flex items-center w-full p-2 text-gray-900 rounded-lg hover:bg-gray-100 group ${
                  activeSection === "orders" ? "bg-gray-100" : ""
                }`}
              >
                <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 18">
                  <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                </svg>
                <span className="ms-3">Orders</span>
              </button>
            </li>
             <li>
              <button
                onClick={() => setActiveSection("RecordOrders")}
                className={`flex items-center w-full p-2 text-gray-900 rounded-lg hover:bg-gray-100 group ${
                  activeSection === "RecordOrders" ? "bg-gray-100" : ""
                }`}
              >
                <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
    <path d="M4 3a2 2 0 00-2 2v1h16V5a2 2 0 00-2-2H4z" />
    <path fillRule="evenodd" d="M18 8H2v7a2 2 0 002 2h12a2 2 0 002-2V8zM6 11h8a1 1 0 100-2H6a1 1 0 000 2z" clipRule="evenodd" />
  </svg>
                <span className="ms-3">RecordOrders</span>
              </button>
            </li>
              <li>
              <button
                onClick={() => setActiveSection("faqs")}
                className={`flex items-center w-full p-2 text-gray-900 rounded-lg hover:bg-gray-100 group ${
                  activeSection === "faqs" ? "bg-gray-100" : ""
                }`}
              >
              <FcFaq className='size-8 ' />

                <span className="ms-3">faqs</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveSection("images")}
                className={`flex items-center w-full p-2 text-gray-900 rounded-lg hover:bg-gray-100 group ${
                  activeSection === "images" ? "bg-gray-100" : ""
                }`}
              >
                <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 18">
                  <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                </svg>
                <span className="ms-3">Images</span>
              </button>
            </li>
           
            <li>
              <button
                onClick={handleLogout}
                className="flex items-center w-full p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 18 16">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                  />
                </svg>
                <span className="ms-3">Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>
  )
}

export default SideBar