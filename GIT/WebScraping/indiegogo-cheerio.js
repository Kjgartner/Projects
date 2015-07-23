// This will gather some info from IndieGogo page for a project
// We believe there are several page entrypoints, but here is the heavy one
// 
// https://www.indiegogo.com/projects/new-home-for-hypoallergenic-assistance-dog-program
//
// This program accepts the argument of the text name of a program, suitable for use
// in the URL.
//
// nodejs indiegogo-cheerio.js  "new-home-for-hypoallergenic-assistance-dog-program"
//
//
// Current as of July 2015
// Ken Gartner
//
// A good example to start with and helpful tips:
//
// https://www.digitalocean.com/community/tutorials/how-to-use-node-js-request-and-cheerio-to-set-up-simple-web-scraping
//
// http://stackoverflow.com/questions/20832910/get-text-in-parent-without-children-using-cheerio
//
// http://stackoverflow.com/questions/610406/javascript-equivalent-to-printf-string-format


var request = require('request');
var cheerio = require('cheerio');

// This is the default, if no command line argument is provided.
var defaultIndieGogoProjectName = "new-home-for-hypoallergenic-assistance-dog-program";

// Take an optional arg from the command line
var IndieGogoProjectName = defaultIndieGogoProjectName;
if (process.argv.length >= 3) 
   IndieGogoProjectName = process.argv[2]; // [0] - exec name, [1] script file name, [2] actual arg

var rootHTML = 'https://www.indiegogo.com/projects/' + IndieGogoProjectName  + '#/story';


request(rootHTML, function (error, response, html) {
  if (!error && response.statusCode === 200) {
      // Great -- the URL was successfully reached, so extract into object form 
      var pg = cheerio.load(html);
      
      // The text for founders:
      // <span class='i-raised-funders'>60 people</span>
      var numFunders = pg('span.i-raised-funders').text().trim();
      
      // The number of elapsed fundraising days
      // <span class='i-raised-in-time'>in 8 days</span>
      var daysSoFar = pg('span.i-raised-in-time').text().trim();
      
      // Percent funded  (first one -- others you might like follow)
      // <div class='i-percent'> 12%
      //    <span class='i-percent-funded'>funded</span>
      // </div>
      // THis is tricky because we only want the 'parent' text but not the text of 
      // the child span tag.
      var percentSoFar = pg('div.i-percent').first().contents().filter(function() 
                            { return this.type === 'text';}).text().trim();     
      
      // Total days left  (first one -- others you might like follow)
      //  <div class='i-time-left'>
      //    <em>38</em>&nbsp;days left
      //  </div>
      var daysLeft = pg('div.i-time-left').eq(0).text().trim();
      
      // Total amount raised
      //*[@id="i-contrib-box-rework"]/div[1]/div[1]/span/span
      // <div class="i-balance"> <span class="currency"><span>$1234.45
     var receivedSoFar = pg('div.i-balance span.currency').eq(0).text().trim();    
      
      // Goal Amount
      //  <span class='i-goal-amount'>
      //      <span class="currency"><span>$45,000</span></span>
      //  </span>
       var goalAmount = pg('span.i-goal-amount').text().trim();
      
      /* 
        At this point, I have strings like the following.
        
        60 people
        in 8 days
        12%
        38 days left
        $5,446USD
        $45,000

      */
      
      
      // Let's assemble similar to printf
      function ExpandPositionalTemplate() {
          var template = arguments[0];
          var actualArgs = arguments;

          for (i=1; i< arguments.length; i++) {
              template = template.replace("{" + (i-1) + "}", arguments[i]);
          }
          
          /*
          * I could not get this to work .. the actualArgs[] always was undefined
          template.replace(/{(\d+)}/g, function(match, number) {
              console.log("match - " + match + "; number - " + number);
              console.log(actualArgs[number+1]);
              return actualArgs[number+1];});
              
              */
          
          return template;
      };
      
      // This will produce some text like:
      // $5,446USD raised in 8 days from 60 people.  This is 12% of the $45,000 goal.  There are 38 days left.

      
      var quickSummary = ExpandPositionalTemplate(
            "{0} raised {1} from {2}.  This is {3} of the {4} goal.  There are {5}.",
            receivedSoFar, daysSoFar, numFunders, percentSoFar, goalAmount, daysLeft);
      
      console.log(quickSummary);
  } else {
      console.log ("Error! - " + response.statusCode);
      console.log (rootHTML);
  }
});