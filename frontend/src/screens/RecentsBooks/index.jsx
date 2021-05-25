import React, {useState} from 'react';
import './style.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

function RecentsBooks() {

  return (
    <div className="container recents-books">
      <div className="row">
        <div className="col-12 col-md-6 mt-5">
          <h2 className="recents-books--title mt-0">Mais Recentes</h2>
          <div className="recents-books--list-books">
            <div className="form-search">
              <form action="" method="get" className="d-flex">
                <input type="text" name="search" id=""/>
                <button className="btn" type="submit"><FontAwesomeIcon icon={faSearch} /></button>
              </form>
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
    </div >
  );
}

export default RecentsBooks;
