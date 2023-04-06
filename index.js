const express = require("express");

const app = express();

const countries = ["India", "Nepal", "Germany", "Finland"];

const getRandomCountry = (arr) => arr[Math.floor(Math.random() * arr.length)];

const generateRandomMatrix = () => {
  const mat = [];
  for (let i = 0; i < 3; i++) {
    const temp = [];
    for (let j = 0; j < 3; j++) {
      temp.push(getRandomCountry(countries));
    }
    mat.push(temp);
  }
  return mat;
};

const getRank = (arr) => {
  const rank = {};

  const getRankForEachRow = (arr) => {
    const firstCountry = arr[0];
    let rankCount = 1;
    for (let i = 1; i < arr.length; i++) {
      const element = arr[i];
      if (element !== firstCountry) {
        break;
      }
      rankCount += 1;
    }
    if (rankCount === 1) {
      return;
    } else {
      if (firstCountry in rank) {
        if (rank[firstCountry] < rankCount) {
          rank[firstCountry] = rankCount;
        }
      } else {
        rank[firstCountry] = rankCount;
      }
    }
  };

  arr.forEach(getRankForEachRow);
  return rank;
};

app.get("/api/get-countries-tags", function(req, res) {
  const randomMatrix = generateRandomMatrix(countries);
  const rank = getRank(randomMatrix);
  res.send({ outcome: randomMatrix, rank });
});

app.listen(3000, () => {
  console.log(`server listening on port 3000`);
});
