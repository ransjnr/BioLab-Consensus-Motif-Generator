import React, { useState } from "react";
import "./styles.css";
import settingsIcon from "./component/settings-icon.svg"
import accountIcon from "./component/account-icon.svg"


function App() {
  const [motifs, setMotifs] = useState("");
  const [results, setResults] = useState(null);

  const analyzeMotifs = async () => {
    try {
      const motifArrayRaw = motifs
        .replace(/[^A-Za-z0-9,]+/g, "")
        .split(",")
        .map((item) => item.trim());
      const response = await fetch("http://localhost:5000/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ motifs: motifArrayRaw }),
      });

      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const resetResults = () => {
    setResults(null);
    setMotifs("");
  };

  return (
    <div>
      <nav class="navbar">
        <div class="container">
          <a class="navbar-brand" href="#">
            <h1 class="text-logo custom-logo" >faradBioLab</h1>
          </a>
          <ul class="nav nav-masthead justify-content-center float-md-end">
        <a class="nav-link fw-bold py-1 px-0 active" aria-current="page" href="#">Home</a>
        <a class="nav-link fw-bold py-1 px-0" href="#">Explore</a>
          </ul>
        </div>
      </nav>
      <div className="container mt-5">
        <div className="row">
          {/* Left Column for Motifs Operations */}
          <div className="col">
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
            <div className="form-group d-flex justify-content-between">
              <button
                type="button"
                className="btn btn-primary mt-3"
                onClick={analyzeMotifs}
              >
                Analyze
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary mt-3"
                onClick={resetResults}
              >
                Reset
              </button>
            </div>
            {results && (
              <div className="results mt-4">
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
        </div>
      </div>
    </div>
  );
}

export default App;
