import React from 'react';

function Dashboard(props) {

  // event of logout button
  const handleLogout = () => {    
    props.history.push('/login');
  }

  return (
    <div>
      Welcome User!<br /><br />
      <input type="button" onClick={handleLogout} value="Logout" />
    </div>
  );
}

export default Dashboard;