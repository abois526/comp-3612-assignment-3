/*---------- ID HEADER ---------------------------------------------------------
/  Author(s):   Andrew Boisvert
/  Email(s):    abois526@mtroyal.ca 
/  File Name:   artists-router.js
/  Description:
/    Handles all available routes for the artists data.
/-----------------------------------------------------------------------------*/

/*--------------------------------------
/ SECTION: Module Imports
/-------------------------------------*/
const { jsonMessage } = require("./utils.js");

/*--------------------------------------
/ SECTION: Functions
/-------------------------------------*/
/**
 * @description returns JSON for all artists
 * @param {Module} provider module object for "./data-providers.js"
 * @param {Express} app the express application
*/
function handleAll(provider, app) {
  app.get("/api/artists/", (req, resp) => {
    const artists = provider.getArtistsData();
    resp.json(artists);
  });
}

/**
 * @description returns JSON for all artists from the specified country (case-insensitive)
 * @param {Module} provider module object for "./data-providers.js"
 * @param {Express} app the express application
 */
function handleByCountry(provider, app) {
  app.get("/api/artists/:country", (req, resp) => {
    const artists = provider.getArtistsData();
    let country = req.params.country.toLowerCase();
    const matches = artists.filter((obj) => {
      if (country !== obj.Nationality.toLowerCase()) return false;
      return true;
    });
    if (matches.length > 0) {
      resp.json(matches);
    } else {
      resp.status(404);
      resp.json(jsonMessage(`No artist matches found for the country ${country}`));
    }
  });
}

/*--------------------------------------
/ SECTION: Module Exports
/-------------------------------------*/
module.exports = { 
  handleAll, 
  handleByCountry 
};