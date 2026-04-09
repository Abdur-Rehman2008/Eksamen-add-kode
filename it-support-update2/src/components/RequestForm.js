// src/components/RequestForm.js
import React, { useState } from 'react';

function RequestForm({ addRequest }) {
  // FORM STATE - Holder alle skjemafeltene i et enkelt objekt
  const [formData, setFormData] = useState({
    fullNavn: '',
    epost: '',
    problemtype: 'Velg problemtype',
    beskrivelse: ''
  });

  // PROBLEM CATEGORIES - Forhåndsdefinerte valg for brukeren
  const problemTyper = [
    'Velg problemtype',
    'Datamaskin',
    'Nettverk',
    'Programvare',
    'Brukernavn/Passord',
    'Skriver',
    'Annet'
  ];

  // INPUT HANDLER - Oppdaterer state når brukeren skriver i felt
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // SUBMIT HANDLER - Validerer og sender data til App.js
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // FORM VALIDATION - Sjekker at alle obligatoriske felt er fylt ut
    if (!formData.fullNavn || !formData.epost || 
        formData.problemtype === 'Velg problemtype' || 
        !formData.beskrivelse) {
      alert('Vennligst fyll ut alle feltene');
      return;
    }

    // DATA SUBMISSION - Sender skjemadata videre til hovedapplikasjonen
    addRequest(formData);
    
    // FORM RESET - Tømmer alle felt for neste melding
    setFormData({
      fullNavn: '',
      epost: '',
      problemtype: 'Velg problemtype',
      beskrivelse: ''
    });

    alert('Melding sendt!');
  };

  // FORM LAYOUT - Definerer strukturen på skjemaet
  return (
    <form onSubmit={handleSubmit} className="support-form">
      {/* PERSONAL INFO - Navn og kontaktinformasjon */}
      <div className="form-group">
        <label>Fullt navn *</label>
        <input
          type="text"
          name="fullNavn"
          value={formData.fullNavn}
          onChange={handleChange}
          placeholder="Skriv ditt fulle navn"
          required
        />
      </div>

      {/* CONTACT INFO - E-post for oppfølging */}
      <div className="form-group">
        <label>E-postadresse *</label>
        <input
          type="email"
          name="epost"
          value={formData.epost}
          onChange={handleChange}
          placeholder="din.epost@skole.no"
          required
        />
      </div>

      {/* PROBLEM CATEGORY - Dropdown for å klassifisere problemet */}
      <div className="form-group">
        <label>Problemtype *</label>
        <select
          name="problemtype"
          value={formData.problemtype}
          onChange={handleChange}
          required
        >
          {problemTyper.map((type, index) => (
            <option key={index} value={type}>{type}</option>
          ))}
        </select>
      </div>

      {/* PROBLEM DESCRIPTION - Detaljert forklaring av problemet */}
      <div className="form-group">
        <label>Beskrivelse *</label>
        <textarea
          name="beskrivelse"
          value={formData.beskrivelse}
          onChange={handleChange}
          placeholder="Beskriv problemet ditt i detalj..."
          rows="4"
          required
        />
      </div>

      {/* SUBMIT BUTTON - Trigger sending av skjema */}
      <button type="submit" className="submit-btn">
        Send inn forespørsel
      </button>
    </form>
  );
}

export default RequestForm;