import React, { useState, useEffect } from "react";
import "./loading.css";

const Loading = () => {
  const [dots, setDots] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev === 3 ? 0 : prev + 1));
    }, 500); // تغییر تعداد نقاط هر 500 میلی‌ثانیه
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-container">
      <div className="dots">
        {Array.from({ length: dots }).map((_, index) => (
          <span key={index} className="dot"></span>
        ))}
      </div>
      <p>لطفا صبر کنید</p>
    </div>
  );
};

export default Loading;
