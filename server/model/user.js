const mongoose = require('mongoose');
const {Schema,model} = mongoose;

const UserSchema = new Schema({
    name : {
        type : String,
        require : true
    },
    age : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true
    },
    phone : {
        type : String,
        require : true
    },
    date:{
        type : Date,
        default : Date.now
    }
});
const Users = model("Users",UserSchema);
module.exports = Users;
