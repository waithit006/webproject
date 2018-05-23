var mongoose = require('mongoose');

var dashboardSchema = mongoose.Schema({
        name: {type:String},
        create_on: {type:String},
        plaintext:{type:String}
});

module.exports = mongoose.model('dashboard',dashboardSchema);

module.exports.addPost = function(newPost,callback){
    newPost.save(callback);
}