import React, {useState} from 'react';
import './style.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

//components
import CardBook from '../../components/CardBook'

function RecentsBooks() {

  return (
    <div className="container recents-books">
      <div className="row">
        <div className="col-12 col-md-6 mt-5">
          <h2 className="recents-books--title mt-0">Mais Recentes</h2>
          <div className="recents-books--list-books">
            <div className="form-search mb-5">
              <form action="" method="get" className="d-flex">
                <input type="text" name="search" id=""/>
                <button className="btn" type="submit"><FontAwesomeIcon icon={faSearch} /></button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-12 mt-5">
            <div className="list-books">
              <CardBook/>
              <CardBook/>
            </div>
        </div>
      </div>
    </div >
  );
}

export default RecentsBooks;
