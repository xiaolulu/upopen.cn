var action = require( '../lib/action' );

exports.all = function( app ){

	app.use( function( req, res, next ){
		try{
			next();
		} catch (e){
			console.log( e );
		}
		
	});

	app.get( '/', function( req, res ){

		res.render( 'index.ejs' );

	});

	app.post( '/action/create', function( req, res ){

		action.create( req, res );

	});

	app.get( '/action/fetch', function( req, res ){

		action.fetch( req, res );

	});

	app.post( '/action/update', function( req, res ){

		action.update( req, res );

	});

	app.delete( '/action/remove', function( req, res ){

		action.remove( req, res );

	});

	app.post( '/action/check', function( req, res ){

		action.check( req, res );

	});

}
