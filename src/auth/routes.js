
'use strict';

const express = require('express');
const authRouter = express.Router();
// const jwt = require('jsonwebtoken');

const User = require('src/auth/models/users.js');
const basicAuth = require('.src/auth/middleware/basic.js')
const bearerAuth = require('src/auth/middleware/bearer.js')

authRouter.post('/signup', async (req, res, next) => {
  try {
    let user = new User(req.body);
    const userRecord = await user.save();
    const output = {
      user: userRecord,
      token: userRecord.token
    };
    res.status(201).json(output);
  } catch (error) {
    next(error.message)
  }
});

authRouter.post('/signin', basicAuth, (req, res, next) => {
  const user = {
    user: request.user,
    token: request.user.token
  };
  res.status(200).json(user);
});

authRouter.get('/users', bearerAuth, async (req, res, next) => {
  const users = await User.find({});
  const list = users.map(user => user.username);
  res.status(201).json(list);
});

authRouter.get('/secret', bearerAuth, async (req, res, next) => {
  res.status(200).send("Welcome to the secret area!")
});


module.exports = authRouter;