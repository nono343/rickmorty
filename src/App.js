import React from "react";
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./pages/home";
import { Navbar } from "./components/navbar";
import { Characters } from "./pages/characters";
import { Episodes } from "./pages/episodes";
import { Locations } from "./pages/locations";
import { Location } from "./pages/location";
import { Character } from "./pages/character";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/characters" element={<Characters/>} />
          <Route path="/characters/:theid" element={<Character/>} />
          <Route path="/locations" element={<Locations/>} />
          <Route path="/locations/:theid" element={<Location/>} />
          <Route path="/episodes" element={<Episodes/>} />
          {/* Agrega más rutas aquí si es necesario */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
