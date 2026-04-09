// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';

function App() {
  // DATA MANAGEMENT - Holder og håndterer alle supportmeldinger
  const [requests, setRequests] = useState([]);
  const [hasLoadedFromStorage, setHasLoadedFromStorage] = useState(false);
  

  // Løsning: Legg til console.log for debugging

  useEffect(() => {
    const saved = localStorage.getItem('it-support-requests');
    if (saved) {
      try {
        const parsedData = JSON.parse(saved);
        if (Array.isArray(parsedData)) {
          setRequests(parsedData);
        }
      } catch (error) {
        console.error('Feil ved lasting fra localStorage:', error);
      }
    }
    setHasLoadedFromStorage(true);
  }, []); // Tom array = kjører KUN ved første lasting

  // LOCALSTORAGE - Lagrer data KUN når vi faktisk har lastet og endrer
  useEffect(() => {
    // VENT til vi har lastet data fra localStorage før vi lagrer
    if (hasLoadedFromStorage && requests.length > 0) {
      localStorage.setItem('it-support-requests', JSON.stringify(requests));
    }
  }, [requests, hasLoadedFromStorage]);



  // DATA FUNCTIONS - Grunnleggende CRUD-operasjoner
  const addRequest = (newRequest) => {
    // Lager komplett melding med ekstra metadata
    const requestWithId = {
      ...newRequest,
      prioritet: 'Middels',
      id: Date.now().toString(),        // Unikt ID basert på tidspunkt
      status: 'Ny',                     // Standard status for nye meldinger
      dato: new Date().toLocaleDateString('no-NO'),     // Dagens dato
      tid: new Date().toLocaleTimeString('no-NO', {     // Klokkeslett
        hour: '2-digit', minute: '2-digit' 
      })
    };
    // Legger til ny melding først i listen (nyeste øverst)
    setRequests([requestWithId, ...requests]);
  };

  const updateRequestStatus = (id, newStatus) => {
    // Oppdaterer kun status på spesifikk melding
    setRequests(requests.map(request => 
      request.id === id ? { ...request, status: newStatus } : request
    ));
  };

  const updatePriority = (id, nyPrioritet) => {
    setRequests(requests.map(request => 
      request.id === id ? { ...request, prioritet: nyPrioritet } : request
    ));
  };

  // APP LAYOUT - Grunnstruktur med navigasjon og routing
  return (
    <Router>
      <div className="app">
        {/* HEADER - Toppbanner med tittel og beskrivelse */}
        <header className="header">
          <h1>IT Support Portal</h1>
          <p>Support for studenter</p>
        </header>

        {/* NAVIGATION - Lenker mellom bruker- og admin-side */}
        <nav className="nav">
          <Link to="/" className="nav-link">Hjem</Link>
          <Link to="/admin" className="nav-link">Admin</Link>
        </nav>

        {/* MAIN CONTENT - Router som bestemmer hvilken side som vises */}
        <main className="container">
          <Routes>
            {/* HomePage - Brukersiden for elever */}
            <Route path="/" element={
              <HomePage requests={requests} addRequest={addRequest} />
            } />
            
            {/* AdminPage - Administrasjonsside for IT-ansatte */}
            <Route path="/admin" element={
              <AdminPage 
                requests={requests} 
                updateRequestStatus={updateRequestStatus} 
                updatePriority={updatePriority}
              />
            } />
          </Routes>
        </main>

        {/* FOOTER - Standard bunntekst med copyright */}
        <footer className="footer">
          <p>IT Support Portal © {new Date().getFullYear()}</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;