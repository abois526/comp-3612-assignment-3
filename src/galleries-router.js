/**
 * @file Handles all available routes for the galleries data.
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
 * @description returns JSON for all galleries
 * @param {Object} provider the object for the data providers module
 * @param {Object} app the object for the express application
*/
function handleAll(provider, app) {
  app.get("/api/galleries/", (req, resp) => {
    const galleries = provider.getGalleriesData();
    resp.json(galleries);
  });
}

/**
 * @description returns JSON for all galleries from the specified country (case-insensitive)
 * @param {Object} provider the object for the data providers module
 * @param {Object} app the object for the express application
 */
function handleByCountry(provider, app) {
  app.get("/api/galleries/:country", (req, resp) => {
    const galleries = provider.getGalleriesData();
    let country = req.params.country.toLowerCase();
    const matches = galleries.filter((obj) => {
      if (country !== obj.GalleryCountry.toLowerCase()) return false;
      return true;
    });
    if (matches.length > 0) {
      resp.json(matches);
    } else {
      resp.status(404).json(jsonMessage(
        `No gallery matches found for the country ${country}`));
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