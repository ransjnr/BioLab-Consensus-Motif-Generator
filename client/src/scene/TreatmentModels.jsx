import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";

function TreatmentModelsModal({ show, onHide, sessionResults }) {
  const [treatmentModels, setTreatmentModels] = useState("");
  
  useEffect(() => {
    // Make an API call to fetch treatment models based on Phase I results (sessionResults)
    // Replace 'API_URL' with the actual API endpoint
    fetch("API_URL")
      .then((response) => response.json())
      .then((data) => setTreatmentModels(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [sessionResults]);

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Treatment Models</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Treatment Models:</h4>
        <p>{treatmentModels}</p>
      </Modal.Body>
    </Modal>
  );
}

export default TreatmentModelsModal;
