"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Toaster } from "react-hot-toast"

import DashboardSection from "./components/DashboardSection"
import EventSection from "./components/EventSection"
import TicketSection from "./components/TicketSection"
import CategoriesSection from "./components/CategoriesSection"
import TypeSection from "./components/TypeSection"
import OrderSection from "./components/OrderSection"
import ImageSection from "./components/ImageSection"
import SideBar from "./components/SideBar"
import ProfileSection from "./components/ProfileSection"
import EventView from "./ViewComponents/EventView"
import TicketView from "./ViewComponents/TicketView"
import OrderView from "./ViewComponents/OrderView"
import CategoryFormModal from "./CreateComponents/CategoryFormModal"
import TypeFormModal from "./CreateComponents/TypeFormModal"
import EventFormModal from "./CreateComponents/EventFormMOdal"
import TicketFormModal from "./CreateComponents/TicketFormModal"
import ImageFormModal from "./CreateComponents/ImageFormModal"
import FaqSection from "./components/FaqSection"
import FaqFormModal from "./CreateComponents/FaqFormModal"
import FaqView from "./ViewComponents/FaqView"
import RecordOrderSection from "./components/RecordOrderSection"
import RecordOrderView from "./ViewComponents/RecordOrderView"
import useDashboardStore from "../../../Services/useDashboardStore"
import Loading from './../../Components/Loading';



export default function DashboardPage() {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)

  // Get all state and actions from Zustand store
  const {
    // UI State
    activeSection,
    sidebarOpen,
    showFormModal,
    showViewModal,
    modalType,
    editingItem,
    viewingItem,
    formData,

    // Data State
    events,
    tickets,
    categories,
    types,
    orders,
    images,
    faqs,
    recordedOrders,
    profile,

    // Actions
    setActiveSection,
    setSidebarOpen,
    toggleSidebar,
    openModal,
    closeFormModal,
    openViewModal,
    closeViewModal,
    handleInputChange,
    setEvents,
    setTickets,
    setCategories,
    setTypes,
    setOrders,
    setImages,
    setFaqs,
    setRecordedOrders,
    setProfile,
    fetchAllData,
    handleAddSuccess,
    handleDelete,
    handleLogout,
  } = useDashboardStore()

  // Fetch data on component mount
  useEffect( () => {
    const fetchData = async () => {
      setLoading(true)
      try {
        await fetchAllData()
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchData();
  }, [fetchAllData])

 if(loading===true){
    return <Loading />  }
  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <DashboardSection
            tickets={tickets}
            events={events}
            mutate={{
              setEvents,
              recordedOrders,
              setRecordedOrders,
              setTickets,
              setOrders,
              setCategories,
            }}
            orders={orders}
            categories={categories}
          />
        )
      case "events":
        return (
          <EventSection
            setEvents={setEvents}
            events={events}
            openModal={openModal}
            handleDelete={handleDelete}
            viewDetails={openViewModal}
          />
        )
      case "tickets":
        return (
          <TicketSection
            setTickets={setTickets}
            tickets={tickets}
            openModal={openModal}
            handleDelete={handleDelete}
            viewDetails={openViewModal}
          />
        )
      case "categories":
        return (
          <CategoriesSection
            setCategories={setCategories}
            categories={categories}
            openModal={openModal}
            handleDelete={handleDelete}
            viewDetails={openViewModal}
          />
        )
      case "types":
        return (
          <TypeSection
            setTypes={setTypes}
            types={types}
            openModal={openModal}
            handleDelete={handleDelete}
            viewDetails={openViewModal}
          />
        )
      case "orders":
        return (
          <OrderSection
            setOrders={setOrders}
            orders={orders}
            handleDelete={handleDelete}
            mutate={handleAddSuccess}
            viewDetails={openViewModal}
          />
        )
      case "RecordOrders":
        return <RecordOrderSection viewDetails={openViewModal} recordOrder={recordedOrders} setRecordOrder={setRecordedOrders} />
      case "faqs":
        return (
          <FaqSection
            setFaqs={setFaqs}
            openModal={openModal}
            faqs={faqs}
            handleDelete={handleDelete}
            viewDetails={openViewModal}
          />
        )
      case "images":
        return <ImageSection setImages={setImages} images={images} openModal={openModal} handleDelete={handleDelete} />
      case "profile":
        return (
          <ProfileSection
            profile={profile}
            setProfile={setProfile}
            formData={formData}
            handleInputChange={handleInputChange}
          />
        )
      default:
        return <div>Section not found</div>
    }
  }

  const renderModal = () => {
    if (!showFormModal) return null

    switch (modalType) {
      case "type":
        return (
          <TypeFormModal show={showFormModal} editingItem={editingItem} setTypes={setTypes} onClose={closeFormModal} />
        )
      case "category":
        return (
          <CategoryFormModal
            show={showFormModal}
            editingItem={editingItem}
            setCategories={setCategories}
            onClose={closeFormModal}
          />
        )
      case "faq":
        return (
          <FaqFormModal
            show={showFormModal}
            editingItem={editingItem}
            setFaqs={setFaqs}
            events={events}
            onClose={closeFormModal}
          />
        )
      case "event":
        return (
          <EventFormModal
            show={showFormModal}
            editingItem={editingItem}
            categories={categories}
            types={types}
            setEvents={setEvents}
            onClose={closeFormModal}
          />
        )
      case "ticket":
        return (
          <TicketFormModal
            show={showFormModal}
            editingItem={editingItem}
            events={events}
            setTickets={setTickets}
            onClose={closeFormModal}
          />
        )
      case "image":
        return (
          <ImageFormModal
            show={showFormModal}
            editingItem={editingItem}
            events={events}
            setImages={setImages}
            onClose={closeFormModal}
          />
        )
      default:
        return null
    }
  }

  const renderViewModal = () => {
    if (!showViewModal || !viewingItem) return null

    return (
      <div className="fixed inset-0 bg-gray-400 bg-opacity-40 flex justify-center items-center overflow-y-auto z-50">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-6xl my-12 p-6 max-h-[90vh] overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4">View {modalType.charAt(0).toUpperCase() + modalType.slice(1)}</h2>
          <div className="space-y-4">
            {modalType === "event" && viewingItem && <EventView viewingItem={viewingItem} />}
            {modalType === "ticket" && viewingItem && <TicketView viewingItem={viewingItem} />}
            {modalType === "order" && viewingItem && <OrderView viewingItem={viewingItem} />}
            {modalType === "RestoreOrder" && viewingItem && <RecordOrderView viewingItem={viewingItem} />}
            {modalType === "faq" && viewingItem && <FaqView viewingItem={viewingItem} onClose={closeViewModal} />}
            {modalType === "category" && viewingItem && (
              <div>
                <p>
                  <strong>Name:</strong> {viewingItem.name}
                </p>
                <p>
                  <strong>Description:</strong> {viewingItem.description}
                </p>
              </div>
            )}
            {modalType === "type" && viewingItem && (
              <div>
                <p>
                  <strong>Name:</strong> {viewingItem.name}
                </p>
              </div>
            )}
            {modalType === "image" && viewingItem && (
              <div>
                <p>
                  <strong>Image URL:</strong> {viewingItem.url}
                </p>
                <p>
                  <strong>Alt Text:</strong> {viewingItem.alt_text}
                </p>
                <p>
                  <strong>Event ID:</strong> {viewingItem.event_id}
                </p>
                <img
                  src={viewingItem.url || "/placeholder.svg"}
                  alt={viewingItem.alt_text}
                  className="w-full h-auto mt-2"
                />
              </div>
            )}
          </div>
          <div className="mt-4 text-right">
            <button onClick={closeViewModal} className="bg-blue-600 text-white px-4 py-2 rounded-lg">
              Close
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster position="top-right" reverseOrder={false} />
      <button
        onClick={toggleSidebar}
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          />
        </svg>
      </button>
      <SideBar
        sidebarOpen={sidebarOpen}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        handleLogout={() => handleLogout(navigate)}
      />
      <div className="p-4 sm:ml-64">
        {renderContent()}
        {renderModal()}
        {renderViewModal()}
      </div>
    </div>
  )
}
