// Dependencies
var mongoose  = require('mongoose');
var Map = require('../models/maps');

//App Routes
module.exports = function(){

    return {
        //get route to retrieve all maps
        getAll: function(req,res){
        //query the db and send all map if there are no errors
            var query = Map.find({});
            query.exec(function(err, maps){
                    if(err) {
                        res.send(err);
                    }
                //If no errors, send them back to the client
                res.json(maps);     
            });
                                           
        },
        //post route and save map in db               
        post: function(req,res){
            console.log("post");
            //creates new map
            var newMap = new Map(req.body);
            //save to db
                
            newMap.save(function(err){
                if(err) res.send(err);
                //If no errors, send it back to the client
                res.json(req.body);
            });
             
        },
        
        getOne: function(req, res){
            Map.findById(req.params.id, function(err, map){
                if(err) return res.send(err);
                //If no errors, send it back to the client
                res.json(map);
            });     
        },
        
        getOneTitle: function(req, res){
            Map.findOne({title: req.params.title}, function(err, map){
                if(err) res.send(err);
                //If no errors, send it back to the client
                res.json(map);
            });     
        },
        
         getOnePath: function(req, res){
            Map.findOne({path: req.params.path}, function(err, map){
                if(err) return res.send(err);
                //If no errors, send it back to the client
                res.json(map);
            });     
        },
        
         updateMap: function(req, res){

            // use our map model to find the map we want
            Map.findById(req.params.id, function(err, map) {

                if (err) res.send(err);

                map.myarchive = req.body.myarchive;  // update the archive info
                map.markers = req.body.markers;
                // save the archive
                map.save(function(err) {
                    if (err) res.send(err);

                    res.json(map);
                });

            });
            
        },
        
        
         deleteOne: function(req, res, next){
            Map.remove({
                _id : req.params.id
            }, function(err, map) {
                if (err)res.send(err);
                
                res.json(map);

              
            });

        
        }
        
        

    }
};