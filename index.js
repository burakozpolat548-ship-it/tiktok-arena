const express = require("express")
const app = express()

app.use(express.json())
app.use(express.static("public"))

let spawnQueue = []

app.post("/webhook",(req,res)=>{
  const giftValue = req.body?.gift?.value || 1
  const team = ["red","blue","green"][Math.floor(Math.random()*3)]

  spawnQueue.push({
    team,
    amount: giftValue * 3
  })

  res.sendStatus(200)
})

app.get("/spawn",(req,res)=>{
  const data = [...spawnQueue]
  spawnQueue = []
  res.json(data)
})

app.listen(process.env.PORT || 3000,"0.0.0.0")
