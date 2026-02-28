const express = require("express")
const app = express()

app.use(express.json())
app.use(express.static("public"))

let teams = {
  red: 0,
  blue: 0,
  green: 0
}

app.post("/webhook", (req, res) => {
  const giftValue = req.body?.gift?.value || 1
  const randomTeam = ["red", "blue", "green"][Math.floor(Math.random() * 3)]
  teams[randomTeam] += giftValue * 10
  res.sendStatus(200)
})

app.get("/teams", (req, res) => {
  res.json(teams)
})
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html")
})
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
