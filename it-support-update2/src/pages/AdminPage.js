// src/pages/AdminPage.js
import React, { useState } from 'react';

const AdminPage = ({ requests, updateRequestStatus, updatePriority, deleteRequest}) => {
  // AUTHENTICATION STATE - Håndterer admin login/logout
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // LOGIN HANDLERS - Validerer passord og håndterer tilgang
  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Feil passord. Prøv igjen.');
    }
  };

  // LOGOUT HANDLER - Logger ut admin
  const handleLogout = () => {
    setIsLoggedIn(false);
    setPassword('');
  };

  // REQUEST STATUS HANDLER - Proxy til App.js funksjon
  const handleStatusChange = (id, newStatus) => {
    updateRequestStatus(id, newStatus);
  };

  // LOGIN VIEW - Viser passordskjema hvis ikke autentisert
  if (!isLoggedIn) {
    return (
      <div className="admin-login-page">
        <h2>Admin Login</h2>
        <p>Skriv inn passord for å se meldinger</p>
        
        <form onSubmit={handleLogin} className="login-form">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Passord"
            required
          />
          {error && <p className="error">{error}</p>}
          <button type="submit">Logg inn</button>
          <p className="hint">Hint: Passord er "......"</p>
        </form>
      </div>
    );
  }

  // ADMIN DASHBOARD - Viser alle meldinger og statistikk
  return (
    <div className="admin-page">
      {/* ADMIN HEADER - Kontrollpanel med logout-knapp */}
      <div className="admin-header">
        <h2>Admin - Alle Meldinger</h2>
        <button onClick={handleLogout} className="logout-btn">Logg ut</button>
      </div>

      {/* STATISTICS PANEL - Oversikt over meldingsstatus */}
      <div className="stats">
        <p>Totalt: {requests.length} meldinger | 
           Ny: {requests.filter(r => r.status === 'Ny').length} | 
           Løst: {requests.filter(r => r.status === 'Løst').length}
        </p>
      </div>


      {/* REQUEST LIST - Viser alle meldinger med statuskontroll */}
      <div className="requests-list">
        {requests.length === 0 ? (
          <p className="empty">Ingen meldinger ennå</p>
        ) : (


          requests.map(request => (
            <div key={request.id} className={`request-card ${request.status === 'Løst' ? 'solved' : 'new'}`}>
              {/* REQUEST HEADER - Problemtype og statusindikator */}
              <div className="request-info">
                <h4>{request.problemtype}</h4>
                <span className={`status ${request.status === 'Løst' ? 'solved' : 'new'}`}>
                  {request.status}
                </span>
              </div>

              

              <div className={`priority-badge priority-${(request.prioritet || 'Middels').toLowerCase()}
              `}>
  {request.prioritet === 'Høy' && '🔥 HØY PRIORITET'}
  {request.prioritet === 'Middels' && '🟡 MIDDELS PRIORITET'}
  {request.prioritet === 'Lav' && '🟢 LAV PRIORITET'}
  {!request.prioritet && '🟡 MIDDELS PRIORITET'}
</div>


{request.prioritet === 'Høy' && (
  <p className="warning-msg">⚠️ Denne saken haster!</p>
)}

{request.prioritet === 'Lav' && (
  <p className="info-msg">ℹ️ Dette er en lav-prioritet sak</p>
)}


              


              <div className="priority-selector">
  <label>🎯 Prioritet: </label>
  <select 
    value={request.prioritet || 'Middels'}
    onChange={(e) => updatePriority(request.id, e.target.value)}
  >
    <option value="Høy">🔥 Høy</option>
    <option value="Middels">🟡 Middels</option>
    <option value="Lav">🟢 Lav</option>
  </select>
</div>

              
              {/* REQUEST DETAILS - Full informasjon om meldingen */}
              <p><strong>Beskrivelse:</strong> {request.beskrivelse}</p>
              <p><strong>Fra:</strong> {request.fullNavn} ({request.epost})</p>
              <p><strong>Dato:</strong> {request.dato} {request.tid}</p>

              {/* STATUS CONTROLS - Knapper for å oppdatere status */}
              <div className="status-buttons">
                <button 
                  onClick={() => handleStatusChange(request.id, 'Ny')}
                  className={request.status === 'Ny' ? 'active' : ''}
                >
                  Ny
                </button>
                <button 
                  onClick={() => handleStatusChange(request.id, 'Løst')}
                  className={request.status === 'Løst' ? 'active' : ''}
                >
                  Løst
                </button>

                <button 
                onClick={() => deleteRequest(request.id)} 
               className="delete-btn"
               >
                  🗑️ Slett
            </button>

              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminPage;