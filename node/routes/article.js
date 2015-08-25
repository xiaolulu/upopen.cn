
var http = require( 'http' ),
	config = require( '../config/site' ),
	article = require( '../lib/article' );

/***********************************************
article

list:	文章列表
info:	文章详细
infoHtx: 文章详细静态


************************************************/

function list( req, res ){
	
	res.render( 'article/list.ejs', config.setting( req )  );
	
}

function info( req, res ){
	
	res.render( 'article/info.ejs', config.setting( req )  );
	
}

function infoHtx( req, res ){

	res.render( 'article/info/' + req.params.id + '.ejs', config.setting( { path: '/article/info' } )  );

}

function fetchArticle( req, res ){

	article.fetchArticle( req, res );

}

function fetchArticleInfo( req, res ){

	article.fetchArticleInfo( req, res );

}

function fetchArticleByKind( req, res ){

	article.fetchArticleByKind( req, res );

}

function fetchArticleEditInfo( req, res ){

	article.fetchArticleEditInfo( req, res );

}

function addArticle( req, res ){

	article.addArticle( req, res );

}

function updateArticle( req, res ){

	article.updateArticle( req, res );

}

module.exports = {
	list:             		list,
	info:					info,
	infoHtx: 				infoHtx,
	addArticle:     		addArticle,
  	updateArticle: 			updateArticle,
	fetchArticle:   		fetchArticle,
    fetchArticleByKind:	 	fetchArticleByKind,
	fetchArticleInfo: 		fetchArticleInfo,
    fetchArticleEditInfo: 	fetchArticleEditInfo
}
