console.log('Starting Function!');
//'use strict';
//First load AWS Dependancies
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({region: 'us-west-2'});

exports.handler = function(e, ctx, callback) {
   
   //var table = e.table;
   //table = table.replace(/"/g, "'");
   var table = 'PersonalChef';
   
   //if(e.action == "write"){
       var myDate = Date.now();
        var params = {
            Item: {
                timestamp: e.body.timestamp ,
                id: e.body.id
            },
            
            TableName: table
        };
        docClient.put(params, function(err, data){
            
            if(err){
                callback(err,null);
            }else{
                callback(null,"hello");
            }
        });
    
   }else if(e.action == "scan") {
     
     
       //Read item from table
       var scanningParameters = {
           TableName: table,
           Limit: 100
       };
       docClient.scan(scanningParameters, function(err,data){
           if(err){
               callback(err,null);
           }else{
               callback(null,data);
           }
       });
       
     
   }else if(e.action == "query"){
       
       //Query an item: Less expensive than scan
       var params = {
           TableName: table,
           Key: {
               "date": parseInt(e.date)
           }
       }
       docClient.get(params,function(err, data){
           if(err){
               callback(err, null);
               console.error("Unable to query item. Error JSON:", JSON.stringify(err, null, 2));
           }else{
               callback(null, data);
               console.log("QueryItem succeeded:", JSON.stringify(data, null, 2));
           }
       });
       
       
   }else if(e.action == "delete"){
        //Delete item from table
        var params = {
            TableName:table,
            Key:{
                "date": parseInt(e.date)
            }
        }
        
        docClient.delete(params, function(err, data) {
            if (err) {
                console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
            }
        });
        
   }else {
      callback(err,null); 
   }
   
};