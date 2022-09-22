import { useEffect } from "react";
import Header from "../components/Header";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import Loading from "../components/Loading";

const EditBook = () => {

    const navigate = useNavigate();
  const params = useParams();
  console.log("param değeri", params);

  const [bookName, setBookName] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [isbn, setisbn] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3004/books/${params.booksId}`)
      .then((res) => {
        console.log(res.data);
        setBookName(res.data.name);
        setAuthorName(res.data.author);
        setisbn(res.data.isbn);
        setCategory(res.data.categoryId);
        axios
          .get("http://localhost:3004/categories")
          .then((resCat) => {
            console.log(resCat);

            setCategories(resCat.data);
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (bookName === "" || authorName === "" || category === "") {
      alert("Kitap adı, Yazarı veya Kategorisi Boş Bırakılamaz.");
      return;
    }
    const updatedBook = {
      name: bookName,
      author: authorName,
      id: params.booksId,
      isbn: isbn,
      categoryId: category,
    };
    axios
      .put(`http://localhost:3004/books/${params.booksId}`, updatedBook)
      .then((resUp) => {
        console.log(resUp);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };
  if (categories === null) {
    return <Loading />;
  }

  return (
    <div>
      <Header />
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
              placeholder="Yazarı"
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
              onChange={(event) => setCategory(event.target.value)}>
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
          <button onClick={()=> navigate("/")} type="button" className="btn btn-danger me-2 btn-md w-25 my-5">
            Vazgeç
          </button>
          <button type="submit" className="btn btn-info btn-md w-25 my-5">
            Kaydet
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBook;
