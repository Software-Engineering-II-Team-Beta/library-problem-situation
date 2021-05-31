import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';

import image from '../../assets/image1.png';

import * as api from '../../services/api/index';

import {useSelector, useDispatch} from 'react-redux';
import * as SessionActions from '../../store/actions/session';

import Banner from '../../assets/images/home/banner.png';
import './style.scss';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';

function Home() {
  const [signUpEmail, setsignUpEmail] = useState("");
  const [cpf, setCPF] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [signInEmail, setSignInEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");

  const dispatch = useDispatch();

  const setUser = (user) => {
    dispatch(SessionActions.setUser(user));
  };

  const history = useHistory("");

  function validateSignUpData() {
    if (!!signUpEmail.trim() &&
      !!cpf.trim() &&
      !!address.trim() &&
      !!phoneNumber.trim() &&
      !!username.trim() &&
      !!signUpPassword.trim()
    ) return false;
    return true;
  }

  function validateSignInData() {
    if (!!signInEmail.trim() && !!setSignInPassword.trim()) return false;
    return true;
  }

  async function signUp() {
    if (validateSignUpData()) {
      try {
        const data = await api.users._createUser({
          email: signUpEmail,
          cpf: cpf,
          address: address,
          phoneNumber: phoneNumber,
          username: username,
          password: signUpPassword,
        });

        console.log(data);

        history.push("/dashboard");
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function signIn() {
    if (validateSignInData()) {
      try {
        const data = await api.auth._login({
          email: signInEmail,
          password: signInPassword,
        });

        // const {
        //   user,
        //   token
        // } = data

        console.log(data);

        history.push("/dashboard");
      } catch (error) {
        console.log(error);
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          alert(error.response.data.error);
        }
      }
    }
  }

  return (
    <div className="container homepage">
      <div className="row">
        <div className="col-12 col-md-6">
          <div className="content-home">
            <h1 className="mt-5 title-home">Sistema de empréstimo - MATA63</h1>
            <img className="banner" src={Banner} alt="" srcset="" />
            <form action="" method="get" className="d-flex form-search--home">
              <input placeholder="Busque um livro" className="searchbar" />
              <button className="btn" type="submit"><FontAwesomeIcon icon={faSearch} /></button>
            </form>
          </div>
        </div>

        <div className="col-12 col-md-6">
          <div className="registration">
            <h2>Cadastre-se</h2>
            <input placeholder="Email" value={signUpEmail} onChange={(e) => setsignUpEmail(e.currentTarget.value)} />
            <input placeholder="CPF" value={cpf} onChange={(e) => setCPF(e.currentTarget.value)} />
            <input placeholder="Endereço" value={address} onChange={(e) => setAddress(e.currentTarget.value)} />
            <input placeholder="Telefone" value={phoneNumber} onChange={(e) => setPhone(e.currentTarget.value)} />
            <div className="d-flex">
              <input className="ml-2" placeholder="Usuário" value={username} onChange={(e) => setUsername(e.currentTarget.value)} />
              <input placeholder="Senha" value={signUpPassword} onChange={(e) => setSignUpPassword(e.currentTarget.value)} />
            </div>
            <button className="registration" onClick={signUp}>cadastrar-se</button>

            <h2>Login</h2>
            <input placeholder="Usuário" value={username} onChange={(e) => setUsername(e.currentTarget.value)} />
            <input placeholder="Senha" value={signInPassword} onChange={(e) => setSignInPassword(e.currentTarget.value)} />
            <button className="registration" onClick={signIn}>login</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
