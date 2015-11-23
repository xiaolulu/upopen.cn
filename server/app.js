var express = require( 'express' ),
	http = require( 'http' ),
	routes = require( './routes/index' );

var app = express()

app.set( 'port', '3003' );
routes( app );

app.listen( app.get( 'port' ), function(){
	console.log( 'server listening on port ' + app.get( 'port' ));
})


