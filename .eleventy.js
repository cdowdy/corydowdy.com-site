module.exports = function(eleventyConfig) {
    // Copy the `files/` directory 
    eleventyConfig.addPassthroughCopy("src/site/files");
    
    // Copy the `css/` directory
    eleventyConfig.addPassthroughCopy("src/site/css");
    // Copy the 'js/' directory
    eleventyConfig.addPassthroughCopy("src/site/js");

    // add layout aliases
    eleventyConfig.addLayoutAlias('default', 'layouts/base.liquid');

    // add and use luxon for our dates.
    // copied and slightly modified from 11ty blog boilerplate 
    // and eleventyone template https://github.com/philhawksworth/eleventyone

    eleventyConfig.addFilter('humanDate', require( "./src/utils/filters/date.js" ) );

    
    return {

      dir: {
        input: "src/site"
      },

      passthroughFileCopy: true
    };
  };