import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import DashboardLayout from "./DashboardLayout";
import DashBoard from "./Screens/DashBoard";
import Users from "./Screens/Users";
import GeminiUsage from "./Screens/GeminiUsage";
// import Login from "./Screens/Login"; // Example future page
import Plans from "./Screens/Plans"; 
function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          
       
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<DashBoard />} />
            {/* Add future sidebar pages here */}
            {/* <Route path="/profile" element={<Profile />} /> */}
            <Route path="/plans" element={<Plans />} />
            <Route path="/profile" element={<Users />} />
            <Route path="/gemini-usage" element={<GeminiUsage />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;