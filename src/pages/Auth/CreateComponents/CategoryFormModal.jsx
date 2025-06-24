import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { AuthUpdate, EventPOstAuth, RelatedMutate } from '../../../../Services/Auth';
import toast from 'react-hot-toast';

const CategoryFormModal = ({ show, editingItem, onClose ,setCategories}) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    if (editingItem) {
      reset({
        name: editingItem.name || '',
        description: editingItem.description || '',
      });
    } else {
      reset({
        name: '',
        description: '',
      });
    }
  }, [editingItem, reset]);

  if (!show) return null;
  const action = editingItem ? "Edit" : "Add";

  const onSubmit =async (data) => {
    let response;
     if (editingItem) {
          // If editing, call update API
          response = await AuthUpdate('category', editingItem.id,data);
        } else {
          // If adding, call create API
          response=await EventPOstAuth(`${import.meta.env.VITE_API_URL}/category`, data);
          
        }
     
    RelatedMutate('category',setCategories)
     if(response.statusCode===200){
       
       
            
               onClose();
    }
    
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
        <h3 className="text-lg font-medium text-gray-900 mb-4">{action} Category</h3>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          <div>
            <label className="block mb-1">Name</label>
            <input
              type="text"
              {...register('name', { required: 'Name is required' })}
              className="w-full border px-3 py-2 rounded"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block mb-1">Description</label>
            <textarea
              {...register('description', { required: 'Description is required' })}
              className="w-full border px-3 py-2 rounded"
              rows="4"
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
          </div>

          <div className="flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
              {editingItem ? 'Update' : 'Create'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CategoryFormModal;
