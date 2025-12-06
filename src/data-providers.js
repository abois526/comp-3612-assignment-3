/*---------- ID HEADER ---------------------------------------------------------
/  Author(s):   Andrew Boisvert
/  Email(s):    abois526@mtroyal.ca 
/  File Name:   data-providers.js
/  Description:
/    Reads in the JSON data files to be used for creating the API routes.
/-----------------------------------------------------------------------------*/

/*--------------------------------------
/ SECTION: Module Imports
/-------------------------------------*/
const fs = require("fs").promises;
const path = require("path");

/*--------------------------------------
/ SECTION: Functions
/-------------------------------------*/
const artistsPath = path.join(__dirname, "..", "data", "./artists.json");
const galleriesPath = path.join(__dirname, "..", "data", "./galleries.json");
const paintingsPath = path.join(__dirname, "..", "data", "./paintings-nested.json");
let artists, galleries, paintings;

/**
 * @description generalized the function to get the data to try to avoid code duplication, but needed to use async...await to make sure the export functions would actually contain the data from the promise, so made an IIFE for it
 */
(async () => {
  artists = await getData(artistsPath);
  galleries = await getData(galleriesPath);
  paintings = await getData(paintingsPath);
})();

/**
 * @description gets the data from a specified JSON file using async...await and assigns it to the provided array
 * @param {String} jsonPath path of the JSON data
 * @returns {Promise} a promise with the parsed JSON data
*/
async function getData(jsonPath) {
  try {
    const data = await fs.readFile(jsonPath, "utf-8");
    return JSON.parse(data);
  }
  catch (err) {
    console.log(`Error reading ${jsonPath}`);
  }
}

/**
 * @description gets the data for the artists
 * @returns array of artists JSON objects
 */
function getArtistsData() {
  return artists;
}

/**
 * @description gets the data for the galleries
 * @returns array of galleries JSON objects
 */
function getGalleriesData() {
  return galleries;
}

/**
 * @description gets the data for the paintings
 * @returns array of paintings JSON objects
 */
function getPaintingsData() {
  return paintings;
}

/*--------------------------------------
/ SECTION: Module Exports
/-------------------------------------*/
module.exports = { 
  getArtistsData, 
  getGalleriesData, 
  getPaintingsData
};