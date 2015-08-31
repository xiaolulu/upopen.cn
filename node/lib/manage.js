
var http = require( 'http' ),
	util = require( 'util' ),
	db   = require( '../db/sql' ),
	toy = require( '../tool/toy' ),
	fs = require( 'fs' ),
    marked = require( 'marked' );

marked.setOptions({
	renderer: new marked.Renderer(),
	gfm: true,
	tables: true,
	breaks: false,
	pedantic: false,
	sanitize: true,
	smartLists: true,
	smartypants: false
});


function fetchArticleAll( data, cb ){

	db.fetchArticleAll( data, function( err, docs ){
		if( !err ){
			cb( docs );
		}
	} );

}

function fetchArticleByKindAll( data, cb ){

	db.fetchArticleByKind( data, function( err, docs ){
		if( !err ){
			cb( docs );
		}
	} );

}


var tmp = ['<div class="col-md-6">',
		       '<div class="item">',
		            '<a class="title" href="/article/info/{_id}">{title}</a>',
		            '<div class="info">',
		                '<span class="kind"><a href="#">{kind}</a></span><tt>/</tt>',
		                '<span class="author">{author}</span><tt>/</tt>',
		                '<span class="date">{date}</span>',
		            '</div>',
		            '<p class="description">{description}</p>',
		        '</div>',
		    '</div>'].join( '' );

function renderAll( items ){
		
	var els = [];
	for(  var i = 0; i < items.length; i++ ){
		els.push( render( items[i] ) );
	}
	return els

}

function render( item, talkBox ){
	item.date = item.date;
	item._doc.date = item.date.toISOString().split('T')[0];
	var el =  tmp.replace( /\{(.*?)\}/g, function( $1, $2 ){
			return item[ $2 ];
		}) ;
	return el;

}

var htx2EjsRet = '';

function htx2Ejs( model, source, path, res ){
	fs.readFile( source + '.htx','utf8', function( err, data ){
		data = data.replace( /\{(.*?)\}/g, function( $1, $2 ){
				return model[ $2 ];
			}) ;

		fs.writeFile( path + '.ejs', data,  function( e ){
			if( e ){
				htx2EjsRet += '1';
				throw e;
			} else {
				htx2EjsRet += '0';
			}
			if( htx2EjsRet.length == 3 ){
				res.send( { code: htx2EjsRet - 0 } );
				htx2EjsRet = '';
			}
		});
	});
}

function rebuildArtile( docs, res ){

	for( var i = 0; i < docs.length; i++ ){
		docs[i].content = marked( docs[i].content );
		htx2Ejs( docs[i],  'views/article/info', 'views/article/info/' + docs[i]._id, res );
	}

}

function rebuildList( docs, res ){
	
	var txt = renderAll( docs );
	htx2Ejs( {content: txt.join('')}, 'views/article/list', 'views/article/list', res );

}

function createIndex(){

	var kind = {},
		dataKind = {},
		tmp = ['<div class="col-md-4">',
           '<div class="item">',
                '<a class="title" href="/article/info/{_id}">{title}</a>',
                '<div class="info">',
                    '<span class="kind"><a href="#">{kind}</a></span><tt>/</tt>',
                    '<span class="author">{author}</span><tt>/</tt>',
                    '<span class="date">{date}</span>',
                '</div>',
                '<p class="description">{description}</p>',
            '</div>',
        '</div>'].join( '' );


	function initData( data ){
		var i = 0;
		while( i < data.length ){
		    dataKind[ data[i].kind ].push( data[ i++ ] )
		}
		return renderAll( dataKind );
	}

	function renderAll( items ){
	
		var els = [];
		for( var k in items ){
			var v = items[k],
				h2 = '<h4 class="col-md-12"><a href="/article/list/'+k+'">'+k+'</a></h4>';
		  	els.push( h2 )
		    var i = 0
		    for( ; i < v.length; i++ ){
		        if( i >= 3 ){
		            break;
		        }
		     els.push( render( v[i] ) );
		    }
		    
		};	
		return els.join('');

	}

	function render( item, talkBox ){
		
		item._doc.date = item.date.toISOString().split('T')[0];
		var el =  tmp.replace( /\{(.*?)\}/g, function( $1, $2 ){
				return item[ $2 ];
			}) ;
		return el;

	}

	function fetchArticle( req, res ){
		
		fetchArticleByKindAll({}, function( docs ){
			htx2Ejs( { content: initData( docs ) }, 'views/index', 'views/index', res );
		})
	
	};

	function initKind( data ){
		var i = 0;
		while( i < data.length ){
		    if( data[ i ].amount ){
		     dataKind[ data[ i ].name ] = [];
		    }
		    i++;
		}

	}

	function fetchKind(req, res){
		
		db.fetchKind({}, function( err, docs ){
			initKind( docs );
			fetchArticle(req, res);
		})
	
	};

	return fetchKind;

}

function rebuildIndex( req, res ){
	createIndex()( req, res );
}


function rebuild( req, res ){
	
	fetchArticleAll({}, function( docs ){
		rebuildList( docs, res );
		rebuildArtile( docs, res );
	} );
	rebuildIndex( req, res);

}

function loginIn( req, res ){

	if( req.body.username == 'fc5be43d76d40e9f4d18bf117726f04d' && req.body.password == '69727ae2597954d5a7d0733bc9e3a5b5' ){
		req.session.status = true;
		res.send( { code: 0, msg: 'login success' } );
	} else {
		res.send( { code: 1001, msg: 'username or password is wrong' } );
	}

}

function logout( req, res ){

	req.session.status = false;
	res.send( { code: 0, msg: 'logout success' } );
}

module.exports = {
	rebuild:   rebuild,
	loginIn:	loginIn,
	logout:		logout
}
