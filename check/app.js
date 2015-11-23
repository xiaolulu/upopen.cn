/*
module dependencies
*/
var express = require( 'express' ),
	routes  = require( './routes' ),
	path    = require( 'path' );

var app 	= express();

app.set( 'port', process.env.PORT || 3004 );
app.set( 'views', __dirname + '/views' );
app.set( 'view engine', 'ejs' );
app.use( '/assets', express.static( 'assets' ));
app.use( '/stable', express.static( 'stable' ))
routes.all( app );


var server  = app.listen( app.get( 'port' ), function(){
	console.log( 'check server listening on prot ' + app.get( 'port' ));
});
