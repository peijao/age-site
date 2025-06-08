import React from "react";

const Watermark = ({ logo }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        opacity: 0.06,
        pointerEvents: "none",
        userSelect: "none",
        width: "65vw",
        maxWidth: 1000,
        height: "auto",
        zIndex: 9999, // поверх всего контента
        animation: "watermarkMove 20s ease-in-out infinite",
      }}
    >
      <img
        src={logo}
        alt="Watermark"
        style={{
          width: "100%",
          height: "auto",
          filter: "grayscale(100%)",
        }}
      />
      <style>{`
        @keyframes watermarkMove {
          0%, 100% {
            transform: translate(-50%, -50%) translateX(-30px);
          }
          50% {
            transform: translate(-50%, -50%) translateX(30px);
          }
        }
      `}</style>
    </div>
  );
};

export default Watermark;
