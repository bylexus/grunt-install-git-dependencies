/*
 * grunt-install-git-dependencies
 * https://github.com/bylexus/grunt-install-git-dependencies
 *
 * Copyright (c) 2017 Alexander Schenkel <alex@alexi.ch>
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
    // Please refer to README.md for configuration hints. In Short:
    // - This task is configured via package.json, NOT Gruntfile.json
    // - provide the 'gitDependencies' property in the 'directories' key in package.json for the main output dir
    // - provide a 'gitDependencies' config object to define dependencies

    grunt.registerTask('install-git-dependencies', 'Installs GIT dependencies defined in package.json.', function() {
        var execSync = require('child_process').execSync,
            path = require('path'),
            pkg = grunt.file.readJSON('package.json'),
            dir = pkg && pkg.directories ? pkg.directories.gitDependencies : 'components',
            deps = pkg.gitDependencies || {};

        for (var key in deps) {
            var repo = deps[key];
            var split = repo.split('#');
            var url, version, outdir;
            if (split.length < 1) {
                grunt.fail.fatal('No GIT url given for ' + key);
            }
            url = split[0];
            if (split.length < 2) {
                version = 'master';
            } else {
                version = split[1];
            }
            outdir = path.join(dir, key);
            grunt.log.ok('git package ' + outdir + ': ' + url + '#' + version);

            if (!grunt.file.isDir(outdir)) {
                grunt.log.ok('Cloning repository ' + url);
                execSync(['git', 'clone', url, outdir].join(' '));
            }

            execSync(['git', 'fetch', '--all'].join(' '), { cwd: outdir });
            execSync(['git', 'checkout', '-qf', version].join(' '), { cwd: outdir });
        }
    });
};
