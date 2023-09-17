import React, { useState } from "react";
import "./styles.css";

function App() {
  const [motifs, setMotifs] = useState("");
  const [results, setResults] = useState(null);

  const analyzeMotifs = async () => {
    try {
      const motifsArray = motifs
        .split("\n")
        .filter((motif) => motif.trim() !== "");
      const response = await fetch("http://localhost:5000/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ motifs: motifsArray }),
      });

      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Motifs Analysis</h1>
      <div className="form-group">
        <label htmlFor="motifs">Enter Motifs (one per line):</label>
        <textarea
          id="motifs"
          className="form-control"
          rows="6"
          value={motifs}
          onChange={(e) => setMotifs(e.target.value)}
        ></textarea>
      </div>
      <button type="button" className="btn btn-primary" onClick={analyzeMotifs}>
        Analyze
      </button>

      {results && (
        <div className="mt-4">
          <h2>Results:</h2>
          <div className="card">
            <div className="card-body">
              <p>
                <strong>Count:</strong>
              </p>
              <pre>{JSON.stringify(results.count, null, 2)}</pre>
            </div>
          </div>
          <div className="card mt-3">
            <div className="card-body">
              <p>
                <strong>Profile:</strong>
              </p>
              <pre>{JSON.stringify(results.profile, null, 2)}</pre>
            </div>
          </div>
          <div className="card mt-3">
            <div className="card-body">
              <p>
                <strong>Consensus:</strong> {results.consensus}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
