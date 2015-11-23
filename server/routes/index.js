var user = require( '../lib/user' );

module.exports = function( app ){
	app.use( function( req, res, next ){
		next();
	});

	app.post( '/user/create', function( req, res ){
		user.create( req, res );
	});

	app.get( '/user/fetch', function( req, res ){
		user.fetch( req, res );
	});

	app.post( '/user/update', function( req, res ){
		user.update( req,res );
	});
}


