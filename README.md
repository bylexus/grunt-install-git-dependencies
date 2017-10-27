# grunt-install-git-dependencies

> Installs git dependencies defined in package.json. Mainly meant to get rid of bower.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-install-git-dependencies --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-install-git-dependencies');
```

## The "install_git_dependencies" task

### Overview
This is a simple task for installing packages from GIT repositories, instead of requiring them via NPM. This grunt plugin does not need a Grunt config, but
rather takes its configuration from package.json, to have all package dependencies in one place.

So rather than provide a Grunt config, add your config to `package.json`:

```json
{
  "directories": {
    "gitDependencies": "webroot/components"
  },
  "gitDependencies": {
    "foo": "https://github.com/bylexus/foo.git#0.4.0"
  }
}
```

### package.json configurations

#### directories.gitDependencies

Type: `String`
Default value: `'components'`

A (relative to the Gruntfile) path to the base directory where the GIT packages will be cloned into.


#### gitDependencies

Type: `Object`
DefaultValue: `{}`

Object containing your GIT dependencies. The syntax for an entry is:

`"[outdir]": "[git-url]#[branch-or-tag]"`

Example:

```json
  "gitDependencies": {
    "foo": "https://github.com/bylexus/foo.git#0.4.0",
    "bar": "https://github.com/bylexus/foo.git"
  }
```

This installs the `foo` repo into `components/foo` directory, and checks out branch or tag `0.4.0`, and installs the `bar` repo from master to `components/bar`.

If the branch / tag is omitted, `master` is assumed.


### Usage Examples

#### Just load the task and execute it

This task has NO own tas configuration: It is completely configured via `package.json`, see above.

The only thing you have to do is to load the task in your `Gruntfile`:

```js
module.exports = function(grunt) {
    grunt.initConfig({
        // ....
    });

    grunt.loadNpmTasks('grunt-install-git-dependencies');
}
```

Then execute it:

```sh
$ grunt install-git-dependencies
```
