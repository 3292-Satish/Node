let express = require("express"),
    users = express.Router(),
    cors = require("cors"),
    jwt = require('jsonwebtoken'),
    multer = require('multer'),
    bcrypt = require('bcrypt'),
    emailValidator = require("email-validator"),
    path= require('path'),
    uuid = require('uuid');


const User = require('../model/User');
users.use(cors());

process.env.SECRET_KEY = 'secret';


//- - - - - - - - - -Register for User -- - - - - - - - --  -- -  -- - - - -//

var storage = multer.diskStorage({
    destination: function (request, file, callback) {
        callback(null, 'img');
    },
    filename: function (request, file, callback) {
        callback(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname));
    }
});

var upload = multer({
    storage: storage
})


users.post('/upload', upload.single("img"), (req, res) => {
    res.json(req.file);
})


users.post('/register', (req, res) => {



    const today = new Date();
    const userData = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        img: req.body.img,
        created: today

    }

    User.findOne({
            email: req.body.email
        })
        .then(user => {
            if (!user) {
                bcrypt.hash(req.body.password, 10, (err, hashed) => {
                    userData.password = hashed
                    let Email = emailValidator.validate(req.body.email);
                    if (Email == true) {
                        User.create(userData)
                            .then(user => {
                                res.json({
                                    status: user.email + " Registered"
                                })
                            })
                            .catch(err => {
                                res.send('Error : ' + err);
                            })
                    } else {
                        res.json({
                            status: "Invalid Email !"
                        })
                    }
                })
            } else {
                res.json({
                    Error: " User already Exist !"
                })
            }
        })
        .catch(err => {
            res.send('Error: ' + err)
        })
})

//- - - - - - - - - -Login for User- - - - - - - - - - - - - - - - - - - - - -//

users.post('/login', (req, res) => {
    User.findOne({
        email: req.body.email
    }).then(user => {
        if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                const payload = {
                    _id: user._id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email
                }
                let token = jwt.sign(payload, process.env.SECRET_KEY, {
                    expiresIn: 1000
                })
                res.json({
                    token: token
                });
            } else {
                res.json({
                    error: "User's Password not Matched !"
                })
            }
        } else {
            res.json({
                Error: "User' Data is not matched or exist !"
            });
        }
    }).catch(err => {
        res.send({
            "error": +err
        });
    })
})

//-- - - - - - - - - -Getting Profile info of User-- - - - -- - - - - - -- - - - -//

users.get('/profile', (req, res) => {
    var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY);

    User.findOne({
            _id: decoded._id
        }).then(user => {
            if (user) {
                res.json(user);
            } else {
                res.json("User Not Exist !");
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

module.exports = users;