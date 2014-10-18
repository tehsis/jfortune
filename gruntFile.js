module.exports = function(grunt) {
    grunt.initConfig({
      qunit: {
          all: ['test/**/*.html']
      }
    });

    grunt.loadNpmTasks('grunt-contrib-qunit');

    grunt.registerTask('test', [
      'qunit',
    ]);
};
