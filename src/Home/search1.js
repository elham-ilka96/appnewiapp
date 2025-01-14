import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./search1.css";
import ToolBar from "../components/ToolBar";
import Loading from "../components/loading";

function Search1() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true); // مقدار اولیه به true برای بارگذاری داده‌ها

  useEffect(() => {
    // ارسال درخواست برای دریافت داده‌ها
    fetch("https://api.iapps.ir/apps/search/trends")
      .then((response) => response.json())
      .then((data) => {
        if (data && Array.isArray(data)) {
          setItems(data); // اگر داده‌ها یک آرایه از آیتم‌ها هستند
        } else if (data && data.title) {
          setItems([data]); // اگر فقط یک شیء است، آن را در آرایه قرار می‌دهیم
        } else {
          setItems([]); // اگر داده‌ها درست نباشند، آرایه خالی قرار می‌دهیم
        }
        setLoading(false); // پس از دریافت داده‌ها، مقدار loading به false تغییر می‌کند
      })
      .catch((error) => {
        console.error("Error fetching trends:", error);
        setItems([]); // در صورت خطا، آرایه خالی قرار می‌دهیم
        setLoading(false); // حتی در صورت خطا باید مقدار loading به false تغییر کند
      });
  }, []);

  const handleClick = (item) => {
    // ارسال title به AppInfo
    navigate(`/searchItemDetail/${encodeURIComponent(item.title)}`);
  };

  if (loading) {
    return <Loading />; // اگر در حال بارگذاری داده‌ها هستیم، نمایش کامپوننت Loading
  }

  return (
    <div className="app">
      <ToolBar />

      <div className="trends">
        <h2>بیشترین جستجوها</h2>
        {items.length > 0 ? (
          items.map((item) => {
            return (
              <div
                key={item.title}
                className="swiperSlide"
                onClick={() => handleClick(item)}
              >
                <div className="searchTrend">
                  <span className="titleBanner">{item.title}</span>
                </div>
              </div>
            );
          })
        ) : (
          <p>هیچ بنری برای نمایش وجود ندارد.</p>
        )}
      </div>
    </div>
  );
}

export default Search1;
