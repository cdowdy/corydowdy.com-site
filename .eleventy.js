module.exports = function(eleventyConfig) {
    // Copy the `files/` directory 
    eleventyConfig.addPassthroughCopy("src/site/files");
    
    // Copy the `css/fonts/` directory
    // If you use a subdirectory, it’ll copy using the same directory structure.
    eleventyConfig.addPassthroughCopy("src/site/css");
    
    return {

      dir: {
        input: "src/site"
      },

      passthroughFileCopy: true
    };
  };