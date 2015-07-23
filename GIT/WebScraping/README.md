# Web Scraping IndieGogo via NODE.JS


I have several examples of client-side web site scraping to obtain info, where no REST APIs are apparent.

Several different JS packages exist to perform this:
    - Combo of Request and Cheerio
    - Osmosis
    
Note, be reasonable in your use of this so as not to burden the Indiegogo servers nor violate the Terms of Service.


## Using Request/Cheerio

This worked out OK.  Run the tool from the commandline and provide the project name (extract it from the URL in your browser).  

Prep As follows:

    npm install request cheerio

Run as follows:

    nodejs indiegogo-cheerio.js  "new-home-for-hypoallergenic-assistance-dog-program"

The data that results will look like the following:

*$5,446USD raised in 8 days from 60 people.  This is 12% of the $45,000 goal.  There are 37 days left.*



## Using Osmosis

There were complaints about node legacy mode when installing Osmosis.  Some reading on the internet said that 'node' was renamed to 'nodejs' to avoid conflicts with another product.  However, this seems to break some of these install scripts.

    sudo ln -s /usr/bin/nodejs /usr/bin/node

    sudo npm install -g gyp
    sudo npm install -g node-gyp

    npm install libxmljs
    npm install osmosis
    
Ultimately I was *not* successful to read IndieGogo URL with Osmosis, so that work is paused.
    
To run:

    kjg@polyphemus:~/Explorations/GIT/WebScraping$ nodejs indiegogo.js 
