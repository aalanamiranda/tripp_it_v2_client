import React, { useState, useEffect } from 'react';
import './App.css';
import Auth from './auth/Auth';


const App: React.FunctionComponent = () => {
  const [sessionToken, setSessionToken] = useState('');
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    if(localStorage.getItem('token')){
      setSessionToken(localStorage.getItem('token'));
    }
  }, [])

  const updateToken = (newToken: string) => {
    localStorage.setItem('token', newToken);
    setSessionToken(newToken);
    console.log(sessionToken);
  }

  const clearToken =  () => {
    localStorage.clear();
    setSessionToken('');
  }

  return (
    <div className={!sessionToken ? "loginPage" : "homePage"} >
      
    </div>
  );
}

export default App;
