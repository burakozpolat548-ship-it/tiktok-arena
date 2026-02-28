const express = require("express")
const app = express()

app.use(express.json())
app.use(express.static("public"))

let gameState = {
  red: { score: 0, health: 100 },
  blue: { score: 0, health: 100 },
  green: { score: 0, health: 100 }
}

app.post("/webhook", (req, res) => {
  const giftValue = req.body?.gift?.value || 1
  const team = ["red", "blue", "green"][Math.floor(Math.random() * 3)]

  gameState[team].score += giftValue * 10
  gameState[team].health -= giftValue * 2

  if (gameState[team].health < 0) {
    gameState[team].health = 0
  }

  res.sendStatus(200)
})

app.get("/state", (req, res) => {
  res.json(gameState)
})

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html")
})

const PORT = process.env.PORT || 3000
app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port " + PORT)
})
