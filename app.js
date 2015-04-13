var express = require('express');
var path = require('path');
var index = require('./routes/index');
var streams = require('./routes/streams');
var app = express();

// serve static assets from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// look for view html in the views directory
app.set('views', path.join(__dirname, 'views'));

// use ejs to render
app.set('view engine', 'ejs');

// setup routes
app.use('/', index);
app.use('/streams', streams);

module.exports = app;

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;

console.log(ipaddress);
console.log(port);

app.listen(port, ipaddress, function() {
	console.log((new Date()) + 'Random Peek at World is listening on port '
			+ port);
});
