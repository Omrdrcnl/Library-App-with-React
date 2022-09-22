import React from "react";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Addbook from "./pages/Add-book";
import EditBook from "./pages/EditBook";


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/Add-book" element={<Addbook/>}/>
      <Route path="/edit-book/:booksId" element={<EditBook/>} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
