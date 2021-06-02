import React, {useState} from 'react';
import './style.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';


function CardBook({book}) {

  return (
    <div className="row cardbook mt-3">
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
