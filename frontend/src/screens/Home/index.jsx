import React from 'react';

function Home() {
  return (
    <div className="homepage">
      {/* <h1>Sistema de empréstimo de livros</h1> */}
      <input placeholder="Busque um livro" className="searchbar"></input>
      <div className="registration">
        <h2>Cadastre-se</h2>
        <input placeholder="Email"></input>
        <input placeholder="CPF"></input>
        <input placeholder="Endereço"></input>
        <input placeholder="Telefone"></input>
        <div>
          <input placeholder="Usuário"></input>
          <input placeholder="Senha"></input>
        </div>
        <button>Cadastre-se</button>

        <h2>Login</h2>
        <input placeholder="Usuário"></input>
        <input placeholder="Senha"></input>
      </div>
    </div >
  );
}

export default Home;
