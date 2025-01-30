import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./toolBar.css";

const Toolbar = () => {
    const [fontSize, setFontSize] = useState(30);
    const [searchTerm, setSearchTerm] = useState(''); // مدیریت state جستجو
    const location = useLocation();

    const isSearchItemDetail = /^\/searchItemDetail\/[^/]+$/.test(location.pathname);

    // تعریف تابع getTitle در بالا
    const getTitle = () => {
        if (location.pathname === "/games") {
            return { text: "بازی ها", className: "title-games" };
       
        } else if (location.pathname === "/search"|| isSearchItemDetail ) {
            return { text: "جستجو", className: "title-search" };
        } else if (location.pathname === "/contact") {
            return { text: "حساب کاربری", className: "title-contact" };
        } else if (location.pathname === "/apps") {
            return { text: "برنامه ها", className: "title-apps" };
        } else if (location.pathname === "/"|| "/vitrin") 
            return { text: "ویترین", className: "title-dafault" };
    
    };

    const { text, className } = getTitle(); // حالا بدون مشکل استفاده می‌شود

    const handleScroll = () => {
        const scrollPosition = window.scrollY;
        const newSize = Math.max(20, 30 - scrollPosition / 10);
        setFontSize(newSize);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    


    return (
        <header className="toolbar">
            <div style={{
                height: '',
                position: "fixed",
                paddingRight: '12px',
                
                backgroundColor: '',
                paddingBottom: '-15px',
            }}>
                <h1
                    className={className}
                    style={{
                        fontSize: `${fontSize}px`,
                        transition: 'font-size 0.2s ease',
                        color: '#111',
                        paddingTop: '15px',
                        paddingBottom: '15px',
                    }}
                >
                    {text} {/* متن عنوان */}
                </h1>

                {/* نمایش اینپوت فقط در صفحه جستجو */}
                <div className="buttonSearchBase">
                     {(location.pathname === "/search" || isSearchItemDetail) && (
                        <form>
                         <input
                         type="text"
                         placeholder=""
                         value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                      style={{ paddingLeft:"5px",}}
            />
            <button>
                <img src="https://app.iapps.ir/images/tab-bar-search.svg" alt="" />
            </button>
        </form>
    )}
</div>


            </div>
            <hr className="separator" />
        </header>
    );
};

export default Toolbar;
