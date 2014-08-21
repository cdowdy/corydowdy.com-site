module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      options: {
        includePaths: ['bower_components/foundation/scss']
      },
      dist: {
        options: {
          outputStyle: 'nested',
          sourceComments: 'normal'
        },
        files: {
          'css/app.css': 'scss/app.scss'
         // 'css/form.css' : 'scss/forms/form.scss'
         // 'css/newnav.app.css' : 'scss/new-nav.scss',
         // 'css/navigation.css' : 'scss/navigation.scss'
        }
      }
    },

    watch: {
      grunt: { files: ['Gruntfile.js'] },

      sass: {
        files: 'scss/**/*.scss',
        tasks: ['sass']
      }
    },

    browserSync: {
      dev: {
        bsFiles: {
          src : 'css/app.css'
        },
        options: {
          watchTask: true, // < VERY important
          proxy: "localhost",
          files: ["css/*.css", "*.html", "/js/**/*.js"]
        }
      }
    },

    // Auto Prefix CSS Files using the "last 2" version method
    autoprefixer: {
        options: {
            browsers: ['> 10%', 'last 2 versions', 'ie 8', 'ie 9', 'Android 2.3', 'Android 4']
          },
          your_target: {
              //  src: 'css/app.comb.css',
              //  dest: 'css/app.pre.css'
              src: 'css/combined/app.comb.css',
              dest: 'css/app.pre.css'
          }
      },

    // combine CSS files that were compiled with libsass
    cssmin: {
      combine: {
        files: {
          'css/combined/app.comb.css' : ['css/app.tidy.css', 'css/mfp/demos-mag/magnific.css','css/prism/prism-okaidia.css']
        }
      }
    },

    // Remove unused CSS
    uncss: {
      dist: {
        options: {
          ignore : [
            '.navdrawer-container.open',
            '.app-bar.open',
            'body.open',
            '.app-bar, .navdrawer-container, main',
            '.app-bar.open ~ main'
          ],

          report       : 'min'
        },
        files: {
          'css/app.tidy.css': [
                              'index.html',
                              'work.html',
                              'demos.html',
                              'demos-magnfic.html',
                              'demos-responsive.html',
                              'contact.html',
                              'blog-listing.html',
                              'blog-pagespeed.html',
                              'blog-uncss.html']
        }
      }
    },

    // grunt penthouse
     penthouse: {
      home:  {
          outfile : 'css/penthouse/home-critical.css',
          css : 'css/app.pre.css',
          url : 'http://localhost/New-Navigation/index.html',
          width: 1200,
          height: 900
        },
      four_o_four:  {
          outfile : 'css/penthouse/404-critical.css',
          css : 'css/app.pre.css',
          url : 'http://localhost/New-Navigation/404.html',
          width: 1200,
          height: 900
        },  
      work:  {
          outfile : 'css/penthouse/work-critical.css',
          css : 'css/app.pre.css',
          url : 'http://localhost/New-Navigation/work.html',
          width: 1200,
          height: 900
        },
      demos:  {
          outfile : 'css/penthouse/demo-critical.css',
          css : 'css/app.pre.css',
          url : 'http://localhost/New-Navigation/demos.html',
          width: 1200,
          height: 900
        },
      demos_mag:  {
          outfile : 'css/penthouse/demos_mag-critical.css',
          css : 'css/app.pre.css',
          url : 'http://localhost/New-Navigation/demos-magnfic.html',
          width: 1200,
          height: 900
        },
      demos_resp:  {
          outfile : 'css/penthouse/demos_resp-critical.css',
          css : 'css/app.pre.css',
          url : 'http://localhost/New-Navigation/demos-responsive.html',
          width: 1200,
          height: 900
        },
      blog:  {
          outfile : 'css/penthouse/blog-critical.css',
          css : 'css/app.pre.css',
          url : 'http://localhost/New-Navigation/blog-listing.html',
          width: 1200,
          height: 900
        },            
      blog_uncss : {
          outfile : 'css/penthouse/blog-uncss-critical.css',
          css : 'css/app.pre.css',
          url : 'http://localhost/New-Navigation/blog-uncss.html',
          width: 1200,
          height: 900
      },
       blog_pagespeed : {
          outfile : 'css/penthouse/blog-pagespeed-critical.css',
          css : 'css/app.pre.css',
          url : 'http://localhost/New-Navigation/blog-pagespeed.html',
          width: 1200,
          height: 900
      },
       contact:  {
          outfile : 'css/penthouse/contact-critical.css',
          css : 'css/app.pre.css',
          url : 'http://localhost/New-Navigation/contact.html',
          width: 1200,
          height: 900
        } 
    },

    // Clean up SVGs for SVGsprites
    svgmin: {
      options: {
        plugins: [
          { removeViewBox: false },
          { removeXMLProcInst: false }
        ]
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'svgsprites/svgs',
          src: ['**/*.svg'],
          dest: 'svgsprites/cleaned-svgs/',
          ext: '.svg'
        }]
      }
    },


  // Create SVG Sprite
    svgstore: {
      options: {
        prefix : 'icon-', // This will prefix each ID
        cleanup: true,
        svg: { // will be added as attributes to the resulting SVG
          viewBox : '0 0 15 15'
        }
      },
      default : {
        files: {
          'svgsprites/linkicons-sprite.svg' : ['svgsprites/cleaned-svgs/link-icons/*.svg']
        }
      }
    },

  // Concat all JS
    concat: {
      options: {
        stripBanners: {
          options: {
            block: false
          }
        },
        separator: ';'
      },
      dist: {
        src: ['bower_components/jquery/dist/jquery.min.js', 'js/lib/jquery.amd.magnific-popup.js', 'js/lib/off-canvas.js', 'js/app.js'],
        dest: 'js/dist/combined.<%= grunt.template.today("dd-mm-yyyy") %>.js'
      },
      main_js: {
        src: [
          'bower_components/jquery/dist/jquery.min.js',
          'js/lib/off-canvas.js',
          'js/app.js'
        ],
        dest: 'js/dist/main<%= grunt.template.today("dd-mm-yyyy") %>.js'
      },
      home_page: {
        src: [
          'js/lib/off-canvas.js',
          'js/lib/svg4everybody.min.js'
          ],
        dest: 'js/dist/homepage.js'  
      },
      demos_mag: {
        src: [
          'bower_components/jquery/dist/jquery.min.js',
          'js/lib/jquery.amd.magnific-popup.js',
          'js/lib/off-canvas.js',
          'js/lib/jquery-vimeothumb.js',
          'js/lib/demos/jq.mag.js'
        ],
        dest: 'js/dist/demos-mag.<%= grunt.template.today("dd-mm-yyyy") %>.js'
      },
      demos_resp: {
        src: [
          'bower_components/jquery/dist/jquery.min.js',
          'js/lib/off-canvas.js',
          'bower_components/foundation/js/foundation/foundation.js',
          'bower_components/foundation/js/foundation/foundation.interchange.js',
          'js/lib/demos/resp/picturefill.1.2.js',
          'js/lib/demos/resp/matchmedia.js',
          'js/lib/demos/resp/responsive.jq.js'
        ],
        dest: 'js/dist/demos-resp.<%= grunt.template.today("dd-mm-yyyy") %>.js'
      },
      blog_entries: {
        src: [
          'bower_components/jquery/dist/jquery.min.js',
          'js/lib/jquery.amd.magnific-popup.js',
          'js/lib/off-canvas.js',
          'js/app.js'
        ],
        dest: 'js/dist/blog-entries.<%= grunt.template.today("dd-mm-yyyy") %>.js'
      },
    },
  // uglify that shit
    uglify: {
      options: {
        preserveComments: false
      },
     main_js: {
      files: {
        'js/build/main<%= grunt.template.today("dd-mm-yyyy") %>.js' : ['js/dist/main<%= grunt.template.today("dd-mm-yyyy") %>.js']
      }
     },
     home_page: {
      files: {
        'js/build/homepage.js' : ['js/dist/homepage.js']
      }
     },
     demos_mag: {
      files: {
        'js/build/demos-mag.<%= grunt.template.today("dd-mm-yyyy") %>.js' : ['js/dist/demos-mag.<%= grunt.template.today("dd-mm-yyyy") %>.js']
      }
     },
     demos_resp: {
      files: {
        'js/build/demos-resp.<%= grunt.template.today("dd-mm-yyyy") %>.js' : ['js/dist/demos-resp.<%= grunt.template.today("dd-mm-yyyy") %>.js']
      }
     },
     blog_entries: {
      files: {
        'js/build/blog-entries.<%= grunt.template.today("dd-mm-yyyy") %>.js' : ['js/dist/blog-entries.<%= grunt.template.today("dd-mm-yyyy") %>.js']
      }
     },
     combined: {
      files: {
        'js/build/combined.<%= grunt.template.today("dd-mm-yyyy") %>.js' : ['js/dist/combined.<%= grunt.template.today("dd-mm-yyyy") %>.js']
      }
     },
     off_canvas: {
      files: {
        'js/build/off-canvas.min.js' : ['js/lib/off-canvas.js']
      }
     }
    }

  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-uncss');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-browser-sync');

  grunt.loadNpmTasks('grunt-penthouse');
  grunt.loadNpmTasks('grunt-svgstore');
  grunt.loadNpmTasks('grunt-svgmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask( 'build', ['sass']);
  grunt.registerTask( 'clean', ['sass','uncss', 'autoprefixer', 'cssmin']);
  grunt.registerTask( 'buildjs', ['concat', 'ugllify']);
  grunt.registerTask( 'default', ['build','browserSync','watch']);
};
