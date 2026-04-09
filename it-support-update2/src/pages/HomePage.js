// src/pages/HomePage.js
import React from 'react';
import RequestForm from '../components/RequestForm';
import RequestList from '../components/RequestList';

function HomePage({ requests, addRequest }) {
  return (
    <div className="home-page">
      {/* OVERSKRIFT: Forklarer hva siden er for */}
      <div className="page-header">
        <h2>IT Support for Elever</h2>
        <p>Send inn en supportforespørsel hvis du har problemer med datamaskin, nettverk eller programvare.</p>
      </div>

      {/* TO KOLONNER: Venstre for skjema, høyre for liste */}
      <div className="content-grid">
        <div className="content-section">
          <h3>Send inn ny supportforespørsel</h3>
          <RequestForm addRequest={addRequest} />
        </div>
        
        <div className="content-section">
          <RequestList requests={requests} />
        </div>
      </div>
    </div>
  );
}

export default HomePage;