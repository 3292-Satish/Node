const Mongoose = require("mongoose");
const schema = Mongoose.Schema;

const userSchema = new schema({
    first_name: {
        type : String
    },
    last_name: {
        type: String
    },
    email:{
        type: String
    },
    password:{
        type: String
    },
    img:{
        type: String
    },
    Date:{
        type: Date,
        default: Date.now
    }
})
Users = Mongoose.model("users", userSchema);
module.exports = Users
