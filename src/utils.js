/*---------- ID HEADER ---------------------------------------------------------
/  Author(s):   Andrew Boisvert
/  Email(s):    abois526@mtroyal.ca 
/  File Name:   utils.js
/  Description:
/    Reusable helper functions.
/-----------------------------------------------------------------------------*/

/*--------------------------------------
/ SECTION: Functions 
/-------------------------------------*/
/**
 * @description helper function to create a JSON message
 * @param {String} msg the JSON message
 * @returns an object containing a JSON message
 */
const jsonMessage = (msg) => {
  return { message: msg };
};

/*--------------------------------------
/ SECTION: Module Exports
/-------------------------------------*/
module.exports = { 
  jsonMessage 
};