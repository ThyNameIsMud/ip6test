/*jshint node:true */
var 
CONFIG = require(process.env.base_path + 'config')

;

function loadBasicCoord() {

	return {loc: [0,0]};
}

function loadRefinedCoord(params) {

	return {loc: [0,0]};
}


module.exports = {
	method: 'GET',
	path: '/coord/{z}/{x}/{y}',
	handler: function (request, reply) {
		var coordinates = {};

		if(request.params.z !== 0) {
			coordinates = loadRefinedCoord(request.params);
		} else {
			coordinates = loadBasicCoord();
		}
		
		reply(coordinates);
	}
};