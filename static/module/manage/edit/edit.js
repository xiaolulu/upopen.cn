
require.config({
	map: {
		'*': {
			'css': './core/css.min'
		}
	},
	baseUrl: basePath,
	paths: {
		base: 'core/js/base',
		dialog: 'widget/dialog/dialog',
		all: 'public/js/all',
		doc: 'public/js/zhdoc'
	}
})

define( ['base', 'dialog', 'doc', 'all'],function( base, Dialog, DOC ){

	var kind = $( '#kind' ),
		title = $( '#title' ),
		description  = $( '#description' ),
		author = $( '#author' ),
		tag = $( '#tag' ),
		disabled  = $( '#disabled' ),
		sort = $( '#sort' ),
		hot = $( '#hot' ),
		content = $( '#content' );

	function renderKind( items ){
		var els = [];
		$.each( items, function( k, v ){
			els.push( new Option( v.index, v.name ) );
		})
		kind.append( els );
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
                fetchArticleInfo();
					renderKind( ret.data );
				}
			}
		} );
		
	};

    function getLocal(){
		var param = location.search.slice(1).split('&');
		var p = {};
		for( var i = 0; c = param[i]; i++ ){
			var s = c.split('=');
			p[s[0]] = s[1];
		}
		return p;
	}

    function fetchArticleInfo(){
        var id = '';
        if( !( id = getLocal().id ) ){
            return;
        }
       $.ajax( {
			url: basePath + '/fetchArticleEditInfo',
			type: 'get',
			dataType: 'json',
			data: {'_id': id },
			success: function( ret ){
				if( ret.code == '0' ){
					//render( ret.data, talkBox );
                kind.val( ret.data.kind );
					title.val( ret.data.title );
					description.val( ret.data.description.split('T')[0] );
					content.val( ret.data.content );
                tag.val( ret.data.tag.join(',') );
                hot.val( ret.data.hot );
                    sort.val( ret.data.sort );
					author.val( ret.data.author );
				}
			}
		} );
    }

	$( '#form' ).on( 'submit', function(){
		
		var data = {
                kind: kind.val(),
                title:  title.val(),
                description: description.val() || content.val().slice(0, 50 ),
                author: author.val(),
                tag: tag.val(),
                disabled: disabled.get(0).disabled,
                    sort: sort.val(),
                hot: hot.val(),
                content: content.val(),
                link: '',
                },
            id,
            url = basePath + '/addArticle';
         if( id = getLocal().id ){
            data.id = id;
            url =  basePath + '/updateArticle'
        }
		$.ajax( {
			url: url,
			type: 'post',
			dataType: 'json',
			data: data,
			success: function( ret ){
				if( ret.code == '0' ){
					//render( ret.data, talkBox );
					console.log( ret );
				}
			}
		} );
		return false;
	} );

	!function(){
		fetchKind();
	}()

});

