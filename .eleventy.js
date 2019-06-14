module.exports = function(eleventyConfig) {
    // Copy the `files/` directory 
    eleventyConfig.addPassthroughCopy("src/site/files");
    
    // Copy the `css/` directory
    eleventyConfig.addPassthroughCopy("src/site/css");
    // Copy the 'js/' directory
    eleventyConfig.addPassthroughCopy("src/site/js");

    // add layout aliases
    eleventyConfig.addLayoutAlias('default', 'layouts/base.liquid');
    
    return {

      dir: {
        input: "src/site"
      },

      passthroughFileCopy: true
    };
  };