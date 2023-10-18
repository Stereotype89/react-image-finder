import { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import fetchImages from '../services/image-fetch-api';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [queryString, setQueryString] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageForModal, setImageForModal] = useState('');

  const handleFormSubmit = queryString => {
    setImages([]);
    setPage(1);
    setQueryString(queryString);
  };

  useEffect(() => {
    if (!queryString) {
      return;
    }
    const getImages = async () => {
      try {
        setIsLoading(true);
        const { hits } = await fetchImages(queryString, page);
        setImages(prevImages => [...prevImages, ...hits]);
      } catch (error) {
        setError(error.message);
        toast.error(`Fetch error: ${error}`);
      } finally {
        setIsLoading(false);
      }
    };

    getImages();
  }, [queryString, page]);

  useEffect(() => {
    if (page > 1) {
      window.scrollTo({
        top: document.body.scrollHeight,
        left: 0,
        behavior: 'smooth',
      });
    }
  });

  const handleImageClick = imageLink => {
    setImageForModal(imageLink);
    toggleModal();
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const toggleModal = () => {
    setIsModalOpen(prevState => !prevState);

    if (isModalOpen) {
      setImageForModal('');
    }
  };

  const isImages = images.length > 0;

  return (
    <>
      <Searchbar onSubmit={handleFormSubmit} />
      {isImages && (
        <ImageGallery images={images} onImageClick={handleImageClick} />
      )}
      {isImages && isLoading === false && <Button onClick={handleLoadMore} />}
      {isLoading && <Loader />}
      {isModalOpen && (
        <Modal
          image={imageForModal}
          description={queryString}
          onClose={toggleModal}
        />
      )}
      {error && <ToastContainer autoClose={3000} />}
    </>
  );
}
