const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const Message = require("../models/Message");


exports.signup = (req,res,next) => {

//  test si l'email existe dans la db
///////////////////////////////////////////

  bcrypt.hash(req.body.password, 10)
      .then(hash => {
          const user = new User ({
              email: req.body.email,
              pseudo: req.body.pseudo,
              firstname: req.body.firstname,
              lastname: req.body.lastname,
              urlProfilePicture: req.body.urlProfilePicture,
              gender: req.body.gender,
              password: hash,

          });
          user.save()
              .then(() => res.status(201).json({message:'utilisateur crée'}))
              .catch(error =>res.status(400).json({error}));
      })
      .catch(error =>res.status(500).json({error}));
};

exports.login = (req,res,next) => {
  User.findOne({email: req.body.email})
      .then(user=> {
          if (!user) {
              return res.status(401).json({error : 'utilisateur non trouvé'});
          }
          bcrypt.compare(req.body.password, user.password)
              .then(valid => {
                  if (!valid) {
                      return res.status(401).json({error : 'mot de passe incorrect'});
                  }
                  res.status(200).json({
                      error : 'noerror',
                      userId: user._id,
                      token: jwt.sign(
                          { userId: user._id},
                          'RANDOM_TOKEN_SECRET',
                          {expiresIn: '24h'},
                      )
                  });
              })
              .catch(error => res.status(500).json({error}));
      })
      .catch(error => res.status(500).json({error}));
};

exports.getInfo = (req,res,next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userIdDecode = decodedToken.userId;
    User.findOne({ _id: userIdDecode })
        .then(infoUser => res.status(200).json(infoUser))
        .catch(error => res.status(400).json({error}));
};

exports.updateInfo = (req,res,next) => {

};