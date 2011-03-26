/**
 * GitHub Issue API
 *
 * This contains some API calls for working with GitHub's Issue API. This uses your GitHub
 * API key to authenticate.
 *
 * Author: Charles Himmer <charleshimmer@gmail.com>
 */
 
  var http = require('http');
 
 /**
 * Initialization of Issues API Module. 
 *
 * @param {Array}   Config Object, expecting apiKey, user, repo, and debug mode
 * @return {Boolean}  Returns boolean based off if API call was successful or not.
 */
 exports.initialize = function(config){
    this.config = config;
    
    // hard coded config
    this.config.host = 'github.com';
    this.config.apiPath = '/api/v2/json/issues';
 };
 
 
 /**
 * Loops through all closed issues and applies a label to them.
 *
 * @param {Array}   Array of github issues ids (ex ['1','42','2']).
 * @return {Boolean}  Returns boolean status of if the call was succesfully made or not.
 */
 exports.applyLabels = function(issues, label){
    
    // loop through all issues
    for(i in issues){
        this.request(this.buildPath('label/add', issues[i], label));
    }
 };
 
 
 /**
 * Loops through and opens all the issues passed to it.
 *
 * @param {Array}   Array of github issues ids (ex ['1','42','2']).
 * @return {Boolean}  Returns boolean based off if API call was successful or not.
 */
 exports.reopen = function(issues){
    
    // loop through all issues
    for(i in issues){
        console.log(this.buildPath('reopen', issues[i]));
        this.request(this.buildPath('reopen', issues[i]));
    }
 
 };
 
 
 /**
 * Wrapper Request object for making the actual API request.
 
 * @param {String}   String of the API method you want to call (i.e 'open', 'label/add')
 * @return {String}  Returns the concatenated string of the URL for this API call.
 */
 
 this.request = function(path){
    
    this.options = {
        host: 'github.com',
        port: 80,
        path: path,
        method: 'POST',
        headers:{
            "Content-Length": "0"
        }
    };
    
    console.log(this.options);
    
    // build encoded authoriation header (see http://develop.github.com/p/general.html for details)
    this.options.headers.Authorization = "Basic " + new Buffer(this.config.user + '/token:' + this.config.apiKey, "ascii").toString("base64");
    
    
    var req = http.request(this.options, function(res) {
    
        console.log('STATUS: ' + res.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res.headers));
        
        return (res.statusCode == 200) ? true:false;
    });

    req.end();
 };
 
 
 /**
 * Builds the URL for the api call based off the initialized config options
 
 * @param {String}   String of the API method you want to call (i.e 'open', 'label/add')
 * @return {String}  Returns the concatenated string of the URL for this API call.
 */
 this.buildPath = function(method, issueNumber, label){
    // base URL params
    var params = [this.config.apiPath, method, this.config.user, this.config.repo];
    
    // if we have a label to apply, tack it on right before the issue number
    if(label) params.push(label);
    
    // tack on issue number to end of every API call
    params.push(issueNumber);
    
    // return our path seperated by a slash
    return params.join('/');
 }
