const Message = require('../models/Message');
const jwt = require("jsonwebtoken");

exports.createThing = (req, res, next) => {
    //delete req.body._id;
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userIdDecode = decodedToken.userId;
    const mess = new Message ({
        ...req.body,
        userId:userIdDecode
    }) ;
    mess.save()
        .then(() => res.status(201).json ({ message : 'message enregistré'}))
        .catch(error => res.status(400).json({mess}));
};

exports.modifyThing = (req,res,next) =>{
    Message.updateOne ( {_id:req.params.id}, {...req.body} )
        .then( ()=> res.status(200).json({message : "Message modifié"}))
        .catch(error => res.status(400).json({error}));
};

exports.deleteThing = (req, res, next) => {
    Message.findOne({ _id: req.params.id }).then(
        (message) => {
            if (!message) {
                res.status(404).json({
                    error: new Error('No such Message!')
                });
            }
            if (message.userId !== req.auth.userId) {
                res.status(400).json({
                    error: new Error('Unauthorized request!')
                });
            }
            Message.deleteOne({ _id: req.params.id }).then(
                () => {
                    res.status(200).json({
                        message: 'Deleted!'
                    });
                }
            ).catch(
                (error) => {
                    res.status(400).json({
                        error: error
                    });
                }
            );
        }
    ).catch( (error) => { res.status(401).json({error: error })});
};

exports.getOneThing = (req, res,next) =>{
    Message.findOne({ _id: req.params.id })
        .then(message => res.status(200).json(message))
        .catch(error => res.status(400).json({error}));
};

exports.getAllThings = (req, res, next) => {
    Message.find()
        .then(message=>res.status(200).json(message))
        .catch(error => res.status(400).json({error}));
};