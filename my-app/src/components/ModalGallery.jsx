import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

export const ModalGallery = ({ modalIndex, schemas, closeModal, navigateModal }) => {
  const imageRef = useRef(null);
  const containerRef = useRef(null);
  const [zoomed, setZoomed] = useState(false);
  const [lastClick, setLastClick] = useState(null);
  const zoomFactor = 3;

  const isOpen = modalIndex !== null;
  const currentItem = isOpen ? schemas[modalIndex] : null;

  const handleImageClick = (e) => {
    e.stopPropagation();
    let clientX, clientY;
    if (e.type === 'touchend' && e.changedTouches && e.changedTouches.length > 0) {
      clientX = e.changedTouches[0].clientX;
      clientY = e.changedTouches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    setLastClick({ clientX, clientY });
    setZoomed((z) => !z);
  };

  useEffect(() => {
    if (zoomed && lastClick) {
      setTimeout(() => {
        const container = imageRef.current.parentElement;
        const img = imageRef.current;
        const rect = img.getBoundingClientRect();
        const x = lastClick.clientX - rect.left;
        const y = lastClick.clientY - rect.top;
        const newX = x * zoomFactor;
        const newY = y * zoomFactor;
        const scrollX = Math.max(0, newX - container.clientWidth / 2);
        const scrollY = Math.max(0, newY - container.clientHeight / 2);
        container.scrollLeft = scrollX;
        container.scrollTop = scrollY;
      }, 0);
    }
  }, [zoomed, lastClick]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'Escape':
          closeModal();
          break;
        case 'ArrowLeft':
          navigateModal('prev');
          break;
        case 'ArrowRight':
          navigateModal('next');
          break;
        case ' ':
          e.preventDefault();
          handleImageClick(e);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [isOpen, closeModal, navigateModal, zoomed]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleBackdropClick = () => {
    if (zoomed) {
      setZoomed(false);
    } else {
      closeModal();
    }
  };

  if (!isOpen || !currentItem) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 px-1 sm:px-2" onClick={handleBackdropClick}>
      <div className="bg-gray-900 rounded-2xl w-full max-w-[90vw] max-h-[98vh] relative overflow-hidden shadow-2xl border-2 border-gray-800" onClick={e => e.stopPropagation()}>
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 bg-gray-800 text-gray-200 hover:text-white rounded-full shadow-md w-10 h-10 flex items-center justify-center z-10"
          aria-label="Close modal"
          type="button"
        >
          &times;
        </button>
        {schemas.length > 1 && (
          <>
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-gray-800 text-gray-200 hover:text-white rounded-full shadow-md w-10 h-10 flex items-center justify-center z-10"
              aria-label="Предыдущая схема"
              type="button"
              onClick={e => {
                e.stopPropagation();
                setZoomed(false);
                navigateModal('prev');
              }}
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-800 text-gray-200 hover:text-white rounded-full shadow-md w-10 h-10 flex items-center justify-center z-10"
              aria-label="Следующая схема"
              type="button"
              onClick={e => {
                e.stopPropagation();
                setZoomed(false);
                navigateModal('next');
              }}
            >
              <ChevronRightIcon className="w-6 h-6" />
            </button>
          </>
        )}
  <div className="w-full h-[90vh] flex items-center justify-center">
          <div className={zoomed ? "overflow-auto w-full h-full" : "w-full h-full flex items-center justify-center"} style={{width: "100%", height: "100%"}}>
            <img
              ref={imageRef}
              key={modalIndex}
              src={currentItem}
              alt={`Схема ${modalIndex + 1}`}
              onClick={handleImageClick}
              onTouchEnd={handleImageClick}
              style={{
                width: zoomed ? `${zoomFactor * 100}%` : "auto",
                height: zoomed ? `${zoomFactor * 100}%` : "auto",
                maxWidth: zoomed ? "none" : "100%",
                maxHeight: zoomed ? "none" : "100%",
                display: "block",
                objectFit: "contain",
                margin: zoomed ? 0 : "auto",
                cursor: zoomed ? "zoom-out" : "zoom-in",
              }}
              draggable={false}
            />
          </div>
        </div>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black bg-opacity-70 text-white px-4 py-2 rounded-lg">
          <p className="text-sm text-gray-300">
            {modalIndex + 1} / {schemas.length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ModalGallery;

