
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

define( [ 'kind' ],function( kind ){
	
    var articleBox = $( '#articleBox' ),
        tmp = ['<div class="col-md-6">',
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

    function getLocal(){
		var param = location.search.slice(1).split('&');
		var p = {};
		for( var i = 0; c = param[i]; i++ ){
			var s = c.split('=');
			p[s[0]] = s[1];
		}
		return p;
	}

    function renderAll( items ){
		
		var els = [];
		$.each( items, function( k, v ){
			els.push( render( v ) );
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
		
		var data = getLocal();
        $( '.crumbs tt' ).html( data.kind || '全部类目' );
		if( !data.kind ){
			$( '.htxContent' ).show();
			return;
		}
		$.ajax( {
			url: basePath + '/fetchArticle',
			type: 'get',
			dataType: 'json',
			data: data,
			success: function( ret ){
				if( ret.code == '0' ){
					renderAll( ret.data );
				}
			}
		} );
		
	};

	!function(){
		fetchArticle();
	}();
	

});

