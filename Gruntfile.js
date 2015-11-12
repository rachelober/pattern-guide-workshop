var symdiffCSS = require('symdiff-css'),
    symdiffHTML = require('symdiff-html');

module.exports = function (grunt) {

  grunt.initConfig({
    /** Used to put version at top of JS build */
    pkg: grunt.file.readJSON('package.json'),
    // Before generating new files, clean up!
    clean: {
      tests: ["tmp"]
    },

    // Watch task config
    watch: {
      sass: {
        files: "stylesheets/**/*.scss",
        tasks: ["sass"]
      },
      haml: {
        files: "*.haml",
        tasks: ["haml"]
      }
    },

    // Haml task config
    haml: {
      dev: {
        // destination        // source file
        files: {
          "index.html":       "index.haml",
        }
      }
    },

    // Sass task config
    sass: {
      dev: {
        files: {
          // destination            // source file
          "tmp/stylesheets/styles.css":    "stylesheets/styles.scss",
          "tmp/stylesheets/structure.css":    "stylesheets/structure.scss",
        },
        options: {
          require: "./node_modules/breakpoint-sass/lib/breakpoint.rb"
        }
      }
    },

    // Using the BrowserSync Server for your static .html files.
    browserSync: {
      default_options: {
        bsFiles: {
          src: [
            "tmp/stylesheets/*.css",
            "*.html"
          ]
        },
        options: {
          watchTask: true,
          server: {
            baseDir: "./"
          }
        }
      }
    },

    // Configuration to be run (and then tested).
    symdiff: {
      core: {
        src: [
          "tmp/stylesheets/*.css",
          "*.html",
        ]
      },
      options: {
        css: [symdiffCSS],
        templates: [symdiffHTML]
      }
    },

  });

  grunt.loadNpmTasks("grunt-browser-sync");
  grunt.loadNpmTasks("grunt-contrib-sass");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-haml2html");
  grunt.loadNpmTasks("grunt-symdiff");
  grunt.loadNpmTasks('grunt-contrib-concat');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask("test", ["symdiff"]);

  // Used to set up your environment for the first time.
  grunt.registerTask("setup", ["sass", "haml"]);

  // The default task will set up the evironment by compiling assets,
  // setting up browserSync, and then watching files for changes.
  grunt.registerTask("default", ["setup", "browserSync", "watch"]);

};
