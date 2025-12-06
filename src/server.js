/*---------- ID HEADER ---------------------------------------------------------
/  Author(s):   Andrew Boisvert
/  Email(s):    abois526@mtroyal.ca 
/  File Name:   server.js
/  Description:
/    A REST-like API that serves JSON data for different artists, galleries, 
/    and paintings. Multiple routes are provided that allow users to retrieve 
/    all of the available resources for a given category, or to filter them by
/    various attributes. Basic use of HTTP response status codes is handled. 
/    Requests for valid routes result in a 200 OK status code. Requests for 
/    invalid routes result in a 404 Not Found status code with an error message. 
/    Requests for valid routes that are filtered by a provided attribute which 
/    result in no found resources result in a 404 Not Found status code and a 
/    detailed error message in JSON format is returned to the user.
/
/  Modules Overview:
/    artists-router.js - handles all routes for artists data
/    data-providers.js - used to retrieve the JSON data
/    galleries-router.js - handles all routes for galleries data
/    paintings-router.js - handles all routes for paintings data
/-----------------------------------------------------------------------------*/

/*--------------------------------------
/ SECTION: Module Imports
/-------------------------------------*/
require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();
const provider = require("./data-providers.js");
const artists = require("./artists-router.js");
const galleries = require("./galleries-router.js");
const paintings = require("./paintings-router.js")


/*--------------------------------------
/ SECTION: Main Code
/-------------------------------------*/
// handle requests for static resources
app.use("/static", express.static(path.join(__dirname, "public")));
// artists
artists.handleAll(provider, app);
artists.handleByCountry(provider, app);
// galleries
galleries.handleAll(provider, app);
galleries.handleByCountry(provider, app);
// paintings
paintings.handleAll(provider, app);
paintings.handleById(provider, app);
paintings.handleByGalleryId(provider, app);
paintings.handleByArtistId(provider, app);
paintings.handleByYearOfWork(provider, app);
paintings.handleByTitleContains(provider, app);
paintings.handleByColor(provider, app);

// display 404 error for any invalid requests
app.use((req, resp) => {
  resp.status(404).send("404 Not Found: Unable to find the requested resource.");
});

// uses express to listen to the port
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server running at port=${port}`);
});