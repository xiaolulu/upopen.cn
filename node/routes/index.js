
var http  	= require( 'http' ),
	toy     = require( '../tool/toy' ),
	domain	= require( 'domain' ),
	talk 	= require( './talk' ),
	article = require( './article' ),
	config 	= require( '../config/site' ),
	auth	= require( '../config/auth' ),
	manage 	= require( './manage' ),
	user 	= require( './user' ),
	redis	= require( '../tool/redis' ),
	session = require( 'express-session' ),
	kind 	= require( './kind' );

var Domain = domain.create();

Domain.on( 'error', function( e ){
	toy.log.error( 'domain error: ' + e );
});

function online( req, res, cb ){

	var sid = toy.getCookie( req.headers.cookie, 'connectSid' );
	redis.get( sid, function( ret ){
		cb( ret );
	} )

}

exports.all = function( app ){

	app.use( session({
		resave: false,
		saveUninitialized: false,
		secret: 'upopen'
	}))
	
	/****************************************
	
	****************************************/
	app.use( function( req, res, next){
	
		toy.log.info( 'recive requext path=' + req.path + ';method=' + req.method );
		console.log( req.path + ':' + req.method );
		res.header( "Content-Type", "text/html; charset=utf-8" );
		if( auth[ req.path ] == 1 && !req.session.status ){
			res.redirect( '/manage/login' );
			return;
		}
		if( auth[ req.path ] == 2 ){
			online( req, res, function( ret ){
				if( ret ){
					next()
				} else {
					res.redirect( '/index' );
				}
			});			
			return;
		}
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

	app.get( '/manage/login', function( req, res ){

		manage.login( req, res );
	
	} );

	app.post( '/manage/loginIn', function( req, res ){

		manage.loginIn( req, res );
	
	} );

	app.get( '/manage/logout', function( req, res ){

		manage.logout( req, res );
	
	} );

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

	});

	/***********************************************
	user
	
	
	************************************************/

	app.get( '/login', function( req, res ){

		user.findUser( req, res );
	
	} );

	app.post( '/register', function( req, res ){

		user.addUser( req, res );

	});

	app.post( '/logout', function( req, res ){
		
		var sid = toy.getCookie( req.headers.cookie, 'connectSid' );
		redis.set( sid, null );
        res.setHeader("Set-Cookie","username=null;" );
		res.setHeader("Set-Cookie","connectSid=null;" );
		res.send( { code: 0 } );

	});

	app.get( '/user/info', function( req, res ){
		
		user.info( req, res );
	
	} );


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
