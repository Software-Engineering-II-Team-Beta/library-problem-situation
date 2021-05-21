import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';

function Home() {
  const [email, set_email] = useState("");
  const [cpf, set_cpf] = useState("");
  const [address, set_address] = useState("");
  const [phone, set_phone] = useState("");
  const [username, set_username] = useState("");
  const [password, set_password] = useState("");

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
    < div className="homepage" >
      {/* <h1>Sistema de empréstimo - MATA63</h1> */}
      <input placeholder="Busque um livro" className="searchbar" />
      <div className="registration">
        <h2>Cadastre-se</h2>
        <input placeholder="Email" value={email} onChange={(e) => set_email(e.currentTarget.value)} />
        <input placeholder="CPF" value={cpf} onChange={(e) => set_cpf(e.currentTarget.value)} />
        <input placeholder="Endereço" value={address} onChange={(e) => set_address(e.currentTarget.value)} />
        <input placeholder="Telefone" value={phone} onChange={(e) => set_phone(e.currentTarget.value)} />
        <div>
          <input placeholder="Usuário" value={username} onChange={(e) => set_username(e.currentTarget.value)} />
          <input placeholder="Senha" value={password} onChange={(e) => set_password(e.currentTarget.value)} />
        </div>
        <button className="registration" onClick={register}>cadastrar-se</button>

        <h2>Login</h2>
        <input placeholder="Usuário" value={username} onChange={(e) => set_username(e.currentTarget.value)} />
        <input placeholder="Senha" value={password} onChange={(e) => set_password(e.currentTarget.value)} />
        <button className="registration" onClick={login}>login</button>
      </div>
    </div >
  );
}

export default Home;
