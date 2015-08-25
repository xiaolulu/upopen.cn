
require.config({
	map: {
		'*': {
			'css': './core/css.min'
		}
	},
	baseUrl: basePath,
	paths: {
        base: 'core/base',
        all: 'public/all',
        kind: 'public/js/kind',
        talk: 'public/js/talk'
	}
})

define( function(){
    
	/*
    var articleBox = $( '#articleBox' ),
         kind = {},
        dataKind = {},
        tmp = ['<div class="col-md-4">',
                           '<div class="item">',
                                '<a class="title" href="/article/info?id={_id}">{title}</a>',
                                '<div class="info">',
                                    '<span class="kind"><a href="#">{kind}</a></span><tt>/</tt>',
                                    '<span class="author">{author}</span><tt>/</tt>',
                                    '<span class="date">{date}</span>',
                                '</div>',
                                '<p class="description">{description}</p>',
                            '</div>',
                        '</div>'].join( '' );
    
    function getLocal(){
		var param = location.search.slice(1).split('&');
		var p = {};
		for( var i = 0; c = param[i]; i++ ){
			var s = c.split('=');
			p[s[0]] = s[1];
		}
		return p;
	}

    function initData( data ){
        var i = 0;
        while( i < data.length ){
            dataKind[ data[i].kind ].push( data[ i++ ] )
        }
        renderAll( dataKind );
    }

    function renderAll( items ){
		
		var els = [];
		$.each( items, function( k, v ){

          els.push( $( '<h2>').addClass(  'col-md-12' ).append( $( '<a>' ).html( k).attr( 'href', '/article/list?kind=' + k )  ) );
            var i = 0
            for( ; i < v.length; i++ ){
                if( i >= 3 ){
                    break;
                }
             els.push( render( v[i] ) );
            }
            
		});	
		articleBox.append( els );

	}

    function render( item, talkBox ){
		item.date = item.date.split('T')[0];
		var el =  tmp.replace( /\{(.*?)\}/g, function( $1, $2 ){
				return item[ $2 ];
			}) ;
		return $( el );

	}

	function fetchArticle( ){
		
		var param = getLocal();
		var data = getLocal();

		$.ajax( {
			url: basePath + '/fetchArticleByKind',
			type: 'get',
			dataType: 'json',
			data: data,
			success: function( ret ){
				if( ret.code == '0' ){
					initData( ret.data );
				}
			}
		} );
		
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

    function fetchKind( ){
		
		var data = {};

		$.ajax( {
			url: basePath + '/fetchKind',
			type: 'get',
			dataType: 'json',
			data: data,
			success: function( ret ){
				if( ret.code == '0' ){
					initKind( ret.data );
                fetchArticle();
				}
			}
		} );
		
	};

	!function(){
        fetchKind()
	}();
	*/
});

