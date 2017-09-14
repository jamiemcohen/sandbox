//Dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;



//create a Schema
var mapsSchema = new Schema({
    title: String,
    path:  { type: String, unique:true, lowercase: true, required: true } ,
    email: String, 
    password: String,
    markers: [{
        latitude: Number,
        longitude: Number,
        title: String, 
        description: String, 
        media:  [String],
        createdAt: {type: Date, default: Date.now},
        order:{type: Number, required: true, default: 0},
    }],
    myarchive: [{
        title: String,
        description: String, 
        metadata:[String],
        link: String,
    }],
    
});

//add current date before saving
mapsSchema.pre('save', function(next){
    var currentDate = new Date();
    
    // if created_at doesn't exist, add to that field
    if (!this.createdAt){
        this.createdAt = currentDate;
    }
    next();
});



//export the schema for use elsewhere
var Map = mongoose.model('Map', mapsSchema);
module.exports = Map;