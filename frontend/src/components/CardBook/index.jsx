import React, {useState} from 'react';
import './style.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPencilAlt} from '@fortawesome/free-solid-svg-icons';

import {useSelector} from "react-redux";

import * as api from "../../services/api/index";

function CardBook({book, showButtons, setBooks}) {
  const {token} = useSelector((state) => state.session.token);

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
    <div className="row cardbook mt-3">
      <div className="col-12 col-md-12 mt-5">
        <h4 className="mt-0">{book.titulo}</h4><p className="mt-0">{book.autor} </p>
        <hr />
      </div>
      {showButtons !== false ?
        <a href="http://" className="position-absolute button-redirect" title="editar livro"><FontAwesomeIcon icon={faPencilAlt} /></a>
        : ''
      }
    </div>
  );
}

export default CardBook;
