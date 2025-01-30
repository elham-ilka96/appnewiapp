import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./itemDetail.css";
import Loading from "./loading";
import { useLocation } from "react-router-dom";
import TwoToolBar from "./twoToolBar/twoToolBar";

function ItemDetail2() {
  const [itemData, setItemData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [appRates, setAppRates] = useState(null); // امتیاز و تعداد نظرات
  const [comments, setComments] = useState([]); // نظرات کاربران (آرایه خالی به‌جای null)
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [ratings, setRatings] = useState({});
  const [icons, setIcons] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { externalNumericId, externalId } = location.state || {};
  const numericId = externalNumericId ;

  const apiUrl = `https://api.iapps.ir/apps/app/numericId/${numericId}`;
  const ratesUrl = `https://api.iapps.ir/reviews/appRates/${externalId}`;
  const commentsUrl = `https://api.iapps.ir/reviews/apps/${externalId}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const appResponse = await axios.get(apiUrl);
        setItemData(appResponse.data);
  
        if (appResponse.data?.appDetail?.screenshots) {
          const screenshots = appResponse.data.appDetail.screenshots.map(
            (screenshot) =>
              `https://static.iapps.ir/apps/file/image/${screenshot.fileId}/375x667.jpg`
          );
          setImageUrls(screenshots);
        }
      } catch (err) {
        console.error("Error fetching app data:", err);
      }
  
      try {
        const ratesResponse = await axios.get(ratesUrl);
        setAppRates(ratesResponse.data || null);
      } catch (err) {
        console.error("Error fetching rates data:", err);
      }
  
      try {
        const commentsResponse = await axios.get(commentsUrl);
        const fetchedComments = commentsResponse.data || [];
  
        setComments(fetchedComments);
  
        // پردازش نظرات برای محاسبه‌ی امتیازات
        const ratingCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        fetchedComments.forEach((comment) => {
          if (comment.rate >= 1 && comment.rate <= 5) {
            ratingCounts[comment.rate]++;
          }
        });
  
        setRatings(ratingCounts);
      } catch (err) {
        console.error("Error fetching comments data:", err);
      }
  
      setLoading(false); // اطمینان از توقف لودینگ
    };
  
    fetchData();
  }, [apiUrl, ratesUrl, commentsUrl]);
  

  const goBack = () => {
    navigate(-1);
  };

  const goToContactPage = () => {
    navigate('/contact');  // هدایت به صفحه تماس
  };

  const convertToFarsiNumber = (number) => {
    const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return number
      .toString()
      .split("")
      .map((digit) => (/\d/.test(digit) ? farsiDigits[digit] : digit))
      .join("");
  };

  const renderStars = (rate) => {
    const fullStars = Math.floor(rate);
    const halfStar = rate % 1 >= 0.5 ? 1 : 0;
  
    return (
      <>
        {"★".repeat(fullStars)}
        {halfStar ? "★" : ""}
      </>
    );
  };
  

  const toggleDescription = () => {
    setShowFullDescription((prev) => !prev);
  };

  function calculateAverageRating(comments) {
    const totalRating = comments.reduce((sum, comment) => sum + comment.rate, 0);
    return comments.length > 0 ? totalRating / comments.length : 0;
  }

  if (loading) return <Loading />;
  if (error) return <div>{error}</div>;

  return (
    <div>
       
      <a className="backButton" onClick={goBack}>
        <img
          src="https://app.iapps.ir/images/icon-back.svg"
          alt="بازگشت"
          className="viewNavigationBar"
        />
      </a>

      <div className="appPage2">
      <TwoToolBar iconFileId={itemData?.appDetail?.iconFileId} />

{/* فراخوانی نوار ابزار */}
      <div className="basicInfo2">
        <div className="appItems2">
        <div className="appIcon2Page" >
            <img
              src={`https://static.iapps.ir/apps/file/image/${itemData?.appDetail?.iconFileId}/112x112.jpg`}
              alt="App Icon"
            />
          </div>
          <div className="details">
            <h1>{itemData?.appDetail?.title || "بدون عنوان"}</h1>
            <p className="categoryTitle2">
              {itemData?.category?.title || "بدون دسته‌بندی"}
            </p>

            <div className="appDownloadButton2">
              <button type="button" id="appDownloadButton2" onClick={goToContactPage}>
                دریافت
              </button>
            </div>

            </div>
          </div>
        </div>

        <div className="appRating2">
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
  ) : (
    <p></p> // افزودن پیام پیش‌فرض
  )}
</div>


        <div className="screenShot">
         
          <div className="scroller">
            {imageUrls.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`screenshot-${index}`}
                style={{
                  width: "206px",
                  height: "366px",
                  objectFit: "cover",
                  border: "1px solid #fff",
                  borderRadius: "8px",
                  margin: "10px",
                }}
              />
            ))}
          </div>
        </div>



        <div className="bishtar">
          <h2>توضیحات</h2>
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
        <hr/>

        <div className="taghiratAkhrinNoskhe">
        <h1>تغییرات آخرین نسخه</h1>
          <p className="adadTaghirat">
            نسخه:{" "}
            
            {convertToFarsiNumber(itemData?.appVersion?.versionName || "نامشخص")}
          </p>
          <button onClick={toggleDescription} className="toggleButton">
            {showFullDescription ? "" : "بیشتر"}
          </button>
          <hr/>
        </div>

        

        <div className="commentsSection">
  <h1>نظر و امتیاز</h1>

  <div className="ratingsBreakdown">
  {Object.entries(ratings)
    .sort((a, b) => b[0] - a[0]) // مرتب‌سازی از ۵ به ۱
    .map(([score, count]) => {
      const maxCount = Math.max(...Object.values(ratings)) || 1; // جلوگیری از تقسیم بر صفر
      return (
        <div className="setareAndLine" key={score}>
          <div className="lineSaf">
            <div
              className="lineSafTopor"
              style={{ width: `${(count / maxCount) * 100}%` }}
            ></div>
          </div>
          <div className="starRang2">{renderStars(Number(score))}</div>
        </div>
      );
    })}
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

      </div>
      
      <div className="writeReview">
                    <a href="/submitReview/84a25091-e8b0-475d-aa61-7d5fdb28f6d3-9227da1a-fbcf-46ef-887f-660a55a9e312">
                     نظر خود را بنویسید 
                        <img src="https://app.iapps.ir/images/icon-write-review.svg" />
                    </a>
                   
                </div>
                <hr className="separator"/>
<div className="information2">
  <p> اطلاعات برنامه</p>
  <div className="sazgari2">
    <p>
      سازگاری 
      <span> آیفون و آیپد</span>
    </p>

    <p>
     دسته بندی
      <span> امور مالی و پرداخت</span>
    </p>

    <p>
      حجم
      <span> مگا بایت</span>
    </p>
      <p>
              سازگاری با سیستم
              <span>
              {convertToFarsiNumber(
              itemData?.appVersion?.minOsVersion || "نامشخص"
            )} به بالا
              </span>
           
          </p>
    </div>
    </div>
    </div>
  );
}

export default ItemDetail2;
