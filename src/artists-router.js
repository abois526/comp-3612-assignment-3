/**
 * @file Handles all available routes for the artists data.
 * @author Andrew Boisvert <abois526@mtroyal.ca>
 */

/*--------------------------------------
/ SECTION: Module Imports
/-------------------------------------*/
const { jsonMessage } = require("./utils.js");

/*--------------------------------------
/ SECTION: Functions
/-------------------------------------*/
/**
 * @description returns JSON for all artists
 * @param {Object} provider the object for the data providers module
 * @param {Object} app the object for the express application
*/
function handleAll(provider, app) {
  app.get("/api/artists/", (req, resp) => {
    const artists = provider.getArtistsData();
    resp.json(artists);
  });
}

/**
 * @description returns JSON for all artists from the specified country (case-insensitive)
 * @param {Object} provider the object for the data providers module
 * @param {Object} app the object for the express application
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
      resp.status(404).json(jsonMessage(
        `No artist matches found for the country ${country}`));
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