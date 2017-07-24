//Dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create a Schema
var markersSchema = new Schema({
    latitude:{type: Number, required: true},
    longitude: {type: Number, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    picture: {type: Schema.Types.Mixed, required: true},
    morePictures: Schema.Types.Mixed, // this is not required
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
    