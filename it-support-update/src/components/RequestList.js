// src/components/RequestList.js
import React from 'react';

function RequestList({ requests }) {

  const getPriorityDisplay = (prioritet) => {
    switch(prioritet) {
      case 'Høy': return { text: '🔥 Høy', class: 'priority-high' };
      case 'Middels': return { text: '🟡 Middels', class: 'priority-medium' };
      case 'Lav': return { text: '🟢 Lav', class: 'priority-low' };
      default: return { text: '🟡 Middels', class: 'priority-medium' };
    }
  };

  return (
    <div className="requests-list">
      {/* LIST HEADER - Viser tittel med antall meldinger */}
      <h3>Mine innsendte forespørsler ({requests.length})</h3>
      
      {/* CONDITIONAL RENDERING - Enten tom liste eller meldinger */}
      {requests.length === 0 ? (
        <div className="empty">
          <p>Du har ikke sendt inn noen meldinger ennå.</p>
          <p>Bruk skjemaet til venstre for å sende inn din første melding.</p>
        </div>
      ) : (
        <div className="requests">
          {/* REQUEST ITEMS - Gjennomgår alle meldinger med .map() */}
          {requests.map(request => (
            <div key={request.id} className={`request-item ${request.status === 'Løst' ? 'solved' : 'new'}`}>
              {/* REQUEST HEADER - Problemtype og statusindikator */}
              <div className="request-header">
                <h4>{request.problemtype}</h4>
                <span className={`status ${request.status === 'Løst' ? 'solved' : 'new'}`}>
                  {request.status}
                </span>
              </div>
              

              {(() => {
  const priority = getPriorityDisplay(request.prioritet || 'Middels');
  return (
    <div className={`request-priority ${priority.class}`}>
      <span className="priority-label">Prioritet:</span>
      <span className="priority-value">{priority.text}</span>
    </div>
  );
})()}

              
              {/* REQUEST DESCRIPTION - Detaljert problembeskrivelse */}
              <p><strong>Beskrivelse:</strong> {request.beskrivelse}</p>
              
              {/* REQUEST FOOTER - Metadata om meldingen */}
              <div className="request-footer">
                <span>{request.dato} {request.tid}</span>
                <span>{request.fullNavn}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RequestList;