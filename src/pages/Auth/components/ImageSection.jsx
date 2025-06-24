import React, { useEffect, useState } from 'react';
import { RelatedMutateNormal } from '../../../../Services/Auth';

const ImageSection = ({ images, openModal, handleDelete, setImages }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredImages, setFilteredImages] = useState([]);

  useEffect(() => {
    RelatedMutateNormal('image', setImages);
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredImages(images);
    } else {
      const filtered = images.filter(image =>
        (image.event?.title || '').toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredImages(filtered);
    }
  }, [searchTerm, images]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Images Management</h1>

        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search by event name..."
            className="border px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <button
            onClick={() => openModal("image")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            + Add Image
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredImages.length > 0 ? (
          filteredImages.map((image) => (
            <div key={image.id} className="bg-white rounded-lg shadow overflow-hidden">
              <img
                src={image.url || "/placeholder.svg"}
                alt={image.alt_text}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 space-y-2">
                <p className="font-semibold text-gray-700">{image.event?.title || 'No Event Title'}</p>
                <p className="text-sm text-gray-500">{image.event?.description || 'No Description'}</p>
                <p className="text-sm text-gray-500">
                  <strong>Date:</strong> {image.event?.start_date} - {image.event?.end_date}
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Location:</strong> {image.event?.location}
                </p>

                <div className="flex justify-end pt-3">
                  <button
                    onClick={() => handleDelete("image", image.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-400 py-10">
            No images found for this event.
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageSection;
