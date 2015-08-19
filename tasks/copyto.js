'use strict';


module.exports = function copyto(grunt) {
    // Load task
    grunt.loadNpmTasks('grunt-copy-to');

    // Options
    return {
        build: {
            files: [{
                cwd: 'app',
                src: ['index.html'],
                dest: 'dist/'
            },
            {
                cwd: 'app/bower_components/font-awesome',
                src: ['fonts/**/*'],
                dest: 'dist/'
            }],
            options: {
                ignore: []
            }
        }
    };
};
