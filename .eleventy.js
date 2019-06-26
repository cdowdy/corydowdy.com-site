module.exports = function(eleventyConfig) {
    // Copy the `files/` directory 
    eleventyConfig.addPassthroughCopy("src/site/files");
    
    // Copy the `css/` directory
    eleventyConfig.addPassthroughCopy("src/site/css");
    // Copy the 'js/' directory
    eleventyConfig.addPassthroughCopy("src/site/js");

    // add layout aliases
    eleventyConfig.addLayoutAlias('default', 'layouts/base.liquid');
    // add layout alias for a blog post/entry
    eleventyConfig.addLayoutAlias( 'blogentry', 'layouts/blogentry.liquid');

    // add and use luxon for our dates.
    // copied and slightly modified from 11ty blog boilerplate 
    // and eleventyone template https://github.com/philhawksworth/eleventyone

    eleventyConfig.addFilter('humanDate', require( "./src/utils/filters/humandate.js" ) );
    eleventyConfig.addFilter('dateCompare', require('./src/utils/filters/datecompare.js' ) );
    eleventyConfig.addShortcode( 'l2s', require("./src/utils/shortcodes/link2section.js") );

    // test out filtering blog posts and have a categories tag
    // so we can loop through all our blog posts on /blog and have categories on the aside section
    


    
    return {

      dir: {
        input: "src/site"
      },

      passthroughFileCopy: true
    };
  };