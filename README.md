# Artwork Data API
> REST-like API that serves artwork data in JSON format

<!-- Table of Contents -->
<!-- Optional, depends on size -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#description">Description</a></li>
    <li>
        <a href="#usage">Usage</a>
        <ul>
            <li><a href="#api-routes">API Routes</a></li>
            <li><a href="#example-requests">Example Requests</a></li>
        </ul>
    </li>
  </ol>
</details>


## Description
This is a REST-like API that serves JSON data for different artists, galleries, and paintings. Multiple routes are provided that allow users to retrieve all of the available resources for a given category, or to filter them by various attributes. Basic use of HTTP response status codes is handled. Requests for valid routes result in a 200 OK status code. Requests for invalid routes result in a 404 Not Found status code with an error message. Requests for valid routes that are filtered by a provided attribute which result in no found resources result in a 404 Not Found status code and a detailed error message in JSON format is returned to the user.

The project is hosted on Render and routes must be appended to the base URL to access the data. It is hosted using the hobby plan which sleeps after 15 minutes of inactivity, so the first request will likely take a moment while the web service starts up again. 

**Link to base URL:** https://abois526-comp3612-asg3.onrender.com

**Built With:** Node.js, Express.js

## Usage
### API Routes
| Route | Description |
|-|-|
| /api/paintings | Returns JSON for all paintings |
| /api/painting/`id` | Returns JSON for the single painting whose id matches the provided id. |
| /api/painting/gallery/`id` | Returns JSON for the paintings whose gallery id matches the provided gallery id. |
| /api/painting/artist/`id` | Returns JSON for the paintings whose artist id matches the provided artist id. |
| /api/painting/year/`min`/`max` | Returns all paintings whose yearOfWork field is between the two supplied values. |
| /api/painting/title/`text` | Returns JSON for the paintings whose title contains (somewhere) the provided text (case-insensitive). |
| /api/painting/color/`name` | Returns JSON for the paintings that have a color that matches the provided hex value. Each painting has a dominantColors array with the six most common colors in the painting; each of these color values comes with a property named name that contains the name for that color (case-insensitive). |
| /api/artists | Returns JSON for all artists |
| /api/artists/`country` | Returns JSON for all artists from the specified country (case-insensitive). |
| /api/galleries | Returns JSON for all galleries |
| /api/galleries/`country` | Returns JSON for all galleries from the specified country (case-insensitive). |

### Example Requests
| Links |
|-|
| [/api/paintings](https://abois526-comp3612-asg3.onrender.com/api/paintings) |
| [/api/painting/433](https://abois526-comp3612-asg3.onrender.com/api/painting/433) |
| [/api/painting/43374534856](https://abois526-comp3612-asg3.onrender.com/api/painting/43374534856) |
| [/api/painting/gallery/7](https://abois526-comp3612-asg3.onrender.com/api/painting/gallery/7) |
| [/api/painting/gallery/43374534856](https://abois526-comp3612-asg3.onrender.com/api/painting/gallery/43374534856) |
| [/api/painting/artist/106](https://abois526-comp3612-asg3.onrender.com/api/painting/artist/106) |
| [/api/painting/artist/43374534856](https://abois526-comp3612-asg3.onrender.com/api/painting/artist/43374534856) |
| [/api/painting/year/1850/1900](https://abois526-comp3612-asg3.onrender.com/api/painting/year/1850/1900) |
| [/api/painting/year/2200/2400](https://abois526-comp3612-asg3.onrender.com/api/painting/year/2200/2400) |
| [/api/painting/title/self](https://abois526-comp3612-asg3.onrender.com/api/painting/title/self) |
| [/api/painting/title/dfjkghdfkgh](https://abois526-comp3612-asg3.onrender.com/api/painting/title/dfjkghdfkgh) |
| [/api/painting/color/NAPA](https://abois526-comp3612-asg3.onrender.com/api/painting/color/NAPA) |
| [/api/painting/color/coffee%20bean](https://abois526-comp3612-asg3.onrender.com/api/painting/color/coffee%20bean) |
| [/api/painting/color/kcvhvxchbkcj](https://abois526-comp3612-asg3.onrender.com/api/painting/color/kcvhvxchbkcj) |
| [/api/artists](https://abois526-comp3612-asg3.onrender.com/api/artists) |
| [/api/artists/FRANCE](https://abois526-comp3612-asg3.onrender.com/api/artists/FRANCE) |
| [/api/artists/france](https://abois526-comp3612-asg3.onrender.com/api/artists/france) |
| [/api/artists/sdfjjsdf](https://abois526-comp3612-asg3.onrender.com/api/artists/sdfjjsdf) |
| [/api/galleries](https://abois526-comp3612-asg3.onrender.com/api/galleries) |
| [/api/galleries/france](https://abois526-comp3612-asg3.onrender.com/api/galleries/france) |
| [/api/galleries/kcvhvxchbkcj](https://abois526-comp3612-asg3.onrender.com/api/galleries/kcvhvxchbkcj) |