import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";

function PredictTherapiesModal({ show, onHide, sessionResults }) {
  const [predictedTherapies, setPredictedTherapies] = useState([]);
  
  useEffect(() => {
    // Make an API call to fetch predicted therapies based on Phase I results (sessionResults)
    // Replace 'API_URL' with the actual API endpoint
    fetch("API_URL")
      .then((response) => response.json())
      .then((data) => setPredictedTherapies(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [sessionResults]);

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Predicted Therapies</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Predicted Therapies:</h4>
        <ul>
          {predictedTherapies.map((therapy, index) => (
            <li key={index}>{therapy}</li>
          ))}
        </ul>
      </Modal.Body>
    </Modal>
  );
}

export default PredictTherapiesModal;
