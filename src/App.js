import React from "react";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Addbook from "./pages/Add-book";


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/Add-book" element={<Addbook/>}/>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
