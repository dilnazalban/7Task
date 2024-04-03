import React, { useState, useEffect } from 'react';

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const [loadTime, setLoadTime] = useState(null);
  const [imageLoadTimes, setImageLoadTimes] = useState({});
  const [startTime, setStartTime] = useState(null); 

  useEffect(() => {
    const fetchImages = async () => {
      const startTime = performance.now(); 
      try {
        const response = await fetch('https://api.unsplash.com/photos/random/?client_id=b1KjoRNXtrd8T_7ez79iHdP5zcEKF4b9fAIr0yFjM30&count=10');
        const data = await response.json();
        setImages(data);
        const endTime = performance.now();
        const timeElapsed = endTime - startTime;
        setLoadTime(timeElapsed);
        setStartTime(startTime); 
        measureImageLoadTimes(data); 
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  const measureImageLoadTimes = (images) => {
    const imageLoadTimes = {};
    images.forEach(image => {
      const img = new Image();
      img.src = image.urls.small;
      img.onload = () => {
        const endTime = performance.now();
        const loadTime = endTime - startTime; 
        imageLoadTimes[image.id] = loadTime;
        setImageLoadTimes(imageLoadTimes);
      };
    });
  };

  return (
    <div>
      {loadTime && <div>Load Time: {loadTime.toFixed(2)} milliseconds</div>}
      <div className="image-gallery">
        {images.map(image => (
          <div key={image.id} className="image-item">
            <img
              src={image.urls.small}
              alt={image.alt_description}
              onLoad={() => {
                const endTime = performance.now();
                const loadTime = endTime - startTime; 
                setImageLoadTimes(prevImageLoadTimes => ({
                  ...prevImageLoadTimes,
                  [image.id]: loadTime
                }));
              }}
            />
            {imageLoadTimes[image.id] && (
              <div>Image Load Time: {imageLoadTimes[image.id].toFixed(2)} milliseconds</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;