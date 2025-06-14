import React, { useState, useRef, useEffect } from "react";

const ModalGallery = ({ modalIndex, schemas, closeModal, navigateModal }) => {
  const [zoomed, setZoomed] = useState(false);
  const imageRef = useRef(null);
  const containerRef = useRef(null);
  const prevZoomed = useRef(false);
  const zoomFactor = 3;

  const centerScroll = () => {
    const container = containerRef.current;
    const image = imageRef.current;

    if (container && image) {
      const scrollLeft = (image.offsetWidth - container.clientWidth) / 2;
      const scrollTop = (image.offsetHeight - container.clientHeight) / 2;
      container.scrollTo({ left: scrollLeft, top: scrollTop, behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (zoomed && !prevZoomed.current) {
      setTimeout(centerScroll, 100);
    }
    prevZoomed.current = zoomed;
  }, [zoomed]);

  useEffect(() => {
    document.body.style.overflow = modalIndex !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [modalIndex]);

  if (modalIndex === null) return null;

  const stop = (e) => e.stopPropagation();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
      onClick={closeModal}
    >
      <button
        className="absolute top-4 right-4 text-white text-3xl font-bold bg-black bg-opacity-70 rounded p-1"
        onClick={(e) => {
          stop(e);
          closeModal();
        }}
      >
        &times;
      </button>

      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-3xl font-bold bg-black bg-opacity-70 rounded p-1"
        onClick={(e) => {
          stop(e);
          navigateModal("prev");
        }}
      >
        ‹
      </button>

      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-3xl font-bold bg-black bg-opacity-70 rounded p-1"
        onClick={(e) => {
          stop(e);
          navigateModal("next");
        }}
      >
        ›
      </button>

      <div
        ref={containerRef}
        className="overflow-auto bg-black"
        style={{
          width: "90vw",
          height: "90vh",
          cursor: zoomed ? "zoom-out" : "zoom-in",
        }}
        onClick={stop}
      >
        <div style={{ width: "fit-content", height: "fit-content" }}>
          <img
            ref={imageRef}
            src={schemas[modalIndex]}
            alt={`Схема ${modalIndex + 1}`}
            onClick={() => setZoomed((prev) => !prev)}
            style={{
              maxWidth: "none",
              width: zoomed ? `${zoomFactor * 100}%` : "100%",
              height: "auto",
              display: "block",
              transition: "all 0.3s ease",
              userSelect: "none",
            }}
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
};

export default ModalGallery;
