import React, { useState } from 'react';
import SearchBar from './SearchBar';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import LoadMoreBtn from './LoadMoreBtn';
import ImageModal from './ImageModal';
import ErrorMessage from './ErrorMessage';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import "./App.css"
const App = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [modalImage, setModalImage] = useState(null);

  const fetchImages = async (query, page) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`https://api.unsplash.com/search/photos`, {
        params: { query, page, per_page: 12, orientation: 'landscape' },
        headers: {
          Authorization: `Client-ID IAPoAm_WfHwWd5X8jSOR1FO58wf7-po55kp2wVTHggQ`,
        },
      });

      const newImages = response.data.results;
      if (newImages.length === 0) {
        toast.error('No images found.');
      }

      setImages((prevImages) => [...prevImages, ...newImages]);
    } catch (error) {
      setError('Failed to fetch images.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (searchQuery) => {
    if (!searchQuery.trim()) {
      toast.error('Please enter a search term.');
      return;
    }

    setQuery(searchQuery);
    setImages([]);
    setPage(1);
    fetchImages(searchQuery, 1);
  };

  const loadMoreImages = () => {
    fetchImages(query, page + 1);
    setPage((prevPage) => prevPage + 1);
  };

  const openModal = (image) => {
    setModalImage(image);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  return (
    <div>
      <Toaster />
      <SearchBar onSubmit={handleSearchSubmit} />
      {error && <ErrorMessage message={error} />}
      <ImageGallery images={images} onImageClick={openModal} />
      {loading && <Loader />}
      {images.length > 0 && !loading && <LoadMoreBtn onClick={loadMoreImages} />}
      {modalImage && <ImageModal image={modalImage} onClose={closeModal} />}
    </div>
  );
};

export default App;
