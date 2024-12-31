import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./twoToolBar.css";

const TwoToolBar = ({ icons }) => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <div className={`scroll-toolbar ${isVisible ? "visible" : ""}`}>
      <a className="backButton2Tool" onClick={() => navigate(-1)}>
        <img
          src="https://app.iapps.ir/images/icon-back.svg"
          alt="بازگشت"
          className="viewNavigationBar2"
        />
      </a>
    
      {icons.length > 0 && (
        <div className="appItems">
          {icons.map((iconUrl, index) => (
            <div className="appIcon2PageToolbar" key={index}>
              <img src={iconUrl} alt={`Icon ${index}`} />
            </div>
          ))}
        </div>
      )}

      <div className="appDownloadButton2Tool">
        <button type="button" id="app-download-button" className="buttonTool">
          دریافت
        </button>
      </div>
      
    </div>
  );
};

export default TwoToolBar;
