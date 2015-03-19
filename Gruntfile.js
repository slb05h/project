module.exports = function(grunt) {

	// Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

	// var npmDependencies = require('./package.json').devDependencies;


	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		// Compass
		compass : {
		  dist: {
		    options: {
		      sassDir: 'scss',
		      cssDir: 'css',
		      require: 'susy',
		      outputStyle: 'compressed'
		    }
		  }
		},


		// Autoprefixer
		autoprefixer: {
			no_dest: {
				src: 'css/screen.css'
			},
			options: {
			  browsers: ['last 2 version', 'ie 8', 'ie 9']
			}
    },

    // Image min
		imagemin : {
			dist : {
				files : [
					{
						expand: true,
						cwd: 'img',
						src: ['*.{png,jpg,jpeg}','team/*.{png,jpg,jpeg}','home/*.{png,jpg,jpeg}','apps/*.{png,jpg,jpeg}'],
						dest: 'img/optimized'
					}
				]
			}
		},


		// SVG min
		svgmin: {
			dist : {
				files : [
					{
						expand: true,
						cwd: 'img',
						src: '*.svg',
						dest: 'img/optimized'
					}
				]
			}
		},


		// Watches for changes and runs tasks
		watch : {
			compass: {
			  files: ['scss/**/*.{scss,sass}'],
			  tasks: ['compass', 'autoprefixer'],
			  options: {
			    livereload: true
			  },
			},
			js : {
				files : ['js/**/*.js'],
				tasks : ['requirejs'],
				options : {
					livereload : true
				}
			},
			html : {
				files : ['*.html'],
				options : {
					livereload : true
				}
			},
			images : {
				files : ['img/*.{png,jpg,jpeg}', 'img/*.svg'],
				tasks : ['newer:imagemin','newer:svgmin'],
				options : {
					livereload : true
				}
			}

		},

		// Require config
		requirejs : {
			compile : {
				options : {
					name : 'plugins',
					baseUrl : 'js',
					mainConfigFile : 'js/plugins.js',
					out : 'out/plugins.min.js',
					optimize : 'none'
				}
			}
		}

	});

	grunt.registerTask('build', [
	  'autoprefixer',
	  'compass',
	  'newer:svgmin',
	  'requirejs'
	]);

	// Default task
	grunt.registerTask('default', ['build','watch']);

};
