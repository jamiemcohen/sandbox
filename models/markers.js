//Dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create a Schema
var markersSchema = new Schema({
    latitude: Number,
    longitude: Number,
    title: String, 
    description: String, 
    media:  [String],
    createdAt: {type: Date, default: Date.now},
    
});

//add current date before saving
markersSchema.pre('save', function(next){
    var currentDate = new Date();
    
    // if created_at doesn't exist, add to that field
    if (!this.createdAt){
        this.createdAt = currentDate;
    }
    next();
});


//export the schema for use elsewhere
var Marker = mongoose.model('Marker', markersSchema);
module.exports = Marker;
    