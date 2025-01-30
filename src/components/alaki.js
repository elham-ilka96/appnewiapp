import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./itemDetail.css";
import Loading from "./loading";

function ItemDetail2() {
  const [itemData, setItemData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [appRates, setAppRates] = useState(null);
  const [ratings, setRatings] = useState({});
  const [comments, setComments] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const { externalNumericId, externalId } = location.state || {};
  const numericId = externalNumericId ;
  




  const apiUrl = `https://api.iapps.ir/apps/app/numericId/${numericId}`;
  const ratesUrl = `https://api.iapps.ir/reviews/appRates/${externalId}`;
  const commentsUrl = `https://api.iapps.ir/reviews/apps/${externalId}`;

  useEffect(() => {

    const fetchComments = async () => {
      try {
        const response = await axios.get(commentsUrl);
        const fetchedComments = response.data?.comments || [];
        setComments(fetchedComments);
    
        // محاسبه میانگین امتیاز
        const totalRating = fetchedComments.reduce(
          (sum, comment) => sum + (comment.rate || 0),
          0
        );
        const averageRating =
          fetchedComments.length > 0 ? totalRating / fetchedComments.length : 0;
        setAppRates(averageRating);
    
        // گروه‌بندی نظرات بر اساس امتیاز
        const groupedRatings = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        fetchedComments.forEach((comment) => {
          const rate = comment.rate || 0;
          groupedRatings[rate] = (groupedRatings[rate] || 0) + 1;
        });
        setRatings(groupedRatings);
      } catch (err) {
        console.error("خطا در دریافت نظرات برنامه:", err);
      }
    };
   
  
    fetchComments();
  }, [apiUrl,  commentsUrl]);

  const renderRatingBars = () => {
    return Object.entries(ratings).map(([rate, count]) => (
      <div key={rate} className="ratingBar">
        <p>{rate} ستاره:</p>
        <div className="progressBar">
          <div
            className="filledBar"
            style={{
              width: `${(count / comments.length) * 100}%`,
              backgroundColor: "#f39c12",
            }}
          />
        </div>
        <p>{count}</p>
      </div>
    ));
  };
  
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    return "★".repeat(fullStars);
  };

  const calculateAverageRating = (comments) => {
    if (!comments.length) return 0;
    const total = comments.reduce((sum, comment) => sum + comment.rating, 0);
    return total / comments.length;
  };

  const goToContactPage = () => {
    navigate("/contact");
  };

  const goBack = () => {
    navigate(-1);
  };

  if (loading) return <Loading />;
  if (error) return <div>{error}</div>;

  const toggleDescription = () => {
    setShowFullDescription((prev) => !prev);
  };

  const convertToFarsiNumber = (number) => {
    const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return number
      .toString()
      .split("")
      .map((digit) => (/[0-9]/.test(digit) ? farsiDigits[digit] : digit))
      .join("");
  };

  console.log("numericId:", numericId, "externalId:", externalId);


//"displayName": "Neutron Labs Inc."//

 // https://api.iapps.ir/developers/accounts/developerapps+1610870504@iapps.ir/publicInfo

  return (
    <div className="itemDetail2Page">
      <a className="backButton" onClick={goBack}>
        <img
          src="https://app.iapps.ir/images/icon-back.svg"
          alt="بازگشت"
          className="viewNavigationBar"
        />
      </a>

      <div className="appPage2">
        <div className="basicInfo2">
          <div className="appItems2">
            <img
              src={`https://static.iapps.ir/apps/file/image/${itemData?.appDetail?.iconFileId}/112x112.jpg`}
              alt="App Icon"
              className="appIcon2Page"
            />
            <div className="details">
              <h1>{itemData?.appDetail?.title || "بدون عنوان"}</h1>
              <p>{itemData?.category?.title || "بدون دسته‌بندی"}</p>
              <div className="appDownloadButton2">
                <button type="button" id="appDownloadButton2" onClick={goToContactPage}>
                  دریافت
                </button>
              </div>
            </div>
          </div>

          {/* اضافه کردن بخش امتیازات */}
          <div className="appRating2">
            {appRates?.rate && appRates?.rateCount ? (
              <div className="rating">
                <p className="rate">
                console.log("rates:", appRates.rate); // بررسی comments
                {convertToFarsiNumber(appRates.rate)}
                  {renderStars(appRates.rate)}
                </p>
                <p className="rateCount">{appRates.rateCount} نظر</p>
              </div>
            ) : null}
          </div>
        </div>

        <div className="screenShot">
          {imageUrls.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`screenshot-${index}`}
              className="screenshotImage"
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
        <div className="bishtar3">
          <p style={{ whiteSpace: "pre-line" }}>
            {showFullDescription
              ? itemData?.appDetail?.descriptionFa
              : `${(itemData?.appDetail?.descriptionFa || "").slice(0, 100)}...`}
          </p>
          <button onClick={toggleDescription} className="toggleButton">
            {showFullDescription ? "کمتر" : "بیشتر"}
          </button>
        </div>

        <hr />

        <div className="commentsSection">
          <h1>نظر و امتیاز</h1>
 {/* نمایش میانگین امتیاز */}
 <div className="commentSummary">
 <p className="commentRate">{appRates ? appRates.toFixed(1) : "0.0"}</p>

        <p className="az1Emtiaz">از {comments.length} امتیاز</p>
      </div>

      {/* نمایش نوارهای امتیاز */}
      <div className="ratingBars">{renderRatingBars()}</div>

      {/* نمایش لیست نظرات */}
      <ul className="commentsList">
        {comments.map((comment, index) => (
          <li key={index} className="commentItem">
            <p>{comment.text || "بدون متن"}</p>
            <p>امتیاز: {comment.rate || 0}</p>
          </li>
        ))}
      </ul>

        <div className="taghiratAkhrinNoskhe">
          <h1>تغییرات آخرین نسخه</h1>
          <p className="adadTaghirat">{itemData?.appVersion?.versionName || "توضیحاتی موجود نیست"}</p>
        </div>
      </div>
    </div>
    </div>
  );
}

export default ItemDetail2;
