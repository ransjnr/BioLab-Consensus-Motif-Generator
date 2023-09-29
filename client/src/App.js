import React, { useState } from "react";
import "./styles.css";
import settingsIcon from "./component/settings-icon.svg";
import accountIcon from "./component/account-icon.svg";
import sideImage from "./component/image1.jpg";
import Footer from "./scene/footer";
import SignIn from "./scene/signIn";
import 'bootstrap/dist/css/bootstrap.css'
import { MDBFile } from 'mdb-react-ui-kit';

function App() {
  const [motifs, setMotifs] = useState("");
  const [results, setResults] = useState(null);
  const [currentPhase, setCurrentPhase] = useState("phase1"); // Default to Phase I

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

  let phaseContent;

  if (currentPhase === "phase1") {
    phaseContent = (
      <div>
        <div className="form-group mt-5">
          <label htmlFor="motifs">
            Enter Motifs (separate strings with comma):
          </label>
          <textarea
            id="motifs"
            className="form-control"
            rows="6"
            value={motifs}
            onChange={(e) => setMotifs(e.target.value)}
          ></textarea>
          <div>
      <MDBFile label='Upload file as .txt' id='customFile' />
    </div>
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
    );
  } else if (currentPhase === "phase2") {
    phaseContent = (
      <div className="mt-5">
        {/* Phase II content goes here */}
        <p>This is Phase II content.</p>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <nav className="navbar bg-primary">
        <div className="container">
          <a className="navbar-brand" href="#">
            <h1 className="text-logo d-flex justify-content-center">M-Lab</h1>
          </a>
        </div>
        <div className="m-4">
        <SignIn />
        </div>
      </nav>
      <div className="container mt-5" style={{ flex: 1}}>
        <div className="row">
          <div className="col">
            <div
              className="btn-group d-flex justify-content-center"
              role="group"
              aria-label="Phase Tabs"
            >
              <button
                type="button"
                className={`btn btn-outline-primary ${
                  currentPhase === "phase1" ? "active" : ""
                }`}
                onClick={() => setCurrentPhase("phase1")}
              >
                Phase I
              </button>
              <button
                type="button"
                className={`btn btn-outline-secondary ${
                  currentPhase === "phase2" ? "active" : ""
                }`}
                onClick={() => setCurrentPhase("phase2")}
              >
                Phase II
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          {/* Left Column for Motifs Operations */}
          <div className="col">{phaseContent}</div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
