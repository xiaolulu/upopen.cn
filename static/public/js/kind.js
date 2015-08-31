
define([], function(){

	var kindBox = $( '#kindBox' ),
		data = [],
		tmp = [ '<dd><a href="/article/list?kind={index}">⋅{name}&nbsp;({amount})</a></dd>'].join('');

	function fetchKind( ){
		
		var data = {};

		$.ajax( {
			url: basePath + '/fetchKind',
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

	function renderAll( items ){
		
		var els = [];
		$.each( items, function( k, v ){
			els.push( render( v ) );
		});	
		kindBox.append( els );

	}

	function render( item, talkBox ){
		var el =  tmp.replace( /\{(.*?)\}/g, function( $1, $2 ){
				return item[ $2 ];
			}) ;
		talkBox && talkBox.append( el );
		return el;

	}

    var lastTalk = $( '#lastTalk' ),
		dataTalk = [],
		tmpTalk = [ '<dd><a href="/article/info/{belong}">⋅{content}... --- by:{name}</a></dd>'].join('');

	function fetchTalk( ){
		
		var data = {
            start: 0
        };

		$.ajax( {
			url: basePath + '/fetchTalk',
			type: 'get',
			dataType: 'json',
			data: data,
			success: function( ret ){
				if( ret.code == '0' ){
					renderTalkAll( ret.data );
				}
			}
		} );
		
	};

	function renderTalkAll( items ){
		
		var els = [];
		$.each( items, function( k, v ){
			els.push( renderTalk( v ) );
		});	
		lastTalk.append( els );

	}

	function renderTalk( item, talkBox ){
        item.name = item.userId || '匿名';
        item.content = item.content.slice( 0, 40 );
		var el =  tmpTalk.replace( /\{(.*?)\}/g, function( $1, $2 ){
				return item[ $2 ];
			}) ;
		return el;

	}


	!function(){
		fetchKind();
        fetchTalk();
	}();
})
