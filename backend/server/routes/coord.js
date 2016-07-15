/*jshint node:true */
var 
CONFIG = require(process.env.base_path + 'config'),
fs = require('fs'),
csv = require('fast-csv'),
ip6 = require('ip-address').Address6
;

var addyResolution = {
	init: function () {
		var that = this;
		that.ips = [];
		that.locations = {};
		that.currentOutlook = [];
		
		that.loadLoactions();
		//that.loadIPs();
	},
	loadLoactions: function () {
		var that = this,

		stream = fs.createReadStream(CONFIG.paths.servers + 'model/GeoLiteCityv6.csv')
			// Read the CSV
			.pipe(csv.parse({headers:false}))
			.on('readable', function () {
				var row;
				while(null !== (row = stream.read())) {
					var item = {
						startIP: row[0],
						endIP: row[1],
						longIPStart: row[2],
						longIPEnd: row[3],
						country: row[4],
						blank: row[5],
						blank2: row[6],
						latitude: row[7],
						longitude: row[8]
					};
					// Add location for lookup
					//console.dir(item);
					that.ips = item;
					that.currentOutlook.push([parseFloat(item.latitude), parseFloat(item.longitude)]);
				}
			})
			.on('end', process.exit);
	},
	loadBasicCoord: function () {
		var that = this;
		return {loc: that.currentOutlook};
	},
	loadRefinedCoord: function (param) {
		var that = this;
		return {loc: that.currentOutlook};
	}
};

addyResolution.init();


module.exports = {
	method: 'GET',
	path: '/coord/{z}/{x}/{y}',
	handler: function (request, reply) {
		var coordinates = {};

		if(request.params.z !== 0) {
			coordinates = addyResolution.loadRefinedCoord(request.params);
		} else {
			coordinates = addyResolution.loadBasicCoord();
		}
		
		reply(coordinates);
	}
};