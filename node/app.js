
/**
 * Module dependencies.
 */
var express    = require( 'express' ),
    routes     = require( './routes' ),
    http       = require( 'http' ),
    path       = require( 'path' ),
    bodyParser = require( 'body-parser' ),
    toy       = require( './tool/toy' );

var app        = express(),
	server     = http.Server( app );

app.set( 'port', process.env.PORT || 3000 );
app.set( 'views', __dirname + '/views' );
app.set( 'view engine', 'ejs' );
app.use( '/', express.static( path.join( __dirname, 'assets' )));
app.use( bodyParser.urlencoded({ extended: false }));
app.use( express.json({limit: '5mb'}));
app.use( express.urlencoded({limit: '5mb'}));
app.use( bodyParser.json({limit: '5mb'}));
app.use( bodyParser.urlencoded({limit: '5mb', extended: true}));
// development only
routes.all( app );

server.listen( app.get( 'port' ), function(){
	console.log( 'root server listening on port ' + app.get( 'port' ) );
	toy.log.info( 'server start' + app.get( 'port' ) );
} );

server.on( 'close', function( e ){
	toy.log.info( 'server close ' + e );
} );




