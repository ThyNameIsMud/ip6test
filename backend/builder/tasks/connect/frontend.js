/*jshint node:true*/
'use strict';

var 

CONFIG = require(process.env.base_path + 'config'),

// Dependences
gulp = require('gulp-help')(require('gulp')),
exec = require('child_process').exec

;

function listPM2Items () {
	var items = exec('pm2 list', 
		function (err,stdout,stderr) { 
			if(err) {
				console.error(err);
			}
		}
	);

	items.stdout.on('data', function(data) {
		console.dir(data);
	});
}

module.exports = function (callback) {
	console.info("Connecting Frontend Server");

	gulp.task('connect-frontend', function() {

		var frontend = exec('pm2 start ' + CONFIG.paths.servers + 'frontend.js --watch --name ' +CONFIG.server.frontend.domain,
				function (err, stdout, stderr) {
					if(err) {
						console.error(err);	
					} 
				}
			);
		frontend.on('close', function(data) {
			console.info("Frontend Connected")
			//listPM2Items();
		});
	});
};
