/*
 * Post Commit Autotag
 *
 * Main app.js
 */


 /*
  * Configuration
  */
    
    var express = require('express'),
        app = express.createServer();
        
    app.use(express.bodyParser());
    
    app.listen(80);
    console.log('node running');

 /*
  * URL Routing
  */
  
    app.get('/', function(req, res){
      // basic url hit
      res.send('<title>Post Commit Autotag</title>hello world');
    });
    
    app.post('/post-commit-autotag',function(req, res){
        
        // store the post data as an json object
        app.data = JSON.parse(req.body.payload);
        
        // checks if any issues were closed with these commits
        if(app.checkIssueClosed()){
            app.reOpenIssues();
            app.applyLables();
        }
        // = JSON.parse(req.body.payload);
        //console.log(post);        
    });
    
 /*
  * Utility Functions
  */
    
    app.checkIssueClosed = function(){
        // check all commits
        for(i in app.data.commits){
            
            // grab any issues that were closed by the comment comment
            console.log('returned match: '+app.data.commits[i].message.match(/(Fixes|Closes) #(\d+)/i));
            
            //if(app.data.commits[i].search(''))
        }
        /*for ( var i=0, len = app.data.commits.length; i<len; ++i ){
            if(app.data.commits)
        }*/
        
        return false;
    }

// end of app.js
