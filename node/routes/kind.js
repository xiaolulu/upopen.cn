
var http	= require( 'http' ),
	config	= require( '../config/site' ),
	kind	= require( '../lib/kind' );

/***********************************************
kind

G - kind:               文章类别


************************************************/

function list( req, res ){
	
	res.render( 'kind/list.ejs', config.setting( req )  );
	
}

function fetchKind( req, res ){

	kind.fetchKind( req, res );

}

function incKind( req, res ){

	kind.incKind( req, res );

}

function addKind( req, res ){

	kind.addKind( req, res );

}

module.exports = {
	list:		list,
	incKind:	incKind,
	fetchKind:	fetchKind,
	addKind:	addKind
}
