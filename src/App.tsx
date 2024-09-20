import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.scss';
import { Home } from './pages/home/Home';
import { SignIn } from './pages/signIn/SignIn';
import { UserPanel } from './pages/userPanel/UserPanel';

export const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/user-panel" element={<UserPanel />} />
      </Routes>
    </BrowserRouter>
  );

};