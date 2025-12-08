/**
 * @file Sets up the Express API for the artists, galleries, and paintings data.
 * @author Andrew Boisvert <abois526@mtroyal.ca>
 */

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