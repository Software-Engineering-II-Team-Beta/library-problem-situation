import React, {useState} from 'react';
import './style.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPencilAlt} from '@fortawesome/free-solid-svg-icons'


function CardBook(props) {

  return (
    <div className="row cardbook mb-3">
        <div className="col-12 col-md-12 mt-5">
            <h4 className="mt-0">{props.book.titulo}</h4><p className="mt-0">{props.book.autor} </p>
            <hr />
        </div>
        {props.showButtons !== false ? 
          <a href="http://" className="position-absolute button-redirect" title="editar livro"><FontAwesomeIcon icon={faPencilAlt} /></a>
          : ''
        }
    </div>

  );
}

export default CardBook;
