import React, { useEffect } from "react";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Addbook from "./pages/Add-book";
import EditBook from "./pages/EditBook";
import { useDispatch } from "react-redux";
import axios from "axios";
import CategoriesList from "./pages/categoriesList";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "FETCH_BOOKS_START" });
    axios
      .get("http://localhost:3004/books")
      .then((res) => {
        console.log("kitapların gelmesi", res.data);
        dispatch({ type: "FETCH_BOOKS_SUCCESS", payload: res.data });
      })
      .catch((err) =>
        dispatch({
          type: "FETCH_BOOKS_FAIL",
          payload: "Kitapları çekerken hata oluştu",
        })
      );

    dispatch({ type: "FETCH_CATEGORIES_START" });
    axios
      .get("http://localhost:3004/categories")
      .then((res) =>
        dispatch({ type: "FETCH_CATEGORIES_SUCCESS", payload: res.data })
      )
      .catch((err) => {
        dispatch({
          type: "FETCH_CATEGORIES_FAIL",
          payload: "Kategorileri çekerken bir hata ile karşılaşıldı",
        });
      });
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Add-book" element={<Addbook />} />
        <Route path="/edit-book/:booksId" element={<EditBook />} />
        <Route path="/categoriesList" element={<CategoriesList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
