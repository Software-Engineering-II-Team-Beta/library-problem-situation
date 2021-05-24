import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';

import image from '../../assets/image1.png'

import api from '../../services/api'

function Home() {
  const [signUpEmail, setsignUpEmail] = useState("");
  const [cpf, setCPF] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [signInEmail, setSignInEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");

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
    <div className="homepage">
      <div className="left">
        <h1 className="title">Sistema de empréstimo - MATA63</h1>
        <img 
          className="image"
          src={image} 
          alt="" 
        />
        <input 
          className="searchbar"
          placeholder="Busque um livro" 
        />
      </div>
      <div className="registration">
        <h2 className="subtitle">Cadastre-se</h2>
        <input placeholder="E-mail" value={signUpEmail} onChange={(e) => setsignUpEmail(e.currentTarget.value)} />
        <input placeholder="CPF" value={cpf} onChange={(e) => setCPF(e.currentTarget.value)} />
        <input placeholder="Endereço" value={address} onChange={(e) => setAddress(e.currentTarget.value)} />
        <input placeholder="Telefone" value={phone} onChange={(e) => setPhone(e.currentTarget.value)} />
        <div>
          <input placeholder="Usuário" value={username} onChange={(e) => setUsername(e.currentTarget.value)} />
          <input placeholder="Senha" value={signUpPassword} onChange={(e) => setSignUpPassword(e.currentTarget.value)} />
        </div>
        <button className="registration" onClick={validateSignUpData}>cadastrar-se</button>
        <h2 className="subtitle">Login</h2>
        <input placeholder="Usuário" value={signInEmail} onChange={(e) => setSignInEmail(e.currentTarget.value)} />
        <input placeholder="Senha" value={signInPassword} onChange={(e) => setSignInPassword(e.currentTarget.value)} />
        <button className="registration" onClick={validateSignInData}>login</button>
      </div>
    </div>
  );
}

export default Home;
