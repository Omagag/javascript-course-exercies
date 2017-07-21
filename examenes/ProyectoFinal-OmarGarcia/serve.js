var express = require('express');
var app = express();

/*app.use("/", function(req, res) {
	// Solo si se requiere chachar los request y los response
});*/
app.use("/", express.static(__dirname + '/'));

app.listen(process.env.npm_package_config_port);