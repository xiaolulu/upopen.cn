
var http  	= require( 'http' ),
	toy     = require( '../tool/toy' ),
	domain	= require( 'domain' ),
	talk 	= require( './talk' ),
	article = require( './article' ),
	config 	= require( '../config/site' ),
	manage 	= require( './manage' ),
	kind 	= require( './kind' );

var Domain = domain.create();

Domain.on( 'error', function( e ){
	toy.log.error( 'domain error: ' + e );
});

exports.all = function( app ){
	
	/****************************************
	入口
	****************************************/
	app.use( function( req, res, next){
	
		toy.log.info( 'recive requext path=' + req.path + ';method=' + req.method );
		res.header( "Content-Type", "text/html; charset=utf-8" );
		next();

	});

	/***********************************************
	root

	G - /:     
	G - index: 
	G - demo
	
	************************************************/

	app.get( '/', function( req, res ){
		
		res.render('index.ejs', config.setting( { path: '/index' } ) );

	});

	app.get( '/index', function( req, res ){
		
		res.render('index.ejs', config.setting( req ) );

	});

	app.get( '/demo', function( req, res ){
		
		res.render('demo.ejs', { title: global.webConfig.title, basePath: global.webConfig.basePath, currentPage: '/index/index' });

	});
	
	/***********************************************
	TALK

	P - fetchTalk:       
	G - addTalk:    
	
	************************************************/

    app.get( '/fetchTalk', function( req, res ){
		talk.fetchTalk( req, res );	
	
	});

	app.post( '/addTalk', function( req, res ){

		talk.addTalk( req, res );

	} );

    /***********************************************
	ARTICLE

	G - article/info/:id:   文章详细，静态    
	G - article/list:		文章列表
	G - article/info		文章详细，动态    
	
	************************************************/

	app.get( '/article/info/:id', function( req, res ){

		article.infoHtx( req, res );

	} )

	app.get( '/article/list', function( req, res ){
		
		article.list( req, res );

	});

	app.get( '/article/info', function( req, res ){
		
		article.info( req, res );

	});

	app.get( '/fetchArticle', function( req, res ){

		article.fetchArticle( req, res );	
	
	});

    app.get( '/fetchArticleByKind', function( req, res ){

		article.fetchArticleByKind( req, res );	
	
	});

	app.get( '/fetchArticleInfo', function( req, res ){

		article.fetchArticleInfo( req, res );	
	
	});

    app.get( '/fetchArticleEditInfo', function( req, res ){

        article.fetchArticleEditInfo( req, res );
    
    })

	app.post( '/addArticle', function( req, res ){

		article.addArticle( req, res );

	} );

    app.post( '/updateArticle', function( req, res ){

		article.updateArticle( req, res );

	} );

    /***********************************************
	KIND

	G - fetchTalk:       
	G - addTalk:    
	
	************************************************/

	app.get( '/kind/list', function( req, res ){

		kind.list( req, res );	
	
	});

	app.get( '/fetchKind', function( req, res ){

		kind.fetchKind( req, res );	
	
	});

	app.get( '/incKind', function( req, res ){

		kind.incKind( req, res );	
	
	});

	app.post( '/addKind', function( req, res ){

		kind.addKind( req, res );

	} );

	/***********************************************
	Manage

	G - manage/list:		管理-新闻列表
	G - manage/edit:		管理-新闻编辑  
	G - manage/kindList:	管理-类目列表 
	G - manage/rebuild:		管理-构建页面
	
	************************************************/

	app.get( '/manage/list', function( req, res ){

		manage.list( req, res );
	
	} );

	app.get( '/manage/edit', function( req, res ){

		manage.edit( req, res );
	
	} );

	app.get( '/manage/kindList', function( req, res ){

		manage.kindList( req, res );
	
	} );

	app.post( '/manage/rebuild', function( req, res ){

		manage.rebuild( req, res );

	})


	/***********************************************
	error
	*************************************************/

	app.get( '/error', function( req, res ){
		
		res.render( 'error.ejs', config.setting( req, '/issue' ) )
		
	});

	app.get( '*', function( req, res ){
		
		res.redirect( '/error' );
		
	});

	app.post( '*', function( req, res ){
		
		res.send( 404 );
		
	});
	

};
