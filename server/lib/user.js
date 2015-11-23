var db = require( '../db/sql' ).user,
	BH = require( 'BufferHelper' ),
	qs = require( 'querystring' ),
	toys = require( '../tool/toys' ),
	uuid = require( '../tool/uuid' );


function create( req, res ){
	
	var data,
		bh = new BH();
	req.on( 'data', function( buf ){
		bh.concat( buf )
	});
	req.on( 'end', function(){
		data = toys.Str2JSON( bh.toString() );
		data.date = new Date;
		data.id = uuid.v4();
		db.create( data, function( err, docs ){
			console.log( err );
			res.send( docs );
		});
	});
	
}

function fetch( req, res ){
	var data = req.query;
	db.fetch( data, function( err, docs ){
		console.log( docs );
		res.send( docs );
	});

}

function update( req, res ){
	
}

module.exports = {
	create: create,
	fetch: fetch,
	update: update
}
