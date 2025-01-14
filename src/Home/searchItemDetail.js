import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./search1.css";
import "./searchItemDetail.css";
import ToolBar from "../components/ToolBar";
import Loading from "../components/loading";

function SearchItemDetail() {
  const { slug } = useParams(); // دریافت slug از پارامترهای URL
  const [appData, setAppData] = useState([]); // مقدار پیش‌فرض آرایه خالی
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.iapps.ir/apps/search/?q=${encodeURIComponent(slug)}&size=15`
        );
        console.log(response.data); // بررسی داده‌های بازگشتی
        if (response.data && response.data.content) {
          setAppData(response.data.content);
        } else {
          setAppData([]);
        }
      } catch (err) {
        setError('خطایی در بارگذاری اطلاعات رخ داده است.');
      } finally {
        setLoading(false);
      }
    };

    fetchAppData();
  }, [slug]);

  // استفاده از appData به جای data
  if (loading) {
    return <Loading />; // نمایش اسپینر یا انیمیشن در زمان بارگذاری
  }

  if (error) {
    return <div className="error-message">{error}</div>; // نمایش خطا به صورت مناسب
  }

  const goToContactPage = () => {
    navigate('/contact');  // هدایت به صفحه تماس
  };

  return (
    <div className="app">
      <ToolBar />
      <div className="scrollSearch">
        <h1>اطلاعات اپلیکیشن</h1>
        <div className="appWithScreenshotSearch">
          {appData.length > 0 ? (
            appData.map((app) => (
              <div
                className="searchDetail"
                key={app.externalId || app.slug}
                style={{ marginBottom: '20px' }}
              >
                {/* نمایش تصویر آیکون */}
                {app.appDetail?.iconFileId ? (
                  <img
                    src={`https://static.iapps.ir/apps/file/image/${app.appDetail.iconFileId}/118x118.jpg`}
                    alt={app.slug || 'تصویر اپلیکیشن'}
                    style={{
                      width: '66px',
                      height: '66px',
                      borderRadius: '14px',
                      marginTop: '40px',
                      border: '1px solid #eee',
                      backgroundColor: '#eee',
                    }}
                  />
                ) : (
                  <p>تصویری موجود نیست</p>
                )}

                {/* نمایش اطلاعات اپلیکیشن */}
                <p className="slugSearchDetail">{app.slug}</p>
                <p className="titleSearchDetail">
                  {app.category?.title || 'دسته‌بندی نامشخص'}
                </p>

                <div className="appSearchButton">
                  <button type="button" id="app-download-button" onClick={goToContactPage}>
                    دریافت
                  </button>
                </div>

                {/* نمایش تصاویر اسکرین‌شات */}
                {app.appDetail?.screenshots?.length > 0 ? (
                  <div className="imgSearchDetail2">
                    {app.appDetail.screenshots.map((screenshot, index) => (
                      <img
                        key={index}
                        src={`https://static.iapps.ir/apps/file/image/${screenshot.fileId}/200x200.jpg`}
                        alt={`تصویر ${index + 1}`}
                        style={{
                          width: '200px',
                          height: '200px',
                          border: '1px solid #ddd',
                          borderRadius: '10px',
                          marginTop: '15px',
                          marginLeft: '15px',
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  <p>اسکرین‌شاتی موجود نیست.</p>
                )}
              </div>
            ))
          ) : (
            <p>اطلاعاتی برای نمایش وجود ندارد.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchItemDetail;
