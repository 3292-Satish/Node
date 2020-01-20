let express = require("express"),
    users = express.Router(),
    cors = require("cors"),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcrypt');

const User = require('../model/User');
users.use(cors());

process.env.SECRET_KEY = 'secret';

users.post('/register', (req,res)=>{
    const today = new Date();
    const userData={
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        created : today
    }

    User.findOne({
        email: req.body.email
    })
    .then(user=>{   
        if(!user){
            bcrypt.hash(req.body.password, 10, (err, hash)=>{
                userData.password = hash
                User.create(userData)
                .then(user =>{
                    res.json({status: user.email + "Registered"})
                    console.log("1111", user);
                })
                .catch(err =>{
                    res.send('Error : '+ err);
                })
            })
        }
        else{
            res.json({Error: " User already Exist !"})
        }
    })
    .catch(err =>{
            res.send('Error: '+ err)
    })
})

module.exports = users;