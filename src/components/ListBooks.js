import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import { useSelector, useDispatch } from "react-redux";

const ListBooks = (props) => {
  const dispatch = useDispatch();
  // const uygulamaStatei = useSelector((state)=>state);
  const { categoriesState, booksState } = useSelector((state) => state);
  console.log(categoriesState);
  console.log(booksState);
  //Js-destruction ile state içinceki yalnız categories statei çekmek için kullandık.
  // aksi halde tüm state bir dizi içinde gelecektir. diğer ifade ona örnektir.
  //console.log(uygulamaStatei);

  // const [books, setBooks] = useState(null); bookState'i ekleyince kaldırdık.
  // const [categories, setCategories] = useState(null);
  const [didUpdate, setDidUpdate] = useState(false);
  const [onCancel, setOnCancel] = useState(false);
  const [silinecekKitap, setSilinecekKitap] = useState(null);

  const deleteBook = (id) => {
    console.log(id);
    axios
      .delete(` http://localhost:3004/books/${id}`)
      .then((res) => {
        dispatch({type:"DELETE_BOOK", payload : id}) 
        console.log(res);
        setDidUpdate(!didUpdate);
        setOnCancel(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    // axios
    //   .get(" http://localhost:3004/books")
    //   .then((resBook) => {
    //     setBooks(resBook.data);
    //     // axios
    //     //   .get(" http://localhost:3004/categories")
    //     //   .then((resCat) => {
    //     //     setTimeout(() => {
    //     //       setCategories(resCat.data);
    //     //     }, 1000);
    //     //   })
    //     //   .catch((err) => console.log("categories error", err));
    //   })
    //   .catch((err) => console.log("books error", err));
  }, [didUpdate]);
  if (booksState.success !== true || categoriesState.success == !true) {
    // categories === null // books == null
    return (
      <div className="text-center my-5">
        <Loading />
      </div>
    );
  }
  return (
    <div>
      <div className="d-flex justify-content-end">
        <Link to="/Add-book" className="btn btn-primary mt-5 mb-1">
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
          {booksState.books.map((books) => {
            //books.map
            const category = categoriesState.categories.find(
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
                      setOnCancel(true);
                      setSilinecekKitap(books.id);
                    }}
                    className="btn btn-danger mx-1 btn-sm"
                  >
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
      {onCancel === true && (
        <Modal
          title="Silme İşlemi"
          acıklama="Devam etmek istiyor musunuz ?"
          onConfirm={() => deleteBook(silinecekKitap)}
          onCancel={() => setOnCancel(false)}
        />
      )}
    </div>
  );
};

export default ListBooks;
