var express = require( 'express' ),
	http	= require( 'http' ),
	ejs		= require( 'ejs' ),
	route	= require( './routes' );

var app = express();

app.set( 'views', __dirname + '/views' );
app.set( 'view engine', 'ejs' );
app.use( '/assets', express.static( 'assets' ));

route( app );

http.createServer( app ).listen( 3000, function(){
	console.log( 'upopen server start' );
} );
