import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaTrash } from 'react-icons/fa';
import { EventPOstAuth, ImagePostAuth, RelatedMutate } from '../../../../Services/Auth';
import toast from 'react-hot-toast';

const ImageFormModal = ({ show, editingItem, setImages, onClose,events }) => {

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  useEffect(() => {
    if (editingItem) {
      // Edit mode: usually no file re-upload
      setSelectedFiles([]);
      setPreviewImages([editingItem.url]);
      reset({ alt_text: editingItem.alt_text || '' });
    } else {
      setSelectedFiles([]);
      setPreviewImages([]);
      reset({ alt_text: '' });
    }
  }, [editingItem, reset]);

  if (!show) return null;

  const onSubmit = async (data) => {
  
    const formData = new FormData();
    formData.append('event_id',data.event_id);
    console.log(selectedFiles)
    
selectedFiles.forEach((file, index) => {
  formData.append(`image[${index}]`, file);
});



 const res=await ImagePostAuth(`${import.meta.env.VITE_API_URL}/image`, formData);

    console.log(res);

    if (res.statusCode === 200) {
      toast.success(res.message);
      
      RelatedMutate('image',setImages);
    onClose();
      
    }

  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map(file => ({
      file,
      url: URL.createObjectURL(file),
    }));

    setSelectedFiles(prev => [...prev, ...files]);
    setPreviewImages(prev => [...prev, ...previews]);
    setValue('images', [...selectedFiles, ...files]);
  };

  const handleRemoveImage = (index) => {
    const updatedPreviews = [...previewImages];
    updatedPreviews.splice(index, 1);

    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);

    setPreviewImages(updatedPreviews);
    setSelectedFiles(updatedFiles);
    setValue('images', updatedFiles);
  };

  const action = editingItem ? 'Edit' : 'Add';

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50 p-4 overflow-auto">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
        <h3 className="text-lg font-medium text-gray-900 mb-4">{action} Image</h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          <div>
            <label className="block mb-1">Event Name</label>
            <select {...register('event_id')} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition">
                <option value="">Select Alt Text</option>
                {events?.map((event) => (
                  <option key={event.id} value={event.id}>
                    {event.title}
                  </option>
                ))}
              </select>
          </div>



          {!editingItem && (
            <div>
              <label className="block mb-1">Upload Images</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="w-full"
              />
            </div>
          )}

          {previewImages.length > 0 && (
            <div className="grid grid-cols-2 gap-4 mt-2">
              {previewImages.map((img, idx) => (
                <div key={idx} className="relative group">
                  <img src={img.url || img} alt="Preview" className="w-full h-32 object-cover rounded" />
                  {!editingItem && (
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 shadow hover:bg-red-700"
                    >
                      <FaTrash size={12} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}

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

export default ImageFormModal;
