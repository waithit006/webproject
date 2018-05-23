var mongoose = require('mongoose');

var postSchema = mongoose.Schema({
        id_userpost: {type:String},
        name: {type:String},
        create_on: {type:String},
        plaintext:{type:String},
        like_by: [{type:String}],
        comment: [{id_usercomment:String,plaintext_comment:String}],
        shared_by: [{type:String}],
        email: {type:String},
        imageprofile:{type:String},
        image:[{type:String}]

});

module.exports = mongoose.model('post',postSchema);

module.exports.addPost = function(newPost,callback){
    newPost.save(callback);
}