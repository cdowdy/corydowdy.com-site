// convert my bolt cms plugin of linking a heading to a section of a page to an eleventy universal short code.
//
// Useage for liquid:

// <section id="my-id">

//  <h2 class="heading">
//    {% l2s "Your Heading" "my-id" "your-css-class" %}
// </h2>

// </section>

// will give you 

// <section id="my-id">

//  <h2 class="heading">
//    <a class="l2s" href="#my-id">Your Heading</a>
//  </h2>

// </section>
module.exports = function(linkText, id, cssClass ) {
  return `<a class='${ cssClass }' href='#${id}'>${ linkText }</a>`;
};