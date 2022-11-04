import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Home'
import GalleryMain from './Gallery/GalleryMain';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/react/" element = {<Home />} />
        <Route path = "/react/gallery/" element = {<GalleryMain />} />        
      </Routes>
    </BrowserRouter>
  );
};

export default App;