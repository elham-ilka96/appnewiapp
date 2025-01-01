import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./games1.css";
import ToolBar from "../components/ToolBar";
import Loading from "../components/loading";


function Games1() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://api.iapps.ir/apps/featured/game")
      .then((response) => setData(response.data))
      .catch(() => setError("خطا در بارگذاری داده‌ها"));
  }, []);

  const openItemDetail = (externalNumericId, externalId) => {
    if (externalNumericId && externalId) {
      navigate("/item-detail", { state: { externalNumericId, externalId } });
    } else {
      console.error("شناسه‌ها معتبر نیستند:", externalNumericId, externalId);
    }
  };

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!data) {
    return <Loading />;
  }

  return (
    <div className="app">
      <ToolBar />

      {/*  قسمت اول بخش بنر */}
      <div className="bannerSection">
        {data[0]?.bannerSectionItems?.length > 0 ? (
          data[0].bannerSectionItems.map((item) => (
            <div
              key={item.id}
              className="swiperSlide"
              onClick={() =>
                item.app &&
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
          ))
        ) : (
          <p>هیچ بنری برای نمایش وجود ندارد.</p>
        )}
       </div>
     
        <hr className="separator2"/>
       
      {/* بخش لیست اپلیکیشن‌ها قسمت دوم*/}
      <div className="appListingSection">
        <p>{data[1]?.title || "لیست اپلیکیشن‌ها"}</p>
       <a href=" https://app.iapps.ir/apps/430" className="bishtarHome"> بیشتر</a>
        {data[1]?.appListingSection?.apps?.length > 0 ? (
          <div className="appGrid">
            {data[1].appListingSection.apps.map((app) => (
              <div
                key={app.externalId}
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
                <p>{app.appDetail.screenshots.fileId || "بدون اسکرین‌شات"}</p>
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
    
      <hr className="separator2"/>
{/* بخش لیست اپلیکیشن‌ها قسمت سوم*/}
<div className="appListingSection">
        <p>{data[2]?.title || "لیست اپلیکیشن‌ها"}</p>
       <a href=" https://app.iapps.ir/apps/430" className="bishtarHome"> بیشتر</a>
        {data[2]?.appListingSection?.apps?.length > 0 ? (
          <div className="appGrid">
            {data[2].appListingSection.apps.map((app) => (
              <div
                key={app.externalId}
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
                <p>{app.appDetail.screenshots.fileId || "بدون اسکرین‌شات"}</p>
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
    

      <hr className="separator2"/>
{/* بخش لیست اپلیکیشن‌ها قسمت چهارم*/}
<div className="appListingSection">
        <p>{data[3]?.title || "لیست اپلیکیشن‌ها"}</p>
       <a href=" https://app.iapps.ir/apps/430" className="bishtarHome"> بیشتر</a>
        {data[3]?.appListingSection?.apps?.length > 0 ? (
          <div className="appGrid">
            {data[3].appListingSection.apps.map((app) => (
              <div
                key={app.externalId}
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
                <p>{app.appDetail.screenshots.fileId || "بدون اسکرین‌شات"}</p>
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

      <hr className="separator2"/>
{/* بخش لیست اپلیکیشن‌ها قسمت پنجم*/}
<div className="appListingSection">
        <p>{data[4]?.title || "لیست اپلیکیشن‌ها"}</p>
       <a href=" https://app.iapps.ir/apps/430" className="bishtarHome"> بیشتر</a>
        {data[4]?.appListingSection?.apps?.length > 0 ? (
          <div className="appGrid">
            {data[4].appListingSection.apps.map((app) => (
              <div
                key={app.externalId}
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
                <p>{app.appDetail.screenshots.fileId || "بدون اسکرین‌شات"}</p>
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

      <hr className="separator2"/>
{/* بخش لیست اپلیکیشن‌ها قسمت ششم*/}
<div className="appListingSection">
        <p>{data[5]?.title || "لیست اپلیکیشن‌ها"}</p>
       <a href=" https://app.iapps.ir/apps/430" className="bishtarHome"> بیشتر</a>
        {data[5]?.appListingSection?.apps?.length > 0 ? (
          <div className="appGrid">
            {data[5].appListingSection.apps.map((app) => (
              <div
                key={app.externalId}
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
                <p>{app.appDetail.screenshots.fileId || "بدون اسکرین‌شات"}</p>
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



    </div>
  );
}

export default Games1;
