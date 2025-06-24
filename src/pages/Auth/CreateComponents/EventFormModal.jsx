import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { AuthUpdate, EventPOstAuth, RelatedMutate } from '../../../../Services/Auth';
import toast from 'react-hot-toast';

const EventFormModal = ({ show, editingItem, onClose, categories, types,setEvents }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    if (editingItem) {
       const formatTime = (timeStr) => {
    if (!timeStr) return '';
    return timeStr.slice(0, 5); // keep only 'HH:mm'
  };
      reset({
        title: editingItem.title || '',
        location: editingItem.location || '',
        start_date: editingItem.start_date || '',
        end_date: editingItem.end_date || '',
        start_time:  formatTime(editingItem.start_time) || '',
        end_time: formatTime(editingItem.end_time) || '',
        description: editingItem.description || '',
        googleMap: editingItem.googleMap || '',
        price: editingItem.price || 'free',
        category_id: editingItem.category_id || '',
        type_id: editingItem.type_id || '',
      });
    } else {
      reset({
        title: '',
        location: '',
        start_date: '',
        end_date: '',
        start_time: '',
        end_time: '',
        description: '',
        googleMap: '',
        price: 'free',
        category_id: '',
        type_id: '',
      });
    }
  }, [editingItem, reset]);

  if (!show) return null;

  const onSubmit = async (data) => {
    let response;
         if (editingItem) {
              // If editing, call update API
              response = await AuthUpdate('event', editingItem.id,data);
            } else {
              // If adding, call create API
             response=await EventPOstAuth(`${import.meta.env.VITE_API_URL}/event`, data);
             
         
            }
               RelatedMutate('event',setEvents)
    
    console.log(response);
    if(response.statusCode===200){
       
             onClose();
             
    }
      
   
   
  };

  const titleText = `${editingItem ? 'Edit' : 'Add'} Event`;

  return (
   <div className="fixed inset-0 bg-gray-400 bg-opacity-40 flex justify-center items-center overflow-y-auto z-50">
  <div className="bg-white rounded-lg shadow-lg w-full max-w-6xl my-12 p-6 max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-medium text-gray-900 mb-4">{titleText}</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* Title */}
          <div>
            <label className="block mb-1">Title</label>
            <input
              {...register('title', { required: 'Title is required' })}
              className="w-full border px-3 py-2 rounded"
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
          </div>

          {/* Location */}
          <div>
            <label className="block mb-1">Location</label>
            <input
              {...register('location', { required: 'Location is required' })}
              className="w-full border px-3 py-2 rounded"
            />
            {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
          </div>

          {/* Category & Type */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Category</label>
              <select
                {...register('category_id', { required: 'Category is required' })}
                className="w-full border px-3 py-2 rounded"
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
              {errors.category_id && <p className="text-red-500 text-sm">{errors.category_id.message}</p>}
            </div>

            <div>
              <label className="block mb-1">Type</label>
              <select
                {...register('type_id', { required: 'Type is required' })}
                className="w-full border px-3 py-2 rounded"
              >
                <option value="">Select Type</option>
                {types.map((type) => (
                  <option key={type.id} value={type.id}>{type.name}</option>
                ))}
              </select>
              {errors.type_id && <p className="text-red-500 text-sm">{errors.type_id.message}</p>}
            </div>
          </div>

          {/* Start & End Date */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Start Date</label>
              <input
                type="date"
                {...register('start_date', { required: 'Start date is required' })}
                className="w-full border px-3 py-2 rounded"
              />
              {errors.start_date && <p className="text-red-500 text-sm">{errors.start_date.message}</p>}
            </div>
            <div>
              <label className="block mb-1">End Date</label>
              <input
                type="date"
                {...register('end_date', { required: 'End date is required' })}
                className="w-full border px-3 py-2 rounded"
              />
              {errors.end_date && <p className="text-red-500 text-sm">{errors.end_date.message}</p>}
            </div>
          </div>

          {/* Start & End Time */}
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

          {/* Price */}
          <div>
            <label className="block mb-1">Price</label>
            <select
              {...register('price', { required: 'Price is required' })}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="free">Free</option>
              <option value="paid">Paid</option>
            </select>
            {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
          </div>

          {/* Google Map */}
          <div>
            <label className="block mb-1">Google Map Embed URL</label>
            <input
              {...register('googleMap', { required: 'Google map embed URL is required' })}
              className="w-full border px-3 py-2 rounded"
            />
            {errors.googleMap && <p className="text-red-500 text-sm">{errors.googleMap.message}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1">Description</label>
            <textarea
              {...register('description')}
              className="w-full border px-3 py-2 rounded"
              rows="4"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button type="button" onClick={onClose} className="flex-1 bg-gray-300 py-2 rounded">
              Cancel
            </button>
            <button type="submit" className="flex-1 bg-blue-600 text-white py-2 rounded">
              {editingItem ? 'Update' : 'Create'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default EventFormModal;
