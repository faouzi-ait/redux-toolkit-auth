import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Private from './components/Private';
import UserDetail from './pages/UserPage';
import Memos from './pages/Memos';

const App = () => {
    return (
      <Router>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route element={<Private redirectTo='/' />}>
              <Route path="/private" element={<UserDetail />} />
              <Route path="/memos" element={<Memos />} />
            </Route>
        </Routes>
      </Router>
    )
}
export default App;