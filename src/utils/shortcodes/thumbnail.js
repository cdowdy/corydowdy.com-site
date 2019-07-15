
const sharp = require("sharp");
const fs = require('fs');

/* return a thumbnail string.
structure the shortcode to accept an image file  with an optional format (webp, jpg, png etc)
and an optional resize param (default from sharp is cover)
resize can take an object that allows for different ways to "fit" the image:
 * cover
 * contain
 * fill
 * inside
 * outside


{% thumb img="image.jpg'  format='jpg' resize="cover" %}
*/
module.exports = function ( image ) {
  console.log(image);

};
