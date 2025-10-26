"use client"

import { create } from "zustand"
import Cookies from "js-cookie"
import Swal from "sweetalert2"
import { AuthGet, EventGet } from "../Services/EventFetching"
import { AuthDelete, RelatedMutate } from "../Services/Auth"

const useDashboardStore = create((set, get) => ({
  // UI State
  activeSection: "dashboard",
  sidebarOpen: false,
  showFormModal: false,
  showViewModal: false,
  modalType: "",
  editingItem: null,
  viewingItem: null,
  formData: {},

  // Data State
  events: [],
  tickets: [],
  categories: [],
  types: [],
  orders: [],
  images: [],
  faqs: [],
  recordedOrders: [],
  profile: {
    name: "Admin User",
    email: "admin@example.com",
    phone: "09123456789",
    role: "Administrator",
  },

  // UI Actions
  setActiveSection: (section) => set({ activeSection: section }),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

  // Modal Actions
  openModal: (type, item = null) =>
    set({
      modalType: type,
      editingItem: item,
      formData: item || {},
      showFormModal: true,
    }),

  closeFormModal: () =>
    set({
      showFormModal: false,
      modalType: "",
      editingItem: null,
      formData: {},
    }),

  openViewModal: (type, item) =>
    set({
      modalType: type,
      viewingItem: item,
      showViewModal: true,
    }),

  closeViewModal: () =>
    set({
      showViewModal: false,
      viewingItem: null,
    }),

  // Form Data Actions
  handleInputChange: (e) => {
    const { name, value } = e.target
    set((state) => ({
      formData: { ...state.formData, [name]: value },
    }))
  },

  // Data Actions
  setEvents: (events) => set({ events }),
  setTickets: (tickets) => set({ tickets }),
  setCategories: (categories) => set({ categories }),
  setTypes: (types) => set({ types }),
  setOrders: (orders) => set({ orders }),
  setImages: (images) => set({ images }),
  setFaqs: (faqs) => set({ faqs }),
  setRecordedOrders: (recordedOrders) => set({ recordedOrders }),
  setProfile: (profile) => set({ profile }),

  // Fetch All Data
  fetchAllData: async () => {
    try {
      const fetchedEvent = await EventGet(`${import.meta.env.VITE_API_URL}/event`)
      const fetchedTicket = await EventGet(`${import.meta.env.VITE_API_URL}/ticket`)
      const fetchedCategory = await EventGet(`${import.meta.env.VITE_API_URL}/category`)
      const fetchedType = await EventGet(`${import.meta.env.VITE_API_URL}/type`)
      const fetchedImage = await EventGet(`${import.meta.env.VITE_API_URL}/image`)
      const fetchedOrders = await AuthGet(`${import.meta.env.VITE_API_URL}/order`)
      const fetchedFaqs = await EventGet(`${import.meta.env.VITE_API_URL}/faq`)
    

      RelatedMutate("recordOrder", get().setRecordedOrders)

      set({
        events: fetchedEvent,
        tickets: fetchedTicket,
        categories: fetchedCategory,
        types: fetchedType,
        images: fetchedImage,
        orders: fetchedOrders,
        faqs: fetchedFaqs,
        
      })
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  },

  // Handle Add Success
  handleAddSuccess: () => {
    get().fetchAllData()
  },

  // Handle Delete
handleDelete: async (type, id) => {
  try {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    });

    if (!result.isConfirmed) return;

    await AuthDelete(type, id);

    const { setEvents, setTickets, setOrders, setCategories, setTypes, setImages } = get();

    const mutationMap = {
      event: setEvents,
      ticket: setTickets,
      order: setOrders,
      category: setCategories,
      type: setTypes,
      image: setImages,
    };

    if (mutationMap[type]) {
      RelatedMutate(type, mutationMap[type]);
    }

  } catch (error) {
    console.error("Error deleting item:", error);
  }
},

  // Handle Logout
  handleLogout: (navigate) => {
    Cookies.remove("token")
    Swal.fire({
      title: "Are you sure to logOut?",
      text: "You will be logged out",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, I do",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/login")
      }
    })
  },
}))

export default useDashboardStore
