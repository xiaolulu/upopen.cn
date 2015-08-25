
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
		all: 'public/all'
	}
})

define( ['base'],function(  ){

	var kindBox = $( '#kindBox' ),
		data = [],
		tmp = [ '<tt class="kindNum">{num}</tt>',
				'<h3 class="kindTitle">{name}</h3>',
				'<span class="kindAuthor">{index}</span>',
				'<p class="kindContent">{amount}</p>',
				'<span class="kindDate">{date}</span>'].join('');

	function renderAll( items ){
		
		var els = [];
		$.each( items, function( k, v ){
			els.push( render( v ) );
		});	
		kindBox.append( els );

	}

	var name = $( '#name' ),
		index = $( '#index' ),
		amount  = $( '#amount' ),
		disabled  = $( '#disabled' ),
		sort = $( '#sort' );

	function render( item, talkBox ){
		item.date = item.date.split('T')[0];
		item.num = data.length + 1;
		var el =  tmp.replace( /\{(.*?)\}/g, function( $1, $2 ){
				return item[ $2 ];
			}) ;
		el = $( '<div>' ).append( el ).addClass( 'kindItem clearfix' ).attr( 'href', '/kind/info?id='+item._id);
		item.el = el
		data.push( item );
		talkBox && talkBox.append( el );
		return el;

	}

   	function getLocal(){
		var param = location.search.slice(1).split('&');
		var p = {};
		for( var i = 0; c = param[i]; i++ ){
			var s = c.split('=');
			p[s[0]] = s[1];
		}
		return p;
	}

	function fetchKind( ){
		
		var param = getLocal();
		var data = getLocal();

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

	$( '#addKind' ).on( 'submit', function(){
		var data = {
			name: name.val(),
			index: index.val(),
			sort: sort.val(),
			amount: amount.val(),
			disabled: !!disabled.get(0).checked
		};

		$.ajax({
			url: basePath + '/addKind',
			type: 'post',
			dataType: 'json',
			data: data,
			success: function( ret ){
				if( ret.code == '0' ){
					render( ret.data,  kindBox )
				}
			}
		});
		return false;
	})

	!function(){
		fetchKind();
	}();
	

});

