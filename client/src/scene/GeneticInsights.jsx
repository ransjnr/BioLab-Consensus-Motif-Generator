import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";

function GeneticInsightsModal({ show, onHide, sessionResults }) {
  const [geneticInsights, setGeneticInsights] = useState("");
  
  useEffect(() => {
    // Make an API call to fetch genetic insights based on Phase I results (sessionResults)
    // Replace 'API_URL' with the actual API endpoint
    fetch("API_URL")
      .then((response) => response.json())
      .then((data) => setGeneticInsights(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [sessionResults]);

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Genetic Insights</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Genetic Insights:</h4>
        <p>{geneticInsights}</p>
      </Modal.Body>
    </Modal>
  );
}

export default GeneticInsightsModal;
