import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from 'views/Login';
import Layout from 'containers/Layout';
import ValidasiApproval from 'views/ValidasiApproval';
import ValidasiTidakValid from 'views/ValidasiTidakValid';
import VerifikasiDokumen from 'views/VerifikasiDokumen';
import ProtectedRoute from 'containers/Layout/PageContent/ProtectedRoute';
import KonfirmasiCustomer from 'views/KonfirmasiCustomer';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/*' element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        } />
        <Route path='login' element={<Login />} />
        <Route path='/validasi-approval' element={<ValidasiApproval />} />
        <Route path='/validasi-tidak-valid' element={<ValidasiTidakValid />} />
        <Route path='/verifikasi-dokumen' element={<VerifikasiDokumen />} />
        <Route path='/konfirmasi-customer' element={<KonfirmasiCustomer />} />
      </Routes>
    </Router>
  );
}

export default App;
