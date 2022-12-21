import React, { useEffect } from "react";
import Header from "../components/Header";
import AddBook from "../components/AddBook";

const Addbook = (props) => {
  useEffect(() => {
    document.title = "Kitaplık  -  Kitap Ekle";
  }, []);

  return (
    <div className="container">
      <Header />
      <AddBook />
    </div>
  );
};

export default Addbook;
