/**
 * GitHub Utilities
 *
 * This is a collection of utility functions for working with GitHub callbacks and API calls.
 *
 * Author: Charles Himmer <charleshimmer@gmail.com>
 */
 
  
/**
 * Loops through all the commit messages and returns any issues 
 * that were closed by those commits messages.
 *
 * @param {Array}   array of github commits
 * @return {Array}  array of issues that were closed (i.e ['1','42','2']).
 */
 exports.getClosedIssues = function(commits){
 
    // array to store closed issues
    var issues = [];

    // loop through all commits
    for(i in commits){

        // clear out the messageText array
        var matches = [];
        
        // grab any issues that were closed by the commit message text
        matches = commits[i].message.match(/(Fixes|Closes) #\d+/gi);
        
        // loop through all matches and get the number of the issue
        for(i=0;i<matches.length;i++){
            var split = matches[i].split('#');
            issues.push(split[1]);
        }
    }

    return issues;
 };// end of getClosedIssues
