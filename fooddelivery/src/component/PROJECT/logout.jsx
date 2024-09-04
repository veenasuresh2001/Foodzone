import React from 'react';

const LogoutButton = () => {
  const handleLogout = () => {  
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('cName');
    sessionStorage.removeItem("amount");
   sessionStorage.removeItem("hotelname")
   sessionStorage.removeItem("hName")
    // Redirect to the login page or any other desired page
    window.location.href = '/home'; // Redirect to login page
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default LogoutButton;