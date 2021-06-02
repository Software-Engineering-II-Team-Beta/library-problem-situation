import React, { useState } from "react";
import "./style.scss";

import { useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import * as api from "../../services/api/index";

function CardBook({ book, setBooks }) {
  const { token } = useSelector((state) => state.session.token);

  const handleDelete = () => {
    const deleteBook = async () => {
      try {
        await api.book._deleteBook({
          token: token,
          bookId: book.id,
        });

        setBooks((books) => books.filter((item) => item.id !== book.id));
      } catch (e) {
        console.log(e);
      }
    };

    deleteBook();
  };

  return (
    <div className="row cardbook mb-3">
      <div className="col-12 col-md-12 mt-5">
        <h4 className="mt-0">{book.titulo}</h4>
        <hr />
      </div>

      <div className="col-12 col-md-12 mt-5">
        <p className="mt-0">{book.autor} </p>
      </div>
    </div>
  );
}

export default CardBook;
