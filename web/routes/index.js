
module.exports = function( app ){

	app.use( function( req, res ){

		res.render( 'index.ejs' );

	})

}
