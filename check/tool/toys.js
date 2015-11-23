var http = require( 'http' ),
	BH = require( 'BufferHelper' ),
	domain = require( 'domain' ).create();

domain.on( 'error', function( e ){
	console.log( e );
})

function Str2JSON( str, char1, char2 ){
	str = decodeURIComponent( str );
	char1 = char1 || '&';
	char2 = char2 || '=';
	str = str.split( char1 );
	var obj = {}
	str.map( function( item ){
		item = item.split( char2 );
		obj[ item[0] ] = item[1];
	});
	return obj;
}

function httpServer( options, data, cb ){

	var bh = new BH(),
		httpreq;

	domain.run( function(){
		
		httpreq = http.request( options, function( res ){

			res.on( 'data', function( data ){
				bh.concat( data );
			});

			res.on( 'end', function(){
				cb( bh.toString() );
			})

		});

		httpreq.on( 'error', function(e){
			console.log( e )
		});

		if( options.method == 'POST' ){
			httpreq.write( data );
		}

		httpreq.end();

	})
	
}

module.exports = {
	Str2JSON: Str2JSON,
	httpServer: httpServer
}
