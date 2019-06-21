const { DateTime } = require('luxon');


module.exports = ( dateObj, compareTo = 6 ) => {

    const today = DateTime.local().toISO();
 
    // convert the date from the post to iso
    let postDate = DateTime.fromJSDate(dateObj).toISO();

    return DateTime.fromISO( postDate ) < DateTime.fromISO(today).minus( { months: compareTo } );

};