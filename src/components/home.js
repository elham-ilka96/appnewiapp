import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./home.css";
import ToolBar from "./ToolBar";
import Loading from "./loading";

function Home() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://api.iapps.ir/apps/featured/home")
      .then((response) => setData(response.data))
      .catch(() => setError("خطا در بارگذاری داده‌ها"));
  }, []);

  const openItemDetail = (externalNumericId, externalId) => {
    navigate("/item-detail2", { state: { externalNumericId, externalId } });
   
  };

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!data) {
    return <Loading />;
  }




  const renderAppListingSection = (sectionData, sectionIndex) => (
    <div className="appListingSection" key={sectionIndex}>
      <p>{sectionData?.title || `لیست اپلیکیشن‌ها ${sectionIndex + 1}`}</p>
      <a href="https://app.iapps.ir/apps/430" className="bishtarHome">
        بیشتر
      </a>
      {sectionData?.appListingSection?.apps?.length > 0 ? (
        <div className="appGrid">
          {sectionData.appListingSection.apps.map((app) => (
            <div
            key={`${app.externalId}-${sectionIndex}`}
              className="appCard"
              onClick={() =>
                openItemDetail(app.externalNumericId, app.externalId)
              }
            >
              <img
                src={`https://static.iapps.ir/apps/file/image/${app.appDetail.iconFileId}/200x200.jpg`}
                alt={app.appDetail.title}
              />
              <div className="appInfo">
                <h3>{app.appDetail.title}</h3>
                <p>
                  {app.appDetail.screenshots?.[0]?.fileId
                    ? "دارای اسکرین‌شات"
                    : "بدون اسکرین‌شات"}
                </p>
              </div>
              <div className="appDowBuHome1">
                <button type="button" id="app-download-button">
                  دریافت
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>هیچ اپلیکیشنی برای نمایش وجود ندارد.</p>
      )}
    </div>
  );

  return (
    <div className="app">
      <ToolBar />
      <div className="bannerSection">
        {data[0]?.bannerSectionItems?.map((item) => (
          <div
          key={`${item.id}-${item.app.externalId}`}
            className="swiperSlide"
            onClick={() =>
              openItemDetail(item.app.externalNumericId, item.app.externalId)
            }
          >
            <div className="banner">
              <p className="labelBanner">{item.label}</p>
              <h3 className="titleBanner">{item.title}</h3>
              <p className="subtitleBanner">{item.subtitle}</p>
              <img
                src={`https://static.iapps.ir/apps/file/image/${item.imageFileId}/500x300.jpg`}
                alt={item.title}
              />
            </div>
          </div>
        ))}
      </div>
      <hr className="separator2" />
      {data.slice(1).map(renderAppListingSection)}
    </div>
  );
}

export default Home;
