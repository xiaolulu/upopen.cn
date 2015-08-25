
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
		doc: 'public/js/zhdoc',
		kind: 'public/js/kind',
      	talk: 'module/talk/talk'
	}
})

define( ['base', 'dialog', 'doc', 'talk', 'all', 'kind'],function( base, Dialog, DOC, Talk ){
    
	
	var type = $( '#type' ),
		title = $( '#title' ),
		description  = $( '#description' ),
		author = $( '#author' ),
		tag = $( '#tag' ),
		date  = $( '#date' ),
      	kind  = $( '#kind' ),
		sort = $( '#sort' ),
		hot = $( '#hot' ),
		content = $( '#content' );

	function getLocal(){
		try{
			var param = location.search.slice(1).split('&');
		} catch (e){
			var param = location.pathname.split('/')[3]
		}
		var p = {};
		for( var i = 0; c = param[i]; i++ ){
			var s = c.split('=');
			p[s[0]] = s[1];
		}
		return p;
	}

	function fetchArticle( ){
		
		var param = getLocal();
		var data = {
			"_id": param.id || '',
		};
		$.ajax( {
			url: basePath + '/fetchArticleInfo',
			type: 'get',
			dataType: 'json',
			data: data,
			success: function( ret ){
				if( ret.code == '0' ){
					//render( ret.data, talkBox );
					title.html( ret.data.title );
					date.html( ret.data.date.split('T')[0] );
                kind.html( ret.data.kind );
					content.html( ret.data.content );
					author.html( ret.data.author );
                    
                Talk( param.id );
				}
			}
		} );
		return false;
	}

	!function(){
		fetchArticle();
	}()
	

});

