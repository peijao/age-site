import React, { useEffect, useState } from "react";
import logoLight from "../../assets/img/logo.png";
import logoDark from "../../assets/img/logo-white.png";

const Watermark = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    const currentTheme = localStorage.getItem("theme");

    if (currentTheme === "dark") {
      html.classList.add("dark");
      setIsDark(true);
    } else {
      html.classList.remove("dark");
      setIsDark(false);
    }

    const observer = new MutationObserver(() => {
      setIsDark(html.classList.contains("dark"));
    });

    observer.observe(html, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  const logo = isDark ? logoDark : logoLight;

  return (
    <>
      <div className="watermark">
        <img
          src={logo}
          alt="Watermark"
          style={{
            width: "100%",
            height: "auto",
            filter: "grayscale(100%)",
            userSelect: "none",
            pointerEvents: "none",
          }}
          draggable={false}
        />
      </div>
      <style>{`
        .watermark {
          position: fixed;
          top: 50%;
          left: 50%;
          width: 65vw;
          max-width: 1000px;
          height: auto;
          opacity: 0.06;
          z-index: 9999;
          user-select: none;
          pointer-events: none;
          transform: translate(-50%, -50%);
          animation: watermarkMove 20s ease-in-out infinite;
        }

        @keyframes watermarkMove {
          0%, 100% {
            transform: translate(-50%, -50%) translateX(-30px);
          }
          50% {
            transform: translate(-50%, -50%) translateX(30px);
          }
        }
      `}</style>
    </>
  );
};

export default Watermark;
