const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

// Create or open the SQLite database
const db = new sqlite3.Database("motifs.db", (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("Connected to the motifs database.");
  }
});

// Create a table to store results (count, profile, consensus)
db.run(`
  CREATE TABLE IF NOT EXISTS results (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    count TEXT,
    profile TEXT,
    consensus TEXT
  )
`);

// Define routes
function Count(Motifs) {
    const count = {};
    const k = Motifs[0].length;
  
    for (const symbol of 'ACGT') {
      count[symbol] = new Array(k).fill(0);
    }
  
    const t = Motifs.length;
  
    for (let i = 0; i < t; i++) {
      for (let j = 0; j < k; j++) {
        const symbol = Motifs[i][j];
        count[symbol][j] += 1;
      }
    }
  
    return count;
  }
  
  function Consensus(Motifs) {
    const k = Motifs[0].length;
    const count = Count(Motifs);
  
    let consensus = '';
  
    for (let j = 0; j < k; j++) {
      let m = 0;
      let frequentSymbol = '';
  
      for (const symbol of 'ACGT') {
        if (count[symbol][j] > m) {
          m = count[symbol][j];
          frequentSymbol = symbol;
        }
      }
  
      consensus += frequentSymbol;
    }
  
    return consensus;
  }
  
  function Profile(Motifs) {
    const t = Motifs.length;
    const k = Motifs[0].length;
    const profile = {};
    const profile1 = Count(Motifs);
  
    for (const key of 'ACGT') {
      profile[key] = profile1[key].map(x => x / t);
    }
  
    return profile;
  }
// Analyze motifs and store results in the database
app.post("/api/analyze", (req, res) => {
  const motifs = req.body.motifs;
  const count = JSON.stringify(Count(motifs));
  const profile = JSON.stringify(Profile(motifs));
  const consensus = Consensus(motifs);

  // Insert the results into the database
  db.run(
    "INSERT INTO results (count, profile, consensus) VALUES (?, ?, ?)",
    [count, profile, consensus],
    function (err) {
      if (err) {
        console.error(err.message);
        res.status(500).json({ error: "An error occurred while storing results." });
      } else {
        res.json({ count, profile, consensus });
      }
    }
  );
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


