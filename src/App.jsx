import React from "react";
import Header from "./components/navbar/Header.jsx";
import Footer from "./components/footer/Footer.jsx";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./Home/Home.jsx";
import SingleMovie from "./SingleMovie/SingleMovie.jsx";
import ScrollToTop from "./components/scrollToTop.js";

function App() {
  return (
    <div id="app">
      <BrowserRouter>
        <Header />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<SingleMovie />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
