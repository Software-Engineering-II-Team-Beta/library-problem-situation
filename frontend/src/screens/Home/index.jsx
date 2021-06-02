import React, {useState} from "react";
import {useHistory} from "react-router-dom";

// import image from '../../assets/images/home/banner.png';

import * as api from "../../services/api/index";

import {useDispatch} from "react-redux";
import * as SessionActions from "../../store/actions/session";

import Banner from "../../assets/images/home/banner.png";
import "./style.scss";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";

function Home() {
  const [signUpEmail, setsignUpEmail] = useState("");
  const [cpf, setCPF] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhone] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [signInEmail, setSignInEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");

  const dispatch = useDispatch();

  const setUser = (user) => {
    dispatch(SessionActions.setUser(user));
  };

  const setToken = (token) => {
    dispatch(SessionActions.setToken(token));
  };

  const history = useHistory("");

  function validateSignUpData() {
    if (
      !signUpEmail.trim() &&
      !cpf.trim() &&
      !address.trim() &&
      !phoneNumber.trim() &&
      !signUpPassword.trim()
    )
      return false;
    return true;
  }

  function validateSignInData() {
    if (!signInEmail.trim() && !signInPassword.trim()) return false;
    return true;
  }

  async function signUp() {
    if (validateSignUpData()) {
      try {
        const ping = await api.ping();
        // console.log(ping);

        const {data} = await api.users._createUser({
          email: signUpEmail,
          cpf: cpf,
          address: address,
          phoneNumber: phoneNumber,
          password: signUpPassword,
        });

        console.log(data);

        const {data: signInData} = await api.auth._login({
          email: signUpEmail,
          password: signUpPassword,
        });

        const {user, token} = signInData;
        console.log(signInData);

        setUser(user);
        setToken(token);
        console.log(user, token);

        console.log(signInData);

        history.push("/dashboard");
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function signIn() {
    if (validateSignInData()) {
      try {
        const {data} = await api.auth._login({
          email: signInEmail,
          password: signInPassword,
        });

        console.log(data);
        const {user, token} = data;
        console.log(user, token);

        setUser(user);
        setToken(token);

        history.push("/dashboard");
      } catch (error) {
        console.log(error);
        // if (error.response) {
        //   // The request was made and the server responded with a status code
        //   // that falls out of the range of 2xx
        //   console.log(error.response.data);
        //   alert(error.response.data.error);
        // }
      }
    }
  }

  return (
    <div className="container homepage">
      <div className="row">
        <div className="col-12 col-md-6">
          <div className="content-home">
            <h1 className="mt-5 title-home">Sistema de empréstimo - MATA 63</h1>
            <img className="banner" src={Banner} alt="" />
            <form action="" method="get" className="d-flex form-search--home">
              <input placeholder="Busque um livro" className="searchbar" />
              <button className="btn" type="submit">
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </form>
          </div>
        </div>

        <div className="col-12 col-md-6">
          <div className="registration">
            <h2>Cadastre-se</h2>
            <input
              placeholder="Email"
              value={signUpEmail}
              onChange={(e) => setsignUpEmail(e.currentTarget.value)}
            />
            <input
              placeholder="CPF"
              value={cpf}
              onChange={(e) => setCPF(e.currentTarget.value)}
            />
            <input
              placeholder="Endereço"
              value={address}
              onChange={(e) => setAddress(e.currentTarget.value)}
            />
            <input
              placeholder="Telefone"
              value={phoneNumber}
              onChange={(e) => setPhone(e.currentTarget.value)}
            />
            <input
              placeholder="Senha"
              value={signUpPassword}
              onChange={(e) => setSignUpPassword(e.currentTarget.value)}
              type="password"
            />
            <button className="registration" onClick={signUp}>
              cadastrar-se
            </button>

            <h2>Login</h2>
            <input
              placeholder="Email"
              value={signInEmail}
              onChange={(e) => setSignInEmail(e.currentTarget.value)}
            />
            <input
              placeholder="Senha"
              value={signInPassword}
              onChange={(e) => setSignInPassword(e.currentTarget.value)}
              type="password"
            />
            <button className="registration" onClick={signIn}>
              login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
