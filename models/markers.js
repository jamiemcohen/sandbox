var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create a Schema
var markersSchema = new Schema({
    text: {
        type: String,
        default: ''
    }
    /*id: Number,
    latitude: Number,
    longitude: Number,
    title: String,
    description: String,
    created_at: Date,
    media_id: Number
    */
});

//add current date 
markersSchema.pre('save', function(next){
    var currentDate = new Date();
    
    // if created_at doesn't exist, add to that field
    if (!this.created_at){
        this.created_at = currentDate;
    }
    next();
});


var Marker = mongoose.model('Marker', markersSchema);
module.exports = Marker;
    