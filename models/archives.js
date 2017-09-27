//Dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create a Schema
var archivesSchema = new Schema({
    title: String,
    url: String, 
    description: { type: String, lowercase: true}, 
    metadata: { type: [String], lowercase: true},
});



//export the schema for use elsewhere
var Archive = mongoose.model('Archive', archivesSchema);
module.exports = Archive;