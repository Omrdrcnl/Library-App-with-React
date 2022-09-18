import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "./Loading";

const AddBook = (props) => {
  const [categories, setCategories] = useState(null);
  const [bookName, setBookName] = useState(" ");
  const [authorName, setAuthorName] = useState(" ");
  const [isbn, setisbn] = useState("");
  const [category, setCategory] = useState();
  useEffect(() => {
    axios
      .get("http://localhost:3004/categories")
      .then((res) => {
        console.log(res);
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  if (categories === null) {
    return(<div><Loading/></div>)
    
    
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    if (bookName === "" || authorName === "" || category === "") {
      alert("Kitap adı, Yazarı veya Kategorisi Boş Bırakılamaz.");
    }
    const newBook = {
      id: new Date().getTime(),
      name: bookName,
      author: authorName,
      isbn: isbn,
      categoryId: category,
    };
    axios
      .post("http://localhost:3004/books", newBook )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <form className="form my-5" onSubmit={handleSubmit}>
      <div className="row g-3 my-3">
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="Kitap Adı"
            value={bookName}
            onChange={(event) => setBookName(event.target.value)}
          />
        </div>
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="Yazarı2"
            value={authorName}
            onChange={(event) => setAuthorName(event.target.value)}
          />
        </div>
      </div>
      <div className="row g-3">
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="ISBN"
            value={isbn}
            onChange={(event) => setisbn(event.target.value)}
          />
        </div>
        <div className="col">
          <select
            class="form-select"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <option value={""} selected>
              Kategori seçiniz
            </option>
            {categories.map((cat) => {
              return <option value={cat.id}>{cat.name}</option>;
            })}
            ;
          </select>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <button type="submit" className="btn btn-info btn-md w-50 my-5">
          Kaydet
        </button>
      </div>
    </form>
  );
};

export default AddBook;
