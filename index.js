let express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    cors = require('cors');
var app =express();
var port = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));

const mongoURI = 'mongodb://localhost:27017/loginreg'

mongoose.connect(mongoURI, {useNewUrlParser : true})
        .then(()=> console.log("Database Connected!"))
        .catch(err => console.log(err));

    var Users = require('./routes/Users');

    app.use('/users', Users);



    app.listen(port, ()=>{
        console.log("Server is running on Port " + port);
    })
