
var http	= require( 'http' ),
	db		= require( '../db/sql' ),
	toy		= require( '../tool/toy' ),
    marked	= require( 'marked' );

marked.setOptions({
	renderer:		new marked.Renderer(),
	gfm: 			true,
	tables:			true,
	breaks:			false,
	pedantic:		false,
	sanitize:		true,
	smartLists:		true,
	smartypants:	false
});

/***********************************************
issue
P - addarticle:      添加article
G - fetcharticle:    获取article
************************************************/

function addArticle( req, res ){

	var data = req.body;
	data.date = new Date();
	db.addArticle( data, function( err, docs ){
		if( !err ){
			res.send( { code: 0, msg: 'add article success', data: docs } );
			db.incKind( data.kind, 1, function(){} );
		}
	} );

}

function updateArticle( req, res ){

	var data = req.body;
	data.date = new Date();
	db.updateArticle( data, function( err, docs ){
		if( !err ){
			res.send( { code: 0, msg: 'update article success', data: docs } );
		}
	} );

}

function fetchArticle( req, res ){

	db.fetchArticle( req.query, function( err, docs ){
		if( !err ){
			res.send( { code: 0, msg: 'find article success', data: docs } );
		}
	} );

}

function fetchArticleByKind( req, res ){

	db.fetchArticleByKind( req.query, function( err, docs ){
		if( !err ){
			res.send( { code: 0, msg: 'find article success', data: docs } );
		}
	} );

}

function fetchArticleInfo( req, res ){

	db.fetchArticleInfo( req.query, function( err, docs ){
		if( !err ){
          docs.content = marked( docs.content );
			res.send( { code: 0, msg: 'find article success', data: docs } );
		}
	} );

}

function fetchArticleEditInfo( req, res ){

	db.fetchArticleInfo( req.query, function( err, docs ){
		if( !err ){
			res.send( { code: 0, msg: 'find article success', data: docs } );
		}
	} );

}

module.exports = {
	addArticle:				addArticle,
	updateArticle:			updateArticle,
	fetchArticle:			fetchArticle,
    fetchArticleByKind:		fetchArticleByKind,
	fetchArticleInfo:		fetchArticleInfo,
    fetchArticleEditInfo:	fetchArticleEditInfo
}
