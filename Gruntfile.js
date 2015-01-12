'use strict';

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    grunt.loadNpmTasks('grunt-manifest');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-vulcanize');


    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        yeoman: {
            // Configurable paths
            app: 'app',
            dist: 'dist',
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= yeoman.dist %>/*',
                        '!<%= yeoman.dist %>/.git*'
                    ]
                }]
            },
            server: '.tmp'
        },

        // Renames files for browser caching purposes
        /*rev: {
            dist: {
                files: {
                    src: [
                        '<%= yeoman.dist %>/editor/scripts/build.js'
                        //'<%= yeoman.dist %>/css/build.css'
                    ]
                }
            }
        },*/

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            options: {
                root : '<%= yeoman.app %>/',
                dest: '<%= yeoman.dist %>/',
                verbose : true
            },
            html: '<%= yeoman.app %>/index.html'
        },

        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
            options: {
                assetsDirs: ['<%= yeoman.dist %>/']
            },
            html: ['<%= yeoman.dist %>/{,*/}*.html']
            //css: ['<%= yeoman.dist %>/css/{,*/}*.css']
        },

        
        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        '*.html',
                        '*.php',
                        'favicon.ico',
                        'count.js',
                        'description.json',
                        '*.xml',
                        'images/**',
                        'comics/**',
                        'icons/**',
                        'styles/**'
                    ]
                }]
            }
        },


        shell: {
            // usemin compresses the css and js, makeing the components lib
            // unnecessary except the polymer script
            /*'clear-bower-components' : {
                options: {
                    stdout: true,
                    stderr: true
                },
                command: 'rm -rf <%= yeoman.dist %>/bower_components && '+
                         'rm -rf <%= yeoman.dist %>/elements'
            },*/
            server : {
                options: {
                    stdout: true,
                    stderr: true
                },
                command: 'node server --dev'
            },
            'build-server' : {
                options: {
                    stdout: true,
                    stderr: true
                },
                command: 'node server'
            },
            'generate-deep-css' : {
                options: {
                    stdout: true,
                    stderr: true
                },
                command: 'rm -rf <%= yeoman.app %>/styles/deep.css <%= yeoman.app %>/styles/animate.css && ' +
                         'cp <%= yeoman.app %>/bower_components/animate-css/animate.min.css <%= yeoman.app %>/styles/animate.css && '+
                         'cp <%= yeoman.app %>/bower_components/animate-css/animate.css <%= yeoman.app %>/styles/deep.css && '+
                         'sed -i "" -e \':a\' -e \'N\' -e \'$!ba\' -e \'s/\\(\\n\\)\\(\\.[a-zA-Z]*\\)/\\1html \\/deep\\/ \\2/g\' <%= yeoman.app %>/styles/deep.css'

            },
        },

        rename: {
            moveThis: {
                src: '<%= yeoman.app %>/elements-build.html',
                dest: '<%= yeoman.dist %>/elements.html'
            },
        },

        vulcanize: {
            default : {
                options: {
                    inline : true
                },
                files : {
                    '<%= yeoman.app %>/elements-build.html': ['<%= yeoman.app %>/elements.html']
                }
            }
        },

    });

    grunt.registerTask('build', [
        'clean:dist',
        'copy:dist',
        'useminPrepare',
        'concat:generated',
        //'cssmin:generated',
        'uglify:generated',
        //'rev',
        'usemin',
        'vulcanize',
        'rename'
        //'shell:clear-bower-components'
    ]);

    grunt.registerTask('server', [
        'shell:server'
    ]);

    grunt.registerTask('build-server', [
        'build',
        'shell:build-server'
    ]);

};

