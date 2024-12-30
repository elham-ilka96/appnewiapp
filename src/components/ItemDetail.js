import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./itemDetail.css";

function ItemDetail() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // برمی‌گردد به صفحه قبلی
  };
  
  const [itemData, setItemData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [icons, setIcons] = useState([]);
  const [appRates, setAppRates] = useState(null);
  const [comments, setComments] = useState([]);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [ratings, setRatings] = useState({});

  const externalNumericId = state?.externalNumericId;
  const externalId = state?.externalId;

  const apiUrl = "https://api.iapps.ir/apps/featured/home";
  const detailUrl = `https://api.iapps.ir/apps/app/numericId/${externalNumericId}`;
  const ratesUrl = `https://api.iapps.ir/reviews/appRates/${externalId}`;
  const commentsUrl = `https://api.iapps.ir/reviews/apps/${externalId}`;

  useEffect(() => {
    if (!externalNumericId || !externalId) {
      setError("شناسه‌ای برای بارگذاری وجود ندارد.");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      let ratesData = null;
      try {
        const [featuredResponse, detailResponse] = await Promise.all([
          axios.get(apiUrl),
          axios.get(detailUrl),
        ]);

        ratesData = await axios.get(ratesUrl).then((res) => res.data).catch(() => null);

        const commentsData = await axios
          .get(commentsUrl)
          .then((res) => res.data)
          .catch(() => []);

        setItemData(detailResponse.data);
        const featuredData = featuredResponse.data;

        const relatedIconFileId = featuredData
          .flatMap((section) => section.bannerSectionItems)
          .find((bannerItem) => bannerItem.app?.externalNumericId === externalNumericId)
          ?.app?.appDetail?.iconFileId;

        let relatedScreenshots = [];
        featuredData.forEach((section) => {
          section.bannerSectionItems?.forEach((bannerItem) => {
            if (
              bannerItem.app &&
              bannerItem.app.externalNumericId === externalNumericId &&
              bannerItem.app.appDetail.screenshots
            ) {
              relatedScreenshots = bannerItem.app.appDetail.screenshots;
            }
          });
        });

        if (relatedIconFileId) {
          setIcons([`https://static.iapps.ir/apps/file/image/${relatedIconFileId}/250x250.jpg`]);
        }

        if (relatedScreenshots.length > 0) {
          const urls = relatedScreenshots.map(
            (screenshot) =>
              `https://static.iapps.ir/apps/file/image/${screenshot.fileId}/375x667.jpg`
          );
          setImageUrls(urls);
        } else {
          setError("تصویری برای این آیتم پیدا نشد.");
        }

        setAppRates(ratesData);
        setComments(commentsData);

        const groupedRatings = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        commentsData.forEach((comment) => {
          groupedRatings[comment.rate] = (groupedRatings[comment.rate] || 0) + 1;
        });

        setRatings(groupedRatings);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("خطا در بارگذاری داده‌ها.");
        setLoading(false);
      }
    };

    fetchData();
  }, [externalNumericId, externalId]);


  const goToContactPage = () => {
    navigate('/contact');  // هدایت به صفحه تماس
  };

  function calculateAverageRating(comments) {
    const totalRating = comments.reduce((sum, comment) => sum + comment.rate, 0);
    return comments.length > 0 ? totalRating / comments.length : 0;
  }


  if (loading) return <div>در حال بارگذاری...</div>;
  if (error) return <div>{error}</div>;

  const convertToFarsiNumber = (number) => {
    const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return number
      .toString()
      .split("")
      .map((digit) => (/\d/.test(digit) ? farsiDigits[digit] : digit))
      .join("");
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    return "★".repeat(fullStars);
  };

  const toggleDescription = () => {
    setShowFullDescription((prev) => !prev);
  };

  return (
    <>
<a className="backButton" onClick={goBack}>
        <img
          src="https://app.iapps.ir/images/icon-back.svg"
          alt="بازگشت"
          className="viewNavigationBar"
        />
      </a>

    <div className="appPage2">
      
      <div className="basicInfo">
        <div className="appItems">
          {icons.length > 0 ? (
            icons.map((iconUrl, index) => (
              <div className="appIcon2Page" key={index}>
                <img src={iconUrl} alt={`Icon ${index}`} />
              </div>
            ))
          ) : (
            <p>در حال بارگذاری آیکون‌ها...</p>
          )}

          <div className="details">
            <h1>{itemData?.appDetail?.title || "بدون عنوان"}</h1>
            <p className="categiryTitle">
              {itemData?.category?.title || "بدون عنوان"}
            </p>

            <div className="appDownloadButton">
              <button type="button" id="app-download-button" onClick={goToContactPage}>
                دریافت
              </button>
            </div>
          </div>
        </div>

        <div className="appRating">
          {appRates?.rate && appRates?.rateCount ? (
            <div className="rating">
              <p className="rate">
                {convertToFarsiNumber(appRates.rate)}
                {renderStars(appRates.rate)}
              </p>
              <p className="rateCount">
                {convertToFarsiNumber(appRates.rateCount)} نظر
              </p>
            </div>
          ) : null}
        </div>

        <div className="screenShot">
          <div className="scroller">
            {imageUrls.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`file-${index}`}
                style={{
                  width: "206px",
                  height: "366px",
                  objectFit: "cover",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  margin: "10px",
                }}
              />
            ))}
          </div>
          <hr />
        </div>
        <div className="bishtar">
          <p style={{ whiteSpace: "pre-line" }}>
            {showFullDescription
              ? itemData?.appDetail?.descriptionFa || "توضیحاتی موجود نیست"
              : `${(itemData?.appDetail?.descriptionFa || "").slice(0, 100)}...`}
          </p>
          <button onClick={toggleDescription} className="toggleButton">
            {showFullDescription ? "" : "بیشتر"}
          </button>
          توسعه دهنده
        </div>
      </div>
      <hr />

      <div className="taghiratAkhrinNoskhe">
        <h1>تغییرات آخرین نسخه</h1>
        <p className="adadTaghirat">{itemData?.appVersion?.versionName || "توضیحاتی موجود نیست"}</p>

        <hr />
      </div>

      <div className="commentsSection">
  <h1>نظر و امتیاز</h1>

  <div className="ratingsBreakdown">
    {Object.entries(ratings)
      .sort((a, b) => b[0] - a[0])
      .map(([score, count]) => (
        <div className="setareAndLine" key={score}>
          {/*  خطهای بلند جلو ستاره */}
          <div className="lineSaf">
            <div
              className="lineSafTopor"
              style={{ width: `${(count / Math.max(...Object.values(ratings))) * 100}%` }}
            ></div>
          </div>

          {/*   ستاره به شکل مثلثی */}
          <div className="starRang2">
            {renderStars(Number(score))}
          </div>
        </div>
      ))}
  </div>

  {comments.length > 0 ? (
    <div className="commentSummary">
      <p className="commentRate"> {calculateAverageRating(comments).toFixed(1)}</p>
      <p className="az1Emtiaz">از {comments.length} امتیاز</p>
    </div>
  ) : (
    <p>نظری برای نمایش وجود ندارد.</p>
  )}
</div>

     
      <hr/>
      <div className="writeReview">
                    <a href="/submitReview/84a25091-e8b0-475d-aa61-7d5fdb28f6d3-9227da1a-fbcf-46ef-887f-660a55a9e312">
                     نظر خود را بنویسید 
                        <img src="https://app.iapps.ir/images/icon-write-review.svg" />
                    </a>
                    <hr className="separator"/>
                </div>
      <div className="etelatBarname">
      <h3>اطلاعات برنامه</h3>
      <p className="sazgari">سازگاری با سیستم عامل</p>
      <p className="sazgariBa">{itemData?.appVersion?.minOsVersion || "توضیحاتی موجود نیست" }به بالا   </p>
      </div>
    </div>
    
    </>
  );
}

export default ItemDetail;
