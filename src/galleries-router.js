/*---------- ID HEADER ---------------------------------------------------------
/  Author(s):   Andrew Boisvert
/  Email(s):    abois526@mtroyal.ca 
/  File Name:   galleries-router.js
/  Description:
/    Handles all available routes for the galleries data.
/-----------------------------------------------------------------------------*/

/*--------------------------------------
/ SECTION: Module Imports
/-------------------------------------*/
const { jsonMessage } = require("./utils.js");

/*--------------------------------------
/ SECTION: Functions
/-------------------------------------*/
/**
 * @description returns JSON for all galleries
 * @param {Module} provider module object for "./data-providers.js"
 * @param {Express} app the express application
*/
function handleAll(provider, app) {
  app.get("/api/galleries/", (req, resp) => {
    const galleries = provider.getGalleriesData();
    resp.json(galleries);
  });
}

/**
 * @description returns JSON for all galleries from the specified country (case-insensitive)
 * @param {Module} provider module object for "./data-providers.js"
 * @param {Express} app the express application
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
      resp.status(404);
      resp.json(jsonMessage(`No gallery matches found for the country ${country}`));
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