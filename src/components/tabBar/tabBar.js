import React from "react";
import  './tabBar.css';

function TabBar(){

    const openBarPhon = () => {
        window.open('/newBarPhon' , '_blank', 'noopener , noreferrer');
      };
      const openBarVitrin = () => {
        window.open('/newBarVitrin' , '_blank', 'noopener , noreferrer');
      };

    return(
        <div  className="apptabBar">
            <div className="downloaderContainer"></div>
            <a href="/packages">
                <div className="purchasePackageAction">
                    تهیه اشتراک و دانلود نامحدود برنامه و بازی
                </div>
            </a>
            <div className="tabBar">
            <a className="tabBarItem" onClick={openBarVitrin} href="/vitrin">
            <img className="tabBarItemImg1" src="https://app.iapps.ir/images/tab-bar-home.svg" alt="ویترین"/>
            <p>ویترین</p>
            </a>
            <a className="tabBarItem" href="/apps">
            <img  className="tabBarItemImg1" src="https://app.iapps.ir/images/tab-bar-app.svg" alt="ویترین"/>
            <p>برنامه ها</p>
            </a>
            <a className="tabBarItem" href="/games">
            <img className="tabBarItemImg1" src="https://app.iapps.ir/images/tab-bar-game.svg" alt="ویترین"/>
            <p>بازی ها</p></a>
            <a className="tabBarItem" href="/search"><img className="tabBarItemImg1" src=" https://app.iapps.ir/images/tab-bar-search.svg" alt="ویترین"/>
            <p>جستجو</p></a>
            <a className="tabBarItem" onClick={openBarPhon} href="/account"><img className="tabBarItemImg1" src="https://app.iapps.ir/images/tab-bar-profile.svg" alt="حساب کاربری"/>
            <p>حساب کاربری</p></a>
        </div>
    </div>
    )
}
 export default TabBar;