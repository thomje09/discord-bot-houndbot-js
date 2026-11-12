//server.js
//(11/12/2026)

const express = require("express")
const server = express()

server.all("/", (req, res) => {
  res.send("Bot is walking!")})

function keepAlive() { //Port 3000 for Render
  server.listen(process.env.PORT || 3000, () => {
    console.log("Server is ready.")
  })
}

module.exports = keepAlive
