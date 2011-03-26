/**
 * Post Commit Autotag
 *
 * This project is meant to be a Post Recieve Callback URL
 * for automatically re-opening github issues that were closed
 * via the comment message (i.e. "Fixes #142 where there was a typo")
 *
 * Author: Charles Himmer <charleshimmer@gmail.com>
 */


/**
 * Load Dependecy Modules
 */
    
    var Express         = require('express'),
        GitHubUtilies   = require('./github/utilities');
        GitHubIssuesApi = require("./github/api/Issues");
            

/**
 * App Configruation
 */     
 
    // setup express server
    var App = Express.createServer();
    
    // allow for post body parsing
    App.use(Express.bodyParser());
    
    // Initial GitHubIssuesAPI settings
    GitHubIssuesApi.initialize({
        apiKey:'7c5b642b611df260ba81b961382ce716',
        user:'charleshimmer',
        repo:'post-commit-autotag'
    });
    
    // setup port for server to listen on    
    App.listen(80);

/**
 * URL Routing
 */
    
    /**
     * Define post request at /post-commit-autotag
     */
    App.post('/post-commit-autotag',function(req, res){
        
        // get post data
        var post = JSON.parse(req.body.payload);
        
        // get which issues where closed
        var issues = GitHubUtilies.getClosedIssues(post.commits);
        
        // reopen those issues
        GitHubIssuesApi.reopen(issues);

        // apply labels
        GitHubIssuesApi.applyLabels(issues, 'Testable');
        
    });// end of post('/post-commit-autotag');
    
    
    /**
     * Run testing suite via the browser.
     *
     */
    App.get('/test', function(req, res){
        
        // setup fake issue ids
        var issues = ['5'];
        
        // test my API calls
        GitHubIssuesApi.reopen(issues);
        GitHubIssuesApi.applyLabels(issues, 'Testable');
        
        // return to the browser with something
        res.end('<title>Post Commit Autotag</title>Testing suite has been ran.');
      
      
    });// end of get('/test');
    
    /**
     * Define basic get request to server, more for checking that
     * the server is up.
     */
    App.get('/', function(req, res){
        
        // basic url hit
        res.end('<title>Post Commit Autotag</title>Server is waiting for requests...');
      
    });// end of get('/');
    
// end of app.js 
