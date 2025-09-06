import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

export const ModalGallery = ({ modalIndex, schemas, closeModal, navigateModal }) => {
  const imageRef = useRef(null);
  const containerRef = useRef(null);
  const [zoomed, setZoomed] = useState(false);
  const [zoomTransform, setZoomTransform] = useState("");
  const zoomFactor = 3;

  const isOpen = modalIndex !== null;
  const currentItem = isOpen ? schemas[modalIndex] : null;

  const handleImageClick = (e) => {
    e.stopPropagation();
    
    if (zoomed) {
      setZoomed(false);
      setZoomTransform("");
    } else {
      const container = containerRef.current;
      const image = imageRef.current;
      
      if (container && image) {
        const containerRect = container.getBoundingClientRect();
        const imageRect = image.getBoundingClientRect();
        
        // Calculate click position relative to the image
        const clickX = e.clientX - imageRect.left;
        const clickY = e.clientY - imageRect.top;
        
        // Calculate relative position (0-1)
        const relativeX = clickX / imageRect.width;
        const relativeY = clickY / imageRect.height;
        
        // Calculate the image's current position relative to container center
        const imageCenterX = imageRect.left + imageRect.width / 2;
        const imageCenterY = imageRect.top + imageRect.height / 2;
        const containerCenterX = containerRect.left + containerRect.width / 2;
        const containerCenterY = containerRect.top + containerRect.height / 2;
        
        // Current offset of image center from container center
        const currentOffsetX = imageCenterX - containerCenterX;
        const currentOffsetY = imageCenterY - containerCenterY;
        
        // Calculate where the clicked point will be after scaling
        const scaledImageWidth = imageRect.width * zoomFactor;
        const scaledImageHeight = imageRect.height * zoomFactor;
        
        // Position of clicked point relative to the new scaled image center
        const clickOffsetFromCenterX = (relativeX - 0.5) * scaledImageWidth;
        const clickOffsetFromCenterY = (relativeY - 0.5) * scaledImageHeight;
        
        // Calculate final translation to center the clicked point
        const translateX = currentOffsetX - clickOffsetFromCenterX;
        const translateY = currentOffsetY - clickOffsetFromCenterY;
        
        setZoomTransform(`translate(${translateX}px, ${translateY}px) scale(${zoomFactor})`);
        setZoomed(true);
      }
    }
  };

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
      setZoomTransform("");
    } else {
      closeModal();
    }
  };

  if (!isOpen || !currentItem) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center"
        onClick={handleBackdropClick}
      >
        {/* Close Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10 bg-black bg-opacity-50 rounded-full p-2"
          onClick={(e) => {
            e.stopPropagation();
            closeModal();
          }}
        >
          <XMarkIcon className="w-6 h-6" />
        </motion.button>

        {/* Navigation Buttons */}
        {schemas.length > 1 && (
          <>
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10 bg-black bg-opacity-50 rounded-full p-2"
              onClick={(e) => {
                e.stopPropagation();
                navigateModal('prev');
              }}
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </motion.button>

            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10 bg-black bg-opacity-50 rounded-full p-2"
              onClick={(e) => {
                e.stopPropagation();
                navigateModal('next');
              }}
            >
              <ChevronRightIcon className="w-6 h-6" />
            </motion.button>
          </>
        )}

        {/* Image Container */}
        <motion.div
          ref={containerRef}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative overflow-hidden bg-black flex items-center justify-center"
          style={{
            width: "90vw",
            height: "90vh",
            cursor: zoomed ? "zoom-out" : "zoom-in",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <motion.img
            ref={imageRef}
            key={modalIndex}
            src={currentItem}
            alt={`Схема ${modalIndex + 1}`}
            onClick={handleImageClick}
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              display: "block",
              transition: "transform 0.3s ease",
              transform: zoomTransform || "scale(1)",
              userSelect: "none",
            }}
            draggable={false}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        {/* Image Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black bg-opacity-70 text-white px-4 py-2 rounded-lg"
        >
          <p className="text-sm text-gray-300">
            {modalIndex + 1} / {schemas.length}
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ModalGallery;

