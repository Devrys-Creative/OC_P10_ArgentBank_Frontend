import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.scss';
import { Home } from './pages/home/Home';
import { SignIn } from './pages/signIn/SignIn';
import { UserPanel } from './pages/userPanel/UserPanel';
import { useEffect, useState } from 'react';

export const App = () => {

  const [ pageTitle, setupPageTitle ] = useState("Argent Bank");

  useEffect(() => {
    document.title=`Argent Bank - ${pageTitle}`;
  },[pageTitle])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home pTitle={setupPageTitle}/>} />
        <Route path="/sign-in" element={<SignIn pTitle={setupPageTitle}/>} />
        <Route path="/user-panel" element={<UserPanel pTitle={setupPageTitle}/>} />
      </Routes>
    </BrowserRouter>
  );

};