
var http	= require( 'http' ),
	db		= require( '../db/sql' ),
	toy		= require( '../tool/toy' );

/***********************************************
issue
P - addKind:      添加Kind
G - fetchKind:    获取Kind
************************************************/

function addKind( req, res ){

	var data = req.body;
	data.date = new Date();
	
	db.addKind( data, function( err, docs ){
		if( !err ){
			res.send( { code: 0, msg: 'add Kind success', data: docs } );
		}
	} );

}

function fetchKind( req, res ){

	db.fetchKind( req.query, function( err, docs ){
		if( !err ){
			res.send( { code: 0, msg: 'find Kind success', data: docs } );
		}
	} );

}

function incKind( req, res ){
	
	var id = req.query._id,
		amount = req.query.amount;

	db.incKind( id, amount, function( err, docs ){
		if( !err ){
			res.send( { code: 0, msg: 'inc Kind success', data: docs } );
		}
	} );

}

module.exports = {
	addKind:	addKind,
	fetchKind:	fetchKind,
	incKind:	incKind
}
