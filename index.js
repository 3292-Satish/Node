let express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    swaggerUi=  require('swagger-ui-express')
    cors = require('cors');
var app =express();
var port = process.env.PORT || 3000;
const swaggerDocument = require('./routes/swagger.json');


app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));

const mongoURI = 'mongodb://localhost:27017/loginreg'

mongoose.connect(mongoURI, {useNewUrlParser : true})
        .then(()=> console.log("Database Connected!"))
        .catch(err => console.log(err));

    var Users = require('./routes/Users');

    app.use('/users', Users);

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


    app.listen(port, ()=>{
        console.log("Server is running on Port " + port);
    })
