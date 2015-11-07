module.exports = function(grunt) {

  var path = {
          src: "../src",
          dist: "../public",
          bower: "../bower_components"
  };

  grunt.initConfig({

    sass: {
        options: {
            style: 'expanded'
        },
        dist: {
            files: {
              '../public/css/main.css': '../src/sass/main.scss'
            }
        }
    },

    concat: {
      js: {
				src: [path.bower + '/angular/angular.js', path.bower + '/bootstrap/src/*.js', path.bower + '/react/react-with-addons.js'],
				dest: path.dist + '/js/main.js'
      }
    },

    watch: {
      js: {
          files: path.src + '/**/*.js',
          tasks: ['concat'], 
          options: {
              livereload: true
          }
      },
      sass: {
          files: path.src + '/**/*.scss',
          tasks: ['sass'], 
          options: {
              livereload: true
          }
      }
    }   

  })

  require('time-grunt')(grunt);


  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['sass', 'concat', 'watch']);
}