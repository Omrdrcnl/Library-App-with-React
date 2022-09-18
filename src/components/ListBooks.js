import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import { Link } from "react-router-dom";

const ListBooks = (props) => {
  const [books, setBooks] = useState(null);
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    axios
      .get(" http://localhost:3004/books")
      .then((resBook) => {
        setBooks(resBook.data);
        axios
          .get(" http://localhost:3004/categories")
          .then((resCat) => {
            setTimeout(() => {
             setCategories(resCat.data);   
            }, 2000);
          })
          .catch((err) => console.log("categories error", err));
      })
      .catch((err) => console.log("books error", err));
  }, []);
  if (books === null || categories === null) {
    return (
      <div
        className="text-center my-5">
        <Loading/>
      </div>
    );
  }
  return (
    <div>
      <div className="d-flex justify-content-end">
        <Link to="/Add-book" className="btn btn-primary mt-5 mb-1 
      ">Kitap Ekle</Link >
      </div>
      <table className="table ">
        <thead className="bg-info">
          <tr>
            <th scope="col">Kitap Adı</th>
            <th scope="col">Yazar</th>
            <th scope="col">Kategori</th>
            <th scope="col">Isbn</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => {
            const category = categories.find(
              (cat) => cat.id = book.categoryId);
            return (
              <tr>
                <th> {book.name}</th>
                <td> {book.author} </td>
                <td> {category.name} </td>
                <td> {book.isbn} </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ListBooks;
