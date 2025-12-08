/**
 * @file Handles all available routes for the paintings data.
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
 * @description returns JSON for all paintings
 * @param {Object} provider the object for the data providers module
 * @param {Object} app the object for the express application
*/
function handleAll(provider, app) {
  app.get("/api/paintings", (req, resp) => {
    const paintings = provider.getPaintingsData();
    resp.json(paintings);
  });
}

/**
 * @description returns JSON for all paintings with a specified painting ID
 * @param {Object} provider the object for the data providers module
 * @param {Object} app the object for the express application
 */
function handleById(provider, app) {
  app.get("/api/painting/:id", (req, resp) => {
    const paintings = provider.getPaintingsData();
    let id = parseInt(req.params.id);
    const matches = paintings.filter((obj) => {
      if (id !== parseInt(obj.paintingID)) return false;
      return true;
    });
    if (matches.length > 0) {
      resp.json(matches);
    } else {
      resp.status(404).json(jsonMessage(
        `No painting matches found for painting ID ${id}`));
    }
  });
}

/**
 * @description returns JSON for all paintings with a specified gallery ID
 * @param {Object} provider the object for the data providers module
 * @param {Object} app the object for the express application
 */
function handleByGalleryId(provider, app) {
  app.get("/api/painting/gallery/:galleryId", (req, resp) => {
    const paintings = provider.getPaintingsData();
    let galleryId = parseInt(req.params.galleryId);
    const matches = paintings.filter((obj) => {
      if (galleryId !== parseInt(obj.gallery.galleryID)) return false;
      return true;
    });
    if (matches.length > 0) {
      resp.json(matches);
    } else {
      resp.status(404).json(jsonMessage(
        `No painting matches found for gallery ID ${galleryId}`));
    }
  });
}

/**
 * @description returns JSON for all paintings with a specified artist ID
 * @param {Object} provider the object for the data providers module
 * @param {Object} app the object for the express application
 */
function handleByArtistId(provider, app) {
  app.get("/api/painting/artist/:artistId", (req, resp) => {
    const paintings = provider.getPaintingsData();
    let artistId = parseInt(req.params.artistId);
    const matches = paintings.filter((obj) => {
      if (artistId !== parseInt(obj.artist.artistID)) return false;
      return true;
    });
    if (matches.length > 0) {
      resp.json(matches);
    } else {
      resp.status(404).json(jsonMessage(
        `No painting matches found for artist ID ${artistId}`));
    }
  });
}

/**
 * @description returns JSON for all paintings whose yearOfWork field is between the supplied values
 * @param {Object} provider the object for the data providers module
 * @param {Object} app the object for the express application
 */
function handleByYearOfWork(provider, app) {
  app.get("/api/painting/year/:min/:max", (req, resp) => {
    const paintings = provider.getPaintingsData();
    const min = parseInt(req.params.min);
    const max = parseInt(req.params.max);
    const matches = paintings.filter((obj) => 
      parseInt(obj.yearOfWork) >= min && parseInt(obj.yearOfWork) <= max);
    if (matches.length > 0) {
      resp.json(matches);
    } else {
      resp.status(404).json(jsonMessage(
        `No painting matches found that were produced between the years ${min} - ${max}`));
    }
  });
}

/**
 * @description returns JSON for all paintings whose title contains the provided text (case-insensitive)
 * @param {Object} provider the object for the data providers module
 * @param {Object} app the object for the express application
 */
function handleByTitleContains(provider, app) {
  app.get("/api/painting/title/:substring", (req, resp) => {
    const paintings = provider.getPaintingsData();
    let substring = req.params.substring.toLowerCase();
    const matches = paintings.filter((obj) =>
      obj.title.toLowerCase().includes(substring));
    if (matches.length > 0) {
      resp.json(matches);
    } else {
      resp.status(404).json(jsonMessage(
        `No painting matches found whose title contains ${substring}`));
    }
  });
}

/**
 * @description returns JSON for all paintings that have a color that matches the name of the provided hex value (case-insensitive)
 * @param {Object} provider the object for the data providers module
 * @param {Object} app the object for the express application
 */
function handleByColor(provider, app) {
  app.get("/api/painting/color/:name", (req, resp) => {
    const paintings = provider.getPaintingsData();
    let color = req.params.name.toLowerCase();
    const matches = paintings.filter((obj) =>
      obj.details.annotation.dominantColors.some((e) => e.name.toLowerCase() === color));
    if (matches.length > 0) {
      resp.json(matches);
    } else {
      resp.status(404).json(jsonMessage(
        `No painting matches found for color ${color}`));
    }
  });
}

/*--------------------------------------
/ SECTION: Module Exports
/-------------------------------------*/
module.exports = {
  handleAll, 
  handleById, 
  handleByGalleryId, 
  handleByArtistId,
  handleByYearOfWork, 
  handleByTitleContains, 
  handleByColor
};