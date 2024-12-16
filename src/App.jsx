import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import User from './pages/user/User';
import Login from './Login';
import { AuthProvider } from './AuthProvider';
import PrivateRoutes from './components/PrivateRoutes';

function App() {
  return (
    <Router>
      <AuthProvider>
        {""}
        <Routes>
          <Route element={<PrivateRoutes/>}>
            {""}
            <Route path="/" element={<User />} />
            <Route path='/users' element={<User />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;

