module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    browserify: {
      cyano: {
        files: {
          'dist/sealsc-web-extension-cyano.js': [ 'src/extension.js' ]
        },

        options: {
          transform: [["babelify"]],
          browserifyOptions: {
            standalone: 'sealsc-web-extension-cyano'
          }
        }
      },
    },
    uglify: {
      options: {
        sourceMap: true
      },
      cyano: {
        files:{
          'dist/sealsc-web-extension-cyano.min.js': [ 'dist/sealsc-web-extension-cyano.js' ],
        }
      },
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-uglify-es');

  grunt.registerTask('build', ['browserify', 'uglify']);
};
