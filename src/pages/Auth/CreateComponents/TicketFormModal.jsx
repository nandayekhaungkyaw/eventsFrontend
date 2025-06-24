import React, { useEffect } from 'react';
import { useForm, set } from 'react-hook-form';
import { AuthUpdate, EventPOstAuth, RelatedMutate } from '../../../../Services/Auth';
import toast from 'react-hot-toast';

const TicketFormModal = ({ show, editingItem, onClose,events, setTickets }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  // Reset form with editingItem data or clear for new
  useEffect(() => {
    if (editingItem) {
           const formatTime = (timeStr) => {
    if (!timeStr) return '';
    return timeStr.slice(0, 5); // keep only 'HH:mm'
  };
      reset({
        event_id: editingItem.event_id || '',
        title: editingItem.title || '',
        amount: editingItem.amount || '',
        available_quantity: editingItem.available_quantity || '',
        description: editingItem.description || '',
        sale_start_date: editingItem.sale_start_date || '',
        sale_end_date: editingItem.sale_end_date || '',
        start_time: formatTime(editingItem.start_time) || '',
        end_time: formatTime(editingItem.end_time) || '',
      });
    } else {
      reset({
        event_id: '',
        title: '',
        amount: '',
        available_quantity: '',
        description: '',
        sale_start_date: '',
        sale_end_date: '',
        start_time: '',
        end_time: '',
      });
    }
  }, [editingItem, reset]);

  if (!show) return null;

  const onSubmit = async (data) => {
    let response;
      if (editingItem) {
                  // If editing, call update API
                  response = await AuthUpdate('ticket', editingItem.id,data);
                } else {
                  // If adding, call create API
                response = await EventPOstAuth(`${import.meta.env.VITE_API_URL}/ticket`, data);
              
                }
                  RelatedMutate('ticket',setTickets)
                  console.log(response.statusCode);
   
    if (response.statusCode === 200) {
   
      
      onClose();
    } 
  };

  const action = editingItem ? 'Edit' : 'Add';

  return (
   <div className="fixed inset-0 bg-gray-400 bg-opacity-40 flex justify-center items-center overflow-y-auto z-50">
  <div className="bg-white rounded-lg shadow-lg w-full max-w-6xl my-12 p-6 max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-medium text-gray-900 mb-4">{action} Ticket</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          <div>
            <label className="block mb-1">Event Name</label>
            <select
              {...register('event_id', { required: 'Event is required' })}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="">Select Event</option>
              {events?.map((event) => (
                <option key={event.id} value={event.id}>
                  {event.title}
                </option>
              ))}
            </select>
            {errors.event_id && <p className="text-red-500 text-sm">{errors.event_id.message}</p>}
          </div>

          <div>
            <label className="block mb-1">Title</label>
            <input
              {...register('title', { required: 'Title is required' })}
              className="w-full border px-3 py-2 rounded"
              placeholder="VIP Ticket"
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
          </div>

          <div>
            <label className="block mb-1">Amount</label>
            <input
              type="number"
              
              {...register('amount', { required: 'Amount is required', min: 0 })}
              className="w-full border px-3 py-2 rounded"
              placeholder="1500.00"
            />
            {errors.amount && <p className="text-red-500 text-sm">{errors.amount.message}</p>}
          </div>

          <div>
            <label className="block mb-1">Available Quantity</label>
            <input
              type="number"
              {...register('available_quantity', { required: 'Quantity is required', min: 0 })}
              className="w-full border px-3 py-2 rounded"
              placeholder="50"
            />
            {errors.available_quantity && <p className="text-red-500 text-sm">{errors.available_quantity.message}</p>}
          </div>

          <div>
            <label className="block mb-1">Description</label>
            <textarea
              {...register('description')}
              className="w-full border px-3 py-2 rounded"
              rows={3}
              placeholder="You can be fronted of the stage"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Sale Start Date</label>
              <input
                type="date"
                {...register('sale_start_date', { required: 'Sale start date is required' })}
                className="w-full border px-3 py-2 rounded"
              />
              {errors.sale_start_date && <p className="text-red-500 text-sm">{errors.sale_start_date.message}</p>}
            </div>
            <div>
              <label className="block mb-1">Sale End Date</label>
              <input
                type="date"
                {...register('sale_end_date', { required: 'Sale end date is required' })}
                className="w-full border px-3 py-2 rounded"
              />
              {errors.sale_end_date && <p className="text-red-500 text-sm">{errors.sale_end_date.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Start Time</label>
              <input
                type="time"
                {...register('start_time', { required: 'Start time is required' })}
                className="w-full border px-3 py-2 rounded"
              />
              {errors.start_time && <p className="text-red-500 text-sm">{errors.start_time.message}</p>}
            </div>
            <div>
              <label className="block mb-1">End Time</label>
              <input
                type="time"
                {...register('end_time', { required: 'End time is required' })}
                className="w-full border px-3 py-2 rounded"
              />
              {errors.end_time && <p className="text-red-500 text-sm">{errors.end_time.message}</p>}
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 rounded"
            >
              {editingItem ? 'Update' : 'Create'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default TicketFormModal;
