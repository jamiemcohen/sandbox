// Dependencies
var mongoose  = require('mongoose');
var Archive = require('../models/archives');

//App Routes
module.exports = function(){

    return {
        //get route to retrieve all archival material
        getAll: function(req,res){
        //query the db and send all archival material if there are no errors
            var query = Archive.find({});
            query.exec(function(err, archives){
                    if(err) {
                        res.send(err);
                    }
                //If no errors, send them back to the client
                res.json(archives);     
            });
                                           
        },
        //post route and save marker in db               
        post: function(req,res){
            console.log("post");
            //creates new marker
            var newArchive = new Archive(req.body);
            //save to db
            newArchive.save(function(err){
                if(err) res.send(err);
                //If no errors, send it back to the client
                res.json(req.body);
            });
             
        },
        
        getOne: function(req, res){
            Archive.findById(req.params.id, function(err, archive){
                if(err) res.send(err);
                //If no errors, send it back to the client
                res.json(archive);
            });     
        },
        
        
        deleteOne: function(req, res, next){
            Archive.remove({
                _id : req.params.id
            }, function(err, archive) {
                if (err)res.send(err);
                
                res.json(archive);

              /* Archive.find(function(err, archive) {
                    if (err)
                        res.send(err)
                    res.json(archive);
                });*/
            });

        
        },
        
         editArchive: function(req, res){

            // use our map model to find the map we want
            Archive.findById(req.params.id, function(err, archive) {

                if (err) res.send(err);

                archive.title = req.body.title;  // update the archive info
                archive.description = req.body.description;  // update the archive info
                archive.metadata = req.body.metadata;  // update the archive info

                // save the archive
                archive.save(function(err) {
                    if (err) res.send(err);

                    res.json(archive.myarchive);
                });

            });
            
        }
    }
        
};