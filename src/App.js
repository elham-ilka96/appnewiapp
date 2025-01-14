import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation} from "react-router-dom";
import Home from "./components/home";
import ItemDetail from "./components/ItemDetail";
import './App.css';
import BoxLapps from "./feacherApp/boxLapps";
import TabBar from "./components/tabBar/tabBar";
import ContactPage from "./feacherApp/contactPage";
import Games1 from "./Home/games1";
import Search1 from "./Home/search1";
import SearchItemDetail from "./Home/searchItemDetail";
import Barnameha from "./Home/Barnameha";

function App() {
  return (
    <Router>
      <div>
      <Routes>
        {/* صفحه اصلی */}
        <Route path="/" element={<Home />} />
        <Route path="/Apps" element={<Barnameha />} />
        <Route path="/games" element={<Games1 />} />
        <Route path="/search" element={<Search1 />} />
       
        {/* صفحه جزئیات */}
        <Route path="/item-detail" element={<ItemDetail />} />
        <Route path="/searchItemDetail/:slug" element={<SearchItemDetail />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      {/* نمایش شرطی BoxLapps */}
      <ConditionalBoxLapps />
      </div>
    </Router>
  );
}
function ConditionalBoxLapps() {
  const location = useLocation();

 
  // if for page 2=> TabBar, if page "/" => BoxLapps 
  if (["/", "/apps", "/search", "/contact", "/games", "/searchItemDetail"].includes(location.pathname)) {
    return <TabBar />;
  }
if (location.pathname === "/item-detail") {
  return <BoxLapps />;
}
}
export default App;
