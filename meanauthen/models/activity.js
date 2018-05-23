var mongoose = require('mongoose');

var activitySchema = mongoose.Schema({
        user_id: {type:String},
        create_on: {type:String},
        plaintext:{type:String}
});

module.exports = mongoose.model('activity',activitySchema);

module.exports.addactivity = function(newActivity,callback){
    newActivity.save(callback);
}