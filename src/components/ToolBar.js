import React, { useState, useEffect} from "react";
import "./toolBar.css";

const Toolbar= () => {
    const [fontSize, setFontSize] = useState(30);

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
        <div style={{height:'',  position:"fixed", paddingRight:'15px', backgroundColor:'',paddingBottom:'-15px', }}>
            

            <h1 style={{fontSize: `${fontSize}px`, transition:'font-size 0.2s ease', color:'#111', paddingTop:'15px' , paddingBottom:'15px'}}>
              ویترین
              </h1>
        </div>
        <hr className="separator"/>
       
        </header>
    );

};
export default Toolbar;