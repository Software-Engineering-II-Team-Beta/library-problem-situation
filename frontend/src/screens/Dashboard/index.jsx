import React from 'react';
import {useHistory} from 'react-router-dom';

import { useSelector } from 'react-redux'

function Dashboard() {
  const user = useSelector(state => state.session.user)
  const history = useHistory("");

  // event of logout button
  const handleLogout = () => {
    history.push('/');
  };

  const h2style = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "100px",
    color: "white",
  };

  const greycircle = {
    backgroundColor: "#a9aeb3",
    width: "128px",
    height: "128px",
    borderRadius: "50%",
  };

  const greencircle = {
    backgroundColor: "#00ff00",
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    marginRight: "20px",
  };

  const separator = {
    backgroundColor: "#d9e0e6",
    width: "100%",
    height: "5px",
  };

  const h3style = {
    display: "flex",
    paddingLeft: "10%",
    color: "white",
  };

  return (
    <div className="dashboard">
      <div className="sidebar">
        <div className="profilepicture">
          <div style={greycircle}></div>
        </div>
        <h2 style={h2style}> <div style={greencircle} /> {user.name ? user.name : 'Jane Doe'}</h2>
        <h3 style={h3style} >Meus livros</h3>
        <div style={separator} />
        <h3 style={h3style} >Empréstimos</h3>
        <div style={separator} />
        <h3 style={h3style} >Avaliações</h3>
        <div style={separator} />
        <h3 style={h3style} >Meus Grupos</h3>
        <div style={separator} />
        <h3 style={h3style} >Etiquetas</h3>
        {/* <input type="button" onClick={handleLogout} value="Logout" /> */}
      </div>
      <div style={{
        display: "flex",
        flexDirection: "column",
        boxSizing: 'border-box',
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%",
        height: "10%",
      }}>
        <h2
          style={{
            color: 'black',
            width: "85%",
            marginBottom: 0,
          }}
        >
          Dashboard
        </h2>
        <div style={{
          backgroundColor: "#a9aeb3",
          display: 'flex',
          width: "85%",
          height: "5px"
        }} />
      </div>
    </div >
  );
}

export default Dashboard;
