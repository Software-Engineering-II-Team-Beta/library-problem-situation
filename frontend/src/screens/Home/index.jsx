import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';

import image from '../../assets/image1.png'

import api from '../../services/api'

import { useSelector, useDispatch } from 'react-redux'
import * as SessionActions from '../../store/actions/session'

import Banner from '../../assets/images/home/banner.png'
import './style.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

function Home() {
  const [signUpEmail, setsignUpEmail] = useState("");
  const [cpf, setCPF] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [signInEmail, setSignInEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");

  const dispatch = useDispatch()

  const setUser = (user) => {
    dispatch(SessionActions.setUser(user))
  }

  const history = useHistory("");

  function validateSignUpData() { 
    if(!!signUpEmail.trim() && 
      !!cpf.trim() &&
      !!address.trim() &&
      !!phone.trim() &&
      !!username.trim() &&
      !!signUpPassword.trim()
    ) return;

    signUp()
  }

  function validateSignInData() {
    if(!!signInEmail.trim() && !!setSignInPassword.trim()) return;

    signIn()
  }

  async function signUp(formData) {
    try {
      const { data } = await api.post("auth/register", {
        email: formData.signUpEmail,
        cpf: formData.cpf,
        address: formData.address,
        phone: formData.phone,
        username: formData.username,
        password: formData.signUpPassword,
      })

      console.log(data)

      history.push("/dashboard");
    } catch(error) {
      console.log(error)
    }
  }

  async function signIn() {
    try {
      const { data } = await api.post("auth/login", {
        email: signInEmail,
        password: signInPassword
      })

      // const {
      //   user,
      //   token
      // } = data

      console.log(data)

      history.push("/dashboard");
    } catch(error) {
      console.log(error)
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        alert(error.response.data.error)
      }
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
    </div>
  );
}

export default Home;
