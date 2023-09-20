import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PokemonDetails from './components/PokemonDetails.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router basename='/Pokedex/'>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/:pageNumber/" element={<App/>} />
      <Route path="/:pageNumber/:pokemonId" element={<App />} />
      
    </Routes>
  </Router>
  </React.StrictMode>,
)
