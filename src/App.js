import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation} from "react-router-dom";
import Home from "./components/home";
import ItemDetail from "./components/ItemDetail";
import './App.css';
import BoxLapps from "./feacherApp/boxLapps";
import TabBar from "./components/tabBar/tabBar";
import ContactPage from "./feacherApp/contactPage";

function App() {
  return (
    <Router>
      <div>
      <Routes>
        {/* صفحه اصلی */}
        <Route path="/" element={<Home />} />
        {/* صفحه جزئیات */}
        <Route path="/item-detail" element={<ItemDetail />} />
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
  if (location.pathname === "/") {
    return <TabBar />;
  }
if (location.pathname === "/item-detail") {
  return <BoxLapps />;
}
}
export default App;
