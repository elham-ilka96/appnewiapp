import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // اضافه کردن این خط
import "./toolBar.css";

const Toolbar = () => {
    const [fontSize, setFontSize] = useState(30);
    const location = useLocation(); // گرفتن مسیر فعلی

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

    // تعیین عنوان بر اساس مسیر
    const getTitle = () => {
        if (location.pathname === "/games") {
            return "بازی ها";
        } else if (location.pathname === "/search") {
            return "جستجو";
        } else if (location.pathname === "/contact") {
            return "حساب کاربری ";
        } else if (location.pathname === "/apps") {
            return " برنامه ها";
        } else {
            return "ویترین"; // پیش‌فرض
        }
    };

    return (
        <header className="toolbar">
            <div style={{
                height: '',
                position: "fixed",
                paddingRight: '15px',
                backgroundColor: '',
                paddingBottom: '-15px',
            }}>
                <h1
                    style={{
                        fontSize: `${fontSize}px`,
                        transition: 'font-size 0.2s ease',
                        color: '#111',
                        paddingTop: '15px',
                        paddingBottom: '15px'
                    }}
                >
                    {getTitle()} {/* نمایش عنوان بر اساس مسیر */}
                </h1>
            </div>
            <hr className="separator" />
        </header>
    );
};

export default Toolbar;
