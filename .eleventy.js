module.exports = function(eleventyConfig) {
    // Copy the `files/` directory
    eleventyConfig.addPassthroughCopy("src/site/files");

    // Copy the `css/` directory
    eleventyConfig.addPassthroughCopy("src/site/css");
    // Copy the 'js/' directory
    eleventyConfig.addPassthroughCopy("src/site/js");

    // add layout aliases
    eleventyConfig.addLayoutAlias('default', 'layouts/base.njk');
    // add layout alias for a blog post/entry
    eleventyConfig.addLayoutAlias( 'blogentry', 'layouts/blogentry.njk');

    // add and use luxon for our dates.
    // copied and slightly modified from 11ty blog boilerplate
    // and eleventyone template https://github.com/philhawksworth/eleventyone

    eleventyConfig.addFilter('humanDate', require( "./src/utils/filters/humandate.js" ) );
    eleventyConfig.addFilter('dateCompare', require('./src/utils/filters/datecompare.js' ) );
    eleventyConfig.addShortcode( 'l2s', require("./src/utils/shortcodes/link2section.js") );

    // add a collection using  a glob from all markdown files found in the categories directory
    eleventyConfig.addCollection("categoryList", function (collection) {
      return collection.getFilteredByGlob("./src/site/categories/*.md");
    });

    return {

      dir: {
        input: "src/site"
      },

      htmlTemplateEngine: "njk",
      passthroughFileCopy: true
    };
  };
