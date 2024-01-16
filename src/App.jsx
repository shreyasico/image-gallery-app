import React, { useState, useEffect } from 'react';


const ACCESS_KEY = 'NmJEYvz1O699rfa-DmlX3ahNl5h_dvhPB3Wz9ytaATg'; // Replace with your Unsplash API key
const API_URL = `https://api.unsplash.com/photos?client_id=${ACCESS_KEY}`;

const ImageGallery = ({ images, onImageClick }) => {
  return (
    <div className="gallery">
      {images.map((image, index) => (
        <img
          key={index}
          src={image.urls.small}
          alt={image.alt_description || `Image ${index + 1}`}
          onClick={() => onImageClick(index)}
        />
      ))}
    </div>
  );
};

const App = () => {
  const [images, setImages] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const fetchImages = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setImages(data);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  useEffect(() => {
    // Fetch images on initial mount
    fetchImages();
  }, []);

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
  };

  return (
    <div className="app">
      <h1>Image Gallery</h1>
      <ImageGallery images={images} onImageClick={handleImageClick} />
      {selectedImageIndex !== null && (
        <div className="selected-image">
          <img
            src={images[selectedImageIndex].urls.full}
            alt={images[selectedImageIndex].alt_description || `Selected Image ${selectedImageIndex + 1}`}
          />
        </div>
      )}
    </div>
  );
};

export default App;
