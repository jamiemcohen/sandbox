// Dependencies
var mongoose  = require('mongoose');
var Marker = require('../models/markers');

//App Routes
module.exports = function(){

    return {
        //get route to retrieve all markers
        getAll: function(req,res){
        //query the db and send all markers if there are no errors
            var query = Marker.find({});
            query.exec(function(err, markers){
                    if(err) {
                        res.send(err);
                    }
                //If no errors, send them back to the client
                res.json(markers);     
            });
                                           
        },
        //post route and save marker in db               
        post: function(req,res){
            console.log("post");
            //creates new marker
            var newMarker = new Marker(req.body);
            //save to db
                
            newMarker.save(function(err){
                if(err) res.send(err);
                //If no errors, send it back to the client
                res.json(req.body);
            });
             
        },
        
        getOne: function(req, res){
            Marker.findById(req.params.id, function(err, marker){
                if(err) res.send(err);
                //If no errors, send it back to the client
                res.json(marker);
            });     
        }
        

    }
};