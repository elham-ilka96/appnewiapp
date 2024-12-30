import React from "react";
import "./boxLapps.css";

function BoxLapps({ shareIconUrl, addToHomeScreenUrl }) {
  return (
    <div className="installMessage">
      <div className="arrowBox">
       
        <div className="manual">
          <strong>آی‌اپس را بر روی دستگاه خود نصب کنید</strong>
          <br />
          <div className="dokme">
          دکمه‌ی
          <div className="imageWrapper1">
            <img
              className="imageFeature1"
              src={shareIconUrl || "https://app.iapps.ir/images/share-icon-iphone-20.jpg"}
              alt="آیکون اشتراک‌گذاری در آیفون"
            />
          </div>
          <div className="lams">
          را لمس کنید و Add to Home Screen را انتخاب نمایید.
          </div>
      </div>
    </div>
        <div className="imageWrapper2">
          <img
            className="imageFeature2"
            src={addToHomeScreenUrl || "https://app.iapps.ir/images/2Add_to_home_screen_icon.png"}
            alt="آیکون افزودن به صفحه اصلی"
          />
        </div>
      </div>
    </div>
  );
}

export default BoxLapps;
