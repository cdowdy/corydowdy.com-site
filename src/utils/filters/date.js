const { DateTime } = require('luxon');

// Defaults to day of week, month, month day, year
// ex: Wednesday, August 6, 2019
//
// can change this by passing in as option.
//
// ex: {{ date | humanDate('NEW FORMAT') }}
//
module.exports = ( dateObj, defaultFormat = 'DDDD' ) => {

    return DateTime.fromJSDate( dateObj, {
        zone: "utc"
  }).toFormat( defaultFormat );

};