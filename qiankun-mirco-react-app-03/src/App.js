import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './views/Home';
import About from './views/About';
import './App.css';

function App() {
  return (
    <div className="App">
      <nav className="App-nav">
        <div className="nav-container">
          <div className="nav-brand">
            <h2>React 微前端子系统</h2>
          </div>
          <div className="nav-links">
            <Link to="/" className="nav-link">首页</Link>
            <Link to="/about" className="nav-link">关于</Link>
          </div>
        </div>
      </nav>
      
      <main className="App-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
