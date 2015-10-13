
require.config({
	baseUrl: basePath,
	paths: {
		all: 'public/js/all',
	}
})
define(['all'], function(){

	var username = $( '#username'),
		code = $( '#code' ),
		grid = $( '#userList' ),
		mask = $( '.mask' ),
		Data = window.Data = {},
		PData = {};

	function JsonLength( Data ){
		var i = 1;
		for( var p in Data ){
			++i;
		}
		return i;
	}
	
	function addUser(){

		var data = {
			username: username.val(),
			code: code.val()
		};

		$.ajax({
			url: '/user/addUser',
			type: 'post',
			dataType: 'json',
			data: data,
			success: function( ret ){
				if( ret.code == 0 ){
					ret.data.index = JsonLength( Data );
					render( ret.data );
					alert( '添加成功' );
				}
			}
		})

	}

	$( '#userForm' ).on( 'submit', function(){
		addUser();
		return false;
	})

	$( '#addUserClose' ).on( 'click', function(){
		$( '.addUser' ).hide(); 
		mask.hide()
	})
   
	function fetchUser( key ){

		key = key || '';		

		$.ajax({
			url: '/user/fetchUsers',
			type: 'get',
			dataType: 'json',
			data: { key: key },
			success: function( ret ){
				if( ret.code == 0 ){
					renderList( ret.data );
				}
			}
		})

	}

	var tmp = ['<td>{index}</td>',
				'<td>{code}</td>',
				'<td>{username}</td>',
				'<td><a href="javascript: void(0);" class="point">查看</a></td>',
				'<td>{date}</td>',
				'<td><a href="javascript:void(0);" class="del">删除</a></td>'].join('');


	function renderList( items ){

		$.each( items, function( index, item ){
			item.index = index + 1;
			render( item );			
		});
	}

	function render( item ){
		var tr = $( '<tr>' );
		item.point = item.point || 0;
		item.date = item.date.replace( /[T|Z]/g, ' ');
		tr.html( tmp.replace( /\{(.*?)\}/g, function( $1, $2 ){
				return item[ $2 ];
			}));
		item.el = tr;
		Data[ item['_id'] ] = item;
		tr.find( '.del' ).on( 'click', function(){
			$.ajax({
				url: '/user/removeUser',
				type: 'post',
				data: { '_id': item[ '_id' ] },
				dataType: 'json',
				success: function( ret ){
					if( ret.code == 0 ){
						tr.remove();
						delete Data[ item[ '_id' ] ];
					}
				}
			})
		});
		tr.find( '.point' ).on( 'click', function(){
			pointShow( item )
		});
		grid.append( tr );
	}

	function pointShow( item ){
		userid.val( item._id );
		$( '#pointUser' ).html( item.username );
		$( '#pointCode' ).html( item.code );
		$.ajax({
			url: '/user/fetchPoint',
			type: 'get',
			dataType: 'json',
			data: { userid: item._id },
			success: function( ret ){
				if( ret.code == 0 ){
					renderPointList( ret.data );
				}
			}
		})
		$( '.pointList' ).show();
		mask.show();
	}

	$( '.pointListClose' ).on( 'click', function(){
		$( '.pointList' ).hide();
		$( '#pointList' ).html('');
		$( '#pointAll' ).html('');
		mask.hide();
	})

	var ptmp = ['<td>{index}</td>',
				'<td>{point}</td>',
				'<td>{date}</td>'].join('');

	function renderPointList( items ){

		$.each( items, function( index, item ){
			item.index = index + 1;
			renderPoint( item );			
		});
	}

	function renderPoint( item ){
		var tr = $( '<tr>' );
		item.point = item.point || 0;
		item.date = item.date.replace( /[T|Z]/g, ' ');
		tr.html( ptmp.replace( /\{(.*?)\}/g, function( $1, $2 ){
				return item[ $2 ];
			}));
		item.el = tr;
		PData[ item['_id'] ] = item;
		tr.find( '.del' ).on( 'click', function(){
			$.ajax({
				url: '/user/removeUser',
				type: 'post',
				data: { '_id': item[ '_id' ] },
				dataType: 'json',
				success: function( ret ){
					if( ret.code == 0 ){
						tr.remove();
						delete PData[ item[ '_id' ] ];
					}
				}
			})
		});
		$( '#pointAll' ).html( $( '#pointAll' ).html() - 0 + item.point );
		$( '#pointList' ).prepend( tr );
	}

	var point = $( '#point' ),
		userid = $( '#userid' );

	$( '#addPoint' ).on( 'submit', function(){

		var data = {
			point: point.val(),
			userid: userid.val()
		};

		$.ajax({
			url: '/user/addPoint',
			type: 'post',
			dataType: 'json',
			data: data,
			success: function( ret ){
				if( ret.code == 0 ){
					ret.data.index = JsonLength( PData );
					renderPoint( ret.data );
					alert( '添加成功' );
				}
			}
		});
		return false;

	})

	function alert( txt ){
		$( '.prompt' ).html( txt ).show();
		setTimeout( function(){
			$( '.prompt' ).html( '' ).hide();
		}, 2000 );
	}

	!function(){
		fetchUser();
		$( '#newUser' ).on( 'click', function(){ $( '.addUser' ).show(); mask.show() });
	}();

	

});
