const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.static("public"));

let teams = {
  red: 0,
  blue: 0,
  green: 0
};

// TikTok webhook
app.post("/webhook", (req, res) => {
  const giftValue = req.body?.gift?.value || 1;

  const randomTeam = ["red", "blue", "green"][
    Math.floor(Math.random() * 3)
  ];

  teams[randomTeam] += giftValue * 10;

  res.sendStatus(200);
});

// Takım skorlarını gönder
app.get("/teams", (req, res) => {
  res.json(teams);
});

// Ana sayfa
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// 🔥 Railway için doğru port ayarı
const PORT = process.env.PORT;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port " + PORT);
});
