import React from "react";
import { Link } from "react-router-dom";

const Header = (props) => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-info">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand" href="#">
            Kitaplığım
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link" aria-current="page">
                  Kitaplar
                </Link>
                <Link
                  to="/categoriesList"
                  className="nav-link"
                  aria-current="page"
                >
                  Kategoriler
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
