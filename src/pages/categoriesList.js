import React, { useEffect } from "react";
import Header from "../components/Header";

const CategoriesList = (props) => {
  return (
    <div>
      <Header />
      <table className="table container my-5">
        <thead>
          <tr>
            <th className="justify-content-center">Kategoriler</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Roman</th>
            <td>
              <button className="btn btn-primary mx-2">Düzenle</button>
              <button className="btn btn-danger">Sil</button>
            </td>
          </tr>
          <tr>
            <th scope="row">Hikaye</th>
            <td>
              <button className="btn btn-primary mx-2">Düzenle</button>
              <button className="btn btn-danger">Sil</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CategoriesList;
