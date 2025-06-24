import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { AuthUpdate, EventPOstAuth, RelatedMutate } from '../../../../Services/Auth';
import toast from 'react-hot-toast';

const FaqFormModal = ({ show, editingItem, onClose, setFaqs,events }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (editingItem) {
      reset({
        event_id: editingItem.event_id || '',
        question: editingItem.question || '',
        answer: editingItem.answer || '',
      });
    } else {
      reset({
        event_id: '',
        question: '',
        answer: '',
      });
    }
  }, [editingItem, reset]);

  if (!show) return null;

  const action = editingItem ? "Edit" : "Add";

  const onFormSubmit = async (data) => {
    let response;

 
      if (editingItem) {
        // Update
        response = await AuthUpdate('faq', editingItem.id, data);
      } else {
        // Create
        response = await EventPOstAuth(`${import.meta.env.VITE_API_URL}/faq`, data);
      }
await RelatedMutate('faq', setFaqs);
console.log(response.statusCode);
      if (response.statusCode === 200) {
      
        onClose();
      
  };
}

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
        <h3 className="text-lg font-medium text-gray-900 mb-4">{action} FAQ</h3>
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1">Event ID</label>
           <select className="w-full border px-3 py-2 rounded" {...register('event_id', { required: 'Event ID is required' })}  id="">
                <option value="">Select Event</option>
                {events.map((event) => (
                  <option selected={event?.id === editingItem?.event_id} key={event.id} value={event.id}>
                    {event.title}
                  </option>
                ))}
            </select>
             {errors.event_id && (
              <p className="text-red-500 text-sm">{errors.event_id.message}</p>
            )}
           
           
          </div>

          <div>
            <label className="block mb-1">Question</label>
            <input
              type="text"
              {...register('question', { required: 'Question is required' })}
              className="w-full border px-3 py-2 rounded"
            />
            {errors.question && (
              <p className="text-red-500 text-sm">{errors.question.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1">Answer</label>
            <textarea
              {...register('answer', { required: 'Answer is required' })}
              className="w-full border px-3 py-2 rounded h-32"
            />
            {errors.answer && (
              <p className="text-red-500 text-sm">{errors.answer.message}</p>
            )}
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              {editingItem ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FaqFormModal;
