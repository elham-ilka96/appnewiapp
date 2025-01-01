import React from "react";
import  './tabBar.css';
import { useNavigate } from "react-router-dom";

function TabBar(){
    const navigate = useNavigate();

    const goToHome = () => {
        navigate('/');  // هدایت به صفحه 
      };
  
      const goToContactPage = () => {
        navigate('/contact');  // هدایت به صفحه تماس
      };

      const goToApps = () => {
        navigate('/apps');  // هدایت به صفحه برنامه ها
      };
       
      const goToGames = () => {
        navigate('/games');  // هدایت به صفحه بازی
      };
      const goToSearch = () => {
        navigate('/search');  // هدایت به صفحه بازی
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
            <a className="tabBarItem" onClick={goToHome } href="/vitrin">
            <img className="tabBarItemImg1" src="https://app.iapps.ir/images/tab-bar-home.svg" alt="ویترین"/>
            <p>ویترین</p>
            </a>
            <a className="tabBarItem" href="/apps" onClick={goToApps }>
            <img  className="tabBarItemImg1" src="https://app.iapps.ir/images/tab-bar-app.svg" alt="برنامه ها "/>
            <p>برنامه ها</p>
            </a>
            <a className="tabBarItem" href="/games" onClick={goToGames}>
            <img className="tabBarItemImg1" src="https://app.iapps.ir/images/tab-bar-game.svg" alt="بازی ها"/>
            <p>بازی ها</p></a>
            <a className="tabBarItem" href="/search" onClick={goToSearch}>
            <img className="tabBarItemImg1" src=" https://app.iapps.ir/images/tab-bar-search.svg" alt="جستجو"/>
            <p>جستجو</p></a>
            <a className="tabBarItem" onClick={goToContactPage} href="/contact">
            <img className="tabBarItemImg1" src="https://app.iapps.ir/images/tab-bar-profile.svg" alt="حساب کاربری"/>
            <p>حساب کاربری</p></a>
        </div>
    </div>
    )
}
 export default TabBar;