var mongoose = require('mongoose');

var profileSchema = mongoose.Schema({
    email: {
        type: String
    },
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    nickname: {
        type: String
    },
    gender: {
        type: String
    },
    birthdate:{
        type: String
    },
    friend: [{
        type: String
    }],
    address: {
        type: String
    },
    imageprofile: {
        type: String
    },
    imagecover: {
        type: String
    },
    photo:[{
        type: String
    }], 
    aboutme:{
        type: String
    },
    join:{
        type: String
    },
    status:{
        type: String
    },
    tel:{
        type:String
    },
    work:{
        type:String
    }
});

module.exports = mongoose.model('profile', profileSchema);

module.exports.addProfile = function (newprofile, callback) {
    newprofile.save(callback);
}