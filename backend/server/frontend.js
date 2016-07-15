var Hapi = require('hapi'),
	config = require('./config/frontend');

/*
   ____             __ _       
  / ___|___  _ __  / _(_) __ _ 
 | |   / _ \| '_ \| |_| |/ _` |
 | |__| (_) | | | |  _| | (_| |
  \____\___/|_| |_|_| |_|\__, |
                         |___/ 
*/

var server = new Hapi.Server({
	cache: config.cache,
  debug: config.debug
});

server.views(config.views);
server.connection({port: config.port, labels: 'app'});

/*
  ____  _             _           
 |  _ \| |_   _  __ _(_)_ __  ___ 
 | |_) | | | | |/ _` | | '_ \/ __|
 |  __/| | |_| | (_| | | | | \__ \
 |_|   |_|\__,_|\__, |_|_| |_|___/
                |___/                                    
*/

server.register([
    {
        register: require('lout')
    }
], function (err) {
    if (err) {
        console.error('Failed to load a plugin:', err);
    }

    server.start(function () {
		console.log('server started on port: ', server.info.port);
	});
});

/* 
  ____             _            
 |  _ \ ___  _   _| |_ ___  ___ 
 | |_) / _ \| | | | __/ _ \/ __|
 |  _ < (_) | |_| | ||  __/\__ \
 |_| \_\___/ \__,_|\__\___||___/
                                
*/

server.route(require('./routes/lib'));
server.route(require('./routes/index'));
server.route(require('./routes/coord'));

/*
  _____                 _       
 | ____|_   _____ _ __ | |_ ___ 
 |  _| \ \ / / _ \ '_ \| __/ __|
 | |___ \ V /  __/ | | | |_\__ \
 |_____| \_/ \___|_| |_|\__|___/

*/

server.on("log", function(event, tags) {
    var tagsJoined = Object.keys(tags).join(),
		message = event.data;

    console.log("Log entry [" + tagsJoined + "] (" + (message || "") + ")");
});