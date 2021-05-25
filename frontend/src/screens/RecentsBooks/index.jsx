import React, {useState} from 'react';
import './style.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

function RecentsBooks() {

  return (
    <div className="container recents-books">
      <div className="row">
        <div className="col-12 col-md-6 mt-5">
          <h2 className="recents-books--title mt-2">Mais Recentes</h2>
          <div className="recents-books--list-books">
            <div className="form-search">
              <form action="" method="get" className="d-flex">
                <input type="text" name="search" id=""/>
                <button className="btn" type="submit"><FontAwesomeIcon icon={faSearch} /></button>
              </form>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6">
          <div className="recents-books--sidebar">

           
          </div>
        </div>
      </div>
    </div >
  );
}

export default RecentsBooks;
