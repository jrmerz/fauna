'use strict';


module.exports = function copyto(grunt) {
    // Load task
    grunt.loadNpmTasks('grunt-copy-to');

    // Options
    return {
        build: {
            files: [{
                cwd: 'app',
                src: ['*.{php,html,json,ico,xml}', 'images/**/*', 'icons/**/*', 'fonts/**/*'],
                dest: 'dist/'
            },
            {
                cwd: 'app/styles',
                src: ['ie.css'],
                dest: 'dist/styles/'
            }],
            options: {
                ignore: []
            }
        }
    };
};
