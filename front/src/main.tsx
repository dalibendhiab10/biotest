import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/Login';
import SignUpPage from '@pages/Signup';
import MyAnalysesPage from '@pages/MyAnalyses';
import ConsultAnalysesPage from '@pages/ConsultAnalysesPage';
import PanierPage from '@pages/PanierPage';
import MyCatalogPage from '@pages/mycatalog';
import axios from 'axios';


axios.defaults.baseURL = import.meta.env.VITE_NODE_SERVER_HOST;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
 

        
        <Route path="/panier" element={<PanierPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/analyses" element={<MyAnalysesPage />} />
        <Route path="/mycatalog" element={<MyCatalogPage/>} />
        <Route path="/consult-analyses" element={<ConsultAnalysesPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
