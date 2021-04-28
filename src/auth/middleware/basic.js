'use strict';

// const bcrypt = require('bcrypt');
const base64 = require('base-64');
const User = require('src/auth/models/users.js'); 


module.exports = async (req, res, next) => {

  if (!req.headers.authorization) { return _authError(); } // was _authError 
  // I think the if statement needs to go after the two let's 
  
  let basic = req.headers.authorization.split(' ').pop();
  let [user, pass] = base64.decode(basic).split(':'); 
  // changed from user and pass
  
  try {
    req.user = await User.authenticateBasic(user, pass)
    next();
  } catch (error) {
    res.status(403).send('Invalid Login');
  }

}