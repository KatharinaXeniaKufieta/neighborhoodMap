module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    /* Extract critical CSS and inline it into the HTML file */
    critical: {
      test: {
        options: {
          base: './src/',
          extract: true,
          inline: true,
          minify: true,
          dimensions: [{
            width: 320,
            height: 500
          }, {
            width: 1200,
            height: 1500
          }]
        },
        files: [
          {src: 'src/index.html', dest: 'src/critical_html/index-critical.html'}
        ]
      }
    },

    /* Minify JavaScript */
    uglify: {
      yourTask: {
        files: {
          'dist/js/Colors_Random.js': 'src/js/Colors_Random.js',
          'dist/js/googleMaps.js': 'src/js/googleMaps.js',
          'dist/js/model.js': 'src/js/model.js',
          'dist/js/view.js': 'src/js/view.js',
          'dist/js/weatherView.js': 'src/js/weatherView.js',
        }
      }
    },

    /* Minify CSS */
    cssmin: {
      target: {
        files: [{
          expand: true,
          src: ['*.css', '!*.min.css'],
          cwd: 'src/css',
          dest: 'dist/css/',
          // ext: '.min.css'
        }, {
          expand: true,
          src: ['*.css', '!*.min.css'],
          cwd: 'src/css/lib/',
          dest: 'dist/css/lib/',
          // ext: '.min.css'
        }]
      }
    },

    /* Minify HTML files */
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
          minifyJS: true,
          minifyCSS: true
        },
        files: {
          'dist/index.html': 'src/critical_html/index-critical.html'
        }
      }
    }
  });

  grunt.registerTask('default', ['critical', 'uglify', 'cssmin', 'htmlmin:dist']);
};
