import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux'
import * as SessionActions from '../../store/actions/session'

import Banner from '../../assets/images/home/banner.png'
import './style.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

function Home() {
  const [email, set_email] = useState("");
  const [cpf, set_cpf] = useState("");
  const [address, set_address] = useState("");
  const [phone, set_phone] = useState("");
  const [username, set_username] = useState("");
  const [password, set_password] = useState("");

  const dispatch = useDispatch()

  const setUser = (user) => {
    dispatch(SessionActions.setUser(user))
  }

  const history = useHistory("");

  function validate_registration_info(info) {
    // alguma coisa com validação de dados
    return true;
  }

  function validate_login_info(info) {
    // alguma coisa com validação de dados
    return true;
  }

  function register() {
    const info = {
      email: email,
      cpf: cpf,
      address: address,
      phone: phone,
      username: username,
      password: password,
    };
    if (validate_registration_info(info)) {
      // alguma coisa no backend
      history.push("/dashboard");
    }
  }

  function login() {
    const info = {
      username: username,
      password: password,
    };
    if (validate_login_info(info)) {
      // alguma coisa no backend

      history.push("/dashboard");
    }
  }

  return (
    <div className="container homepage">
      <div className="row">
        <div className="col-12 col-md-6">
         <div className="content-home">
            <h1 className="mt-5 title-home">Sistema de empréstimo - MATA63</h1> 
            <img className="banner" src={Banner} alt="" srcset=""/>
            <form action="" method="get" className="d-flex form-search--home">
              <input placeholder="Busque um livro" className="searchbar" />
              <button className="btn" type="submit"><FontAwesomeIcon icon={faSearch} /></button>
            </form>
         </div>
        </div>

        <div className="col-12 col-md-6">
          <div className="registration">
            <h2>Cadastre-se</h2>
            <input placeholder="Email" value={email} onChange={(e) => set_email(e.currentTarget.value)} />
            <input placeholder="CPF" value={cpf} onChange={(e) => set_cpf(e.currentTarget.value)} />
            <input placeholder="Endereço" value={address} onChange={(e) => set_address(e.currentTarget.value)} />
            <input placeholder="Telefone" value={phone} onChange={(e) => set_phone(e.currentTarget.value)} />
            <div className="d-flex">
              <input className="ml-2" placeholder="Usuário" value={username} onChange={(e) => set_username(e.currentTarget.value)} />
              <input placeholder="Senha" value={password} onChange={(e) => set_password(e.currentTarget.value)} />
            </div>
            <button className="registration" onClick={register}>cadastrar-se</button>

            <h2>Login</h2>
            <input placeholder="Usuário" value={username} onChange={(e) => set_username(e.currentTarget.value)} />
            <input placeholder="Senha" value={password} onChange={(e) => set_password(e.currentTarget.value)} />
            <button className="registration" onClick={login}>login</button>
          </div>
        </div>
      </div>
    </div >
  );
}

export default Home;
