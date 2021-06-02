import React, { useState, useEffect } from "react";
import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

import * as api from "../../services/api/index";

//components
import CardBook from "../../components/CardBook";

function RecentsBooks() {
  const token = useSelector((state) => state.session.token);
  const [searchValue, setSearchValue] = useState("");
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const { data } = await api.book._getBooks({ token: token });

        setBooks(data);
      } catch(e) {
        console.log(e);
      }      
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
            <div className="form-search mb-5">
              <form action="" method="get" className="d-flex">
                <input
                  type="text"
                  name="search"
                  id=""
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.currentTarget.value)}
                />
                <button className="btn" type="submit" onClick={handleSearch}>
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-12 mt-5">
          <div className="list-books">
            {books !== undefined &&
              books.map((book, index) => <CardBook key={index} book={book} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecentsBooks;
