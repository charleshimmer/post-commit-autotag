/**
 * Post Commit Autotag
 *
 * This project is meant to be a Post Recieve Callback URL
 * for automatically re-opening github issues that were closed
 * via the comment message (i.e. "Fixes #142 where there was a typo")
 *
 * Author: Charles Himmer 
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
    var config = {
        apiKey:'e45866771748f7df1021ecc0236b83ec', // insert working api key, this is a dummy one
        user:'charleshimmer',
        repo:'post-commit-autotag'
    };
    
    GitHubIssuesApi.initialize(config);
    
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
        
        // security check to make sure we are only working with our repository
        if(post.repository.name != config.repo){
            return;
        }
        
        // get which issues where closed
        var issues = GitHubUtilies.getClosedIssues(post.commits);
        
        // apply labels
        GitHubIssuesApi.applyLabels(issues, 'Testable');
        
        // reopen those issues
        GitHubIssuesApi.reopen(issues);
        
    });// end of post('/post-commit-autotag');
    
    
    /**
     * Run testing suite for API calls
     *
     */
    App.get('/testAPI', function(req, res){
        
        // setup fake issue ids
        var issues = ['2','3','5'];
        
        // test my API calls
        GitHubIssuesApi.reopen(issues);
        GitHubIssuesApi.applyLabels(issues, 'Testable');
        
        // return to the browser with something
        res.end('<title>Post Commit Autotag</title>API call testing suite has been ran.');
      
      
    });// end of get('/testAPI');
    
    /**
     * Run testing suite for getting Closed Issues
     *
     */
    App.get('/testMessage', function(req, res){

        var assert = require('assert');
        
        // test data
        var commits = [{
            timestamp: '2011-03-26T01:17:16-07:00',
            distinct: true,
            url: 'https://github.com/charleshimmer/post-commit-autotag/commit/9049052c4c3f9f8c2ea548c78ecc5344aae24483',
            message: 'Closes #5 testing',
            id: '9049052c4c3f9f8c2ea548c78ecc5344aae24483'
        }];
        
        console.log(GitHubUtilies.getClosedIssues(commits));
        
        var commits = [{
            timestamp: '2011-03-26T01:17:16-07:00',
            distinct: true,
            url: 'https://github.com/charleshimmer/post-commit-autotag/commit/9049052c4c3f9f8c2ea548c78ecc5344aae24483',
            message: 'Updated README.md and to test multiple fixes, Fixes #4 Fixes #6',
            id: '9049052c4c3f9f8c2ea548c78ecc5344aae24483'
        },{
            timestamp: '2011-03-26T01:17:16-07:00',
            distinct: true,
            url: 'https://github.com/charleshimmer/post-commit-autotag/commit/9049052c4c3f9f8c2ea548c78ecc5344aae24483',
            message: '=Fixes #42, closes #2 this is some dummy test Closes #2',
            id: '9049052c4c3f9f8c2ea548c78ecc5344aae24483'
        }];
        
        console.log(GitHubUtilies.getClosedIssues(commits));
        
        var commits = [{
            timestamp: '2011-03-26T01:17:16-07:00',
            distinct: true,
            url: 'https://github.com/charleshimmer/post-commit-autotag/commit/9049052c4c3f9f8c2ea548c78ecc5344aae24483',
            message: 'Updated README.md and to test multiple fixes, Fixes #53 Fixes #15',
            id: '9049052c4c3f9f8c2ea548c78ecc5344aae24483'
        },{
            timestamp: '2011-03-26T01:17:16-07:00',
            distinct: true,
            url: 'https://github.com/charleshimmer/post-commit-autotag/commit/9049052c4c3f9f8c2ea548c78ecc5344aae24483',
            message: '=Fixes #2, closes #53 this is some dummy test Closes #23',
            id: '9049052c4c3f9f8c2ea548c78ecc5344aae24483'
        },{
            timestamp: '2011-03-26T01:17:16-07:00',
            distinct: true,
            url: 'https://github.com/charleshimmer/post-commit-autotag/commit/9049052c4c3f9f8c2ea548c78ecc5344aae24483',
            message: '=Fixes #7, closes #563 this is some dummy test Closes #273',
            id: '9049052c4c3f9f8c2ea548c78ecc5344aae24483'
        },{
            timestamp: '2011-03-26T01:17:16-07:00',
            distinct: true,
            url: 'https://github.com/charleshimmer/post-commit-autotag/commit/9049052c4c3f9f8c2ea548c78ecc5344aae24483',
            message: '=Fixes #23, closes #78 this is some dummy test Closes #84',
            id: '9049052c4c3f9f8c2ea548c78ecc5344aae24483'
        }];
        
        console.log(GitHubUtilies.getClosedIssues(commits));
       
        // return to the browser with something
        res.end('<title>Post Commit Autotag</title>Capture closed issue testing suite has been ran.');
      
      
    });// end of get('/testAPI');
    
    /**
     * Define basic get request to server, more for checking that
     * the server is up.
     */
    App.get('/', function(req, res){
        
        // basic url hit
        res.end('<title>Post Commit Autotag</title>Server is waiting for requests...');
      
    });// end of get('/');
    
// end of app.js 
