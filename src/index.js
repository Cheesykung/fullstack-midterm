import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import 'bulma/css/bulma.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './components/App'
import Home from './components/Home';
import PostPage from './components/PostPage'
import UserPage from './components/userPage'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts/" element={<App />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/user/:id" element={<UserPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
