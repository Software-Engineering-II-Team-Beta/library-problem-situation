import React, { useState, useEffect } from "react";
import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

import * as api from "../../services/api/index";

function RecentsBooks() {
  const token = useSelector((state) => state.session.token);
  const [searchValue, setSearchValue] = useState("");
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const { data } = await api.book._getBooks({
        token: token,
        numberPerPage: 0,
      });

      setBooks(data);
      console.log(data);
    };

    fetchBooks();
  }, []);

  const format = (text) =>
    text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  const handleSearch = (e) => {
    e.preventDefault();

    const filteredBooks = books.filter((book) => {
      const bookName = format(book.titulo);
      const searchText = format(searchValue);
      return bookName.indexOf(searchText) > -1;
    });

    setBooks(filteredBooks);
  };

  return (
    <div className="container recents-books">
      <div className="row">
        <div className="col-12 col-md-6 mt-5">
          <h2 className="recents-books--title mt-0">Mais Recentes</h2>
          <div className="recents-books--list-books">
            <div className="form-search">
              <form action="" method="get" className="d-flex">
                <input
                  type="text"
                  name="search"
                  id=""
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.currentTarget.value)}
                />
                <button
                  className="btn"
                  type="submit"
                  onClick={handleSearch}
                >
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </form>
            </div>
            <div className="">
              {books !== undefined &&
                books.map((book, index) => (
                  <div key={index}>
                    <span> {book.titulo} </span>
                    <span> {book.autor} </span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 mt-5">
          <div className="recents-books--sidebar">
            <div className="recents-books--title-categories mt-4">
              <h3>Categorias</h3>
            </div>

            <div className="recents-books--categories mt-4">
              <span>Categoria 1</span>
              <span>Categoria 2</span>
              <span>Categoria 3</span>
              <span>Categoria 4</span>
              <span>Categoria 5</span>
              <span>Categoria 6</span>
              <span>Categoria 7</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecentsBooks;
