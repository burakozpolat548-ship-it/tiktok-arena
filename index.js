const express = require("express")
const app = express()

app.use(express.json())
app.use(express.static("public"))

const TEAMS = ["red","blue","green"]

let gameState = {}

function resetGame(){
  gameState = {
    red:{health:300,soldiers:[],alive:true},
    blue:{health:300,soldiers:[],alive:true},
    green:{health:300,soldiers:[],alive:true}
  }
}

resetGame()

app.post("/webhook",(req,res)=>{
  const giftValue = req.body?.gift?.value || 1
  const team = TEAMS[Math.floor(Math.random()*3)]

  for(let i=0;i<giftValue*3;i++){
    gameState[team].soldiers.push({
      id: Date.now()+Math.random(),
      x: team==="red"?10:90,
      y: team==="red"?50: team==="blue"?30:70,
      hp:1
    })
  }

  res.sendStatus(200)
})

app.get("/state",(req,res)=>{
  res.json(gameState)
})

app.listen(process.env.PORT || 3000,"0.0.0.0")
