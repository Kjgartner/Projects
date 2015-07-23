// This will gather some info from IndieGogo page for a project
// We believe there are several pages --
//
// 
// https://www.indiegogo.com/projects/new-home-for-hypoallergenic-assistance-dog-program



var osmosis = require('osmosis');

var IndieGogoProjectName = "new-home-for-hypoallergenic-assistance-dog-program";

var rootHTML = 'https://www.indiegogo.com/projects/' + IndieGogoProjectName  + '#/story';

rootHTML = "https://www.indiegogo.com/projects/new-home-for-hypoallergenic-assistance-dog-program#/story";

rootHTML =  "http://www.indiegogo.com/projects";

rootHTML = "www.google.com";

console.log(rootHTML);

// Needle is used underneath, so try to catch any error

var content = osmosis.get(rootHTML, function(error, response) {
    if (error) { console.log("Error detected - " + error); }
});
console.log(content);

osmosis
    .get(rootHTML)
    .find('h4')
    .log()
    .find('span.i-raised-funders')
    .set('funderSum')
    .find('.i-balance + span.currency + span')
    .set('raisedSoFar')
    .data(function (listing) {
        console.log(listing);
    });
