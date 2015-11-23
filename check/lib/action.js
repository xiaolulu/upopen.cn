var action 			= require( '../db/sql' ),
	BufferHelper 	= require( 'BufferHelper' ),
	toys 			= require( '../tool/toys' ),
	qs 				= require( 'querystring' );

function create( req, res ){
	var data = req.body;
	var bh = new BufferHelper();
	req.on( 'data', function( buf ){
		bh.concat( buf );
	});
	req.on( 'end', function(){
		data = toys.Str2JSON( bh.toString() );
		try{
			data.params = JSON.parse( data.params );
		}catch(e){
			data.params = {};
		}
		action.createAction( data, function( err, docs ){
			if( !err ){
				res.send( {code:0, data: docs} )
			}
		} );
	})
}

function fetch( req, res ){
	var data = req.query;
	action.fetchAction( data, function( err, docs ){
		if( !err ){
			res.send( {code:0, data: docs} )
		}
	} );
}

function update( req, res ){
	var data = req.body;
	var bh = new BufferHelper();
	req.on( 'data', function( buf ){
		bh.concat( buf );
	});
	req.on( 'end', function(){
		data = toys.Str2JSON( bh.toString() );
		try{
			data.params = JSON.parse( data.params );
		}catch(e){
			data.params = {};
		}
		action.updateAction( data, function( err, docs ){
			if( !err ){
				res.send( {code:0, data: docs} )
			}
		} );
	})
}

function remove( req, res ){
	var data = req.body;
	var bh = new BufferHelper();
	req.on( 'data', function( buf ){
		bh.concat( buf );
	});
	req.on( 'end', function(){
		data = toys.Str2JSON( bh.toString() );
		action.removeAction( data, function( err, docs ){
			if( !err ){
				res.send( {code:0, data: docs} )
			}
		} );
	})
}

function check( req, res ){
	var data = req.body;
	var bh = new BufferHelper();
	req.on( 'data', function( buf ){
		bh.concat( buf );
	});
	req.on( 'end', function(){
		data = toys.Str2JSON( bh.toString() );
		data.actionConfig = JSON.parse( data.actionConfig );
		checkAction( data, function( ret ){
			res.send( ret );
		} );
	})
}

function checkAction( data, cb ){
	var config = data.actionConfig;

	delete data.actionConfig;
	
	var method = config.method.toUpperCase(),
		path = config.path + ( method == 'GET' ? '?' + qs.stringify( data ) : '' );
		
	var options = {
		hostname: config.host,
		port: 80,
		method: method,
		path: path,
		headers: {
			'content-type': 'application/x-www-form-urlencoded'
		}
	}
	console.log( options );
	if( method == 'POST' ){
		options[ 'headers' ]['content-length'] = qs.stringify( data ).length;
	}

	toys.httpServer( options, qs.stringify( data ), function( ret ){
		console.log( ret );
		cb( ret )
	})
}

module.exports = {
	create: create,
	fetch: fetch,
	update: update,
	remove: remove,
	check: check
}
