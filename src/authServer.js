'use strict'

//Enviroment Variables
require('dotenv').config()

const express = require ('express');
const app = express();
const jwt = reqruie ('json'())

let refreshTokens = []

app.post('/token', (req, res) => { //post & create on the /token 
  const refreshToken = req.body.token // the refreshToken is equal to req.body.token
  if(refreshTokens == null ) return res.sendStatus(401) // if the value is equal, but compared we return res.sendStatus(401)
  if(!refreshTokens.includes(refreshTokens)) return res.sendStatus(403);
  jwt.verify(refreshTokens, process.env.REFRESH_TOKEN_SECRET, (error, user) => {
    if(error) return res.sendStatus(403)
    const accessToken = generateAccessToken({ name: user.name })
    res.json({ accessToken: accessToken})
  })
})

app.delete('/logout', (req, res) => {
  refreshTokens = refreshTokens.filter(token => token !== req.body.token)
  res.sendStatus(204)
})
app.post('/login', (req, res) => {
  const username = req.body.username
  const user = { name: username }
  const accessToken = generateAccessToken(user)
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
  refreshTokens.push(refreshToken)
  res.json({ accessToken: accessToken, refreshToken: refreshToken })
})
function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET. { expiresIn: '15s'})
}

