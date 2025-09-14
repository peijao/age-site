import { useState, useEffect, useRef } from "react";

const useModalGallery = (schemas) => {
  const [modalIndex, setModalIndex] = useState(null);
  const [zoomed, setZoomed] = useState(false);
  const imageRef = useRef(null);
  const prevZoomed = useRef(false);

  useEffect(() => {
    document.body.style.overflow = modalIndex !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [modalIndex]);

  useEffect(() => {
    if (imageRef.current && zoomed && !prevZoomed.current) {
      const container = imageRef.current.parentElement;
      const img = imageRef.current;
      container.scrollTo({
        left: img.offsetWidth / 2 - container.clientWidth / 2,
        top: img.offsetHeight / 2 - container.clientHeight / 2,
        behavior: "smooth",
      });
    }
    prevZoomed.current = zoomed;
  }, [zoomed]);

  const openModal = (index) => {
    setModalIndex(index === modalIndex ? null : index);
    setZoomed(false);
  };

  const closeModal = () => {
    setModalIndex(null);
    setZoomed(false);
  };

  const navigateModal = (direction) => {
    setZoomed(false);
    setModalIndex((prev) => {
      const nextIndex =
        direction === "next"
          ? (prev + 1) % schemas.length
          : (prev - 1 + schemas.length) % schemas.length;
      return nextIndex;
    });
  };

  const toggleZoom = (e) => {
    e.stopPropagation();
    setZoomed((z) => !z);
  };

  return {
    modalIndex,
    zoomed,
    imageRef,
    openModal,
    closeModal,
    navigateModal,
    toggleZoom,
  };
};

export default useModalGallery;
