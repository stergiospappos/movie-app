import React from "react";
import Header from "./components/navbar/Header.jsx";
import Footer from "./components/footer/Footer.jsx";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./Home/Home.jsx";

function App() {
  return (
    <div id="app">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
