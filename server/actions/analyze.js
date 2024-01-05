function Count(Motifs) {
  const count = {};
  const k = Motifs[0].length;

  for (const symbol of "ACGT") {
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

  let consensus = "";

  for (let j = 0; j < k; j++) {
    let m = 0;
    let frequentSymbol = "";

    for (const symbol of "ACGT") {
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

  for (const key of "ACGT") {
    profile[key] = profile1[key].map((x) => x / t);
  }

  return profile;
}

module.exports = { Count, Consensus, Profile };
