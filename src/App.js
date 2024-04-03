import React from 'react';
import './styles/style.css';
import ImageGallery from './components/Gallery';
import LazyImage from './components/LazyLoading';
import CriticalImagePreloader from './components/ImagePreloader';

function App() {
  return (
    <div className="App">
      <CriticalImagePreloader src="link_to_critical_image.jpg" />
      <LazyImage />
      <ImageGallery />
      <h4>	&copy; Dilnaz Alban</h4>
    </div>
  );
}

export default App;
