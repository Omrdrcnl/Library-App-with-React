import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import Modal from "./Modal";

const ListBooks = (props) => {
  const [books, setBooks] = useState(null);
  const [categories, setCategories] = useState(null);
  const [didUpdate, setDidUpdate] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [silinecekKitap, setSilinecekKitap] = useState(null);

  

  const deleteBook = (id) => {
    console.log(id);
    axios
      .delete(` http://localhost:3004/books/${id}`)
      .then((res) => {
        console.log(res);
        setDidUpdate(!didUpdate);
        setShowModal(false);
      })
      .catch((err) => console.log(err));
  };

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
            }, 1000);
          })
          .catch((err) => console.log("categories error", err));
      })
      .catch((err) => console.log("books error", err));
  }, [didUpdate]);
  if (books === null || categories === null) {
    return (
      <div className="text-center my-5">
        <Loading />
      </div>
    );
  }
  return (
    <div>
      <div className="d-flex justify-content-end">
        <Link
          to="/Add-book"
          className="btn btn-primary mt-5 mb-1 
      "
        >
          Kitap Ekle
        </Link>
      </div>
      <table className="table ">
        <thead className="bg-info">
          <tr>
            <th scope="col">Kitap Adı</th>
            <th scope="col">Yazar</th>
            <th scope="col">Kategori</th>
            <th className="text-center" scope="col">
              Isbn
            </th>
            <th scope="col">İşlem</th>
          </tr>
        </thead>
        <tbody>
          {books.map((books) => {
            const category = categories.find(
              (cat) => cat.id === books.categoryId
            );
            return (
              <tr>
                <th> {books.name}</th>
                <td> {books.author} </td>
                <td> {category.name} </td>
                <td> {books.isbn} </td>
                <td className="d-flex">
                  <button
                    onClick={() => {
                      setShowModal(true);
                      setSilinecekKitap(books.id)}} 
                    className="btn btn-danger mx-1 btn-sm"  >
                    Sil
                  </button>
                  <Link
                    to={`/edit-Book/${books.id}`}
                    className="btn btn-sm btn-success"
                  >
                    Düzenle
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {
        showModal===true && <Modal 
        title = "Silme İşlemi"
        acıklama = "Devam etmek istiyor musunuz ?"
        yapılacakIs = {()=>deleteBook(silinecekKitap)}
        setShowModal={setShowModal}/>
      }
    </div>
  );
};

export default ListBooks;
