import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import DashboardLayout from "./DashboardLayout";
import DashBoard from "./Screens/DashBoard";
// import Login from "./Screens/Login"; // Example future page

function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          
       
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<DashBoard />} />
            {/* Add future sidebar pages here */}
            {/* <Route path="/profile" element={<Profile />} /> */}
            {/* <Route path="/plans" element={<Plans />} /> */}
          </Route>

        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;