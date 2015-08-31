
require.config({
	map: {
		'*': {
			'css': './core/css.min'
		}
	},
	baseUrl: basePath,
	paths: {
		base: 'core/js/base',
		md5: 'core/js/md5',
		doc: 'public/js/zhdoc'
	}
})

define( ['base', 'doc', 'md5'],function( base, DOC, MD5 ){
	
	$.ajaxSetup( { cache: false } );

	try{
		var path = {
			'/': '0',
			'/index': '0',
			'/article/info': '1',
			'/article/list': '1',
			'/article/edit': '3'
		}[$( 'body' ).attr( 'page' ).replace( /(\/[a-z]+)$/,'')]
	
		//navigator current status
		$( $( '.my_menu li' )[ path ] ).addClass( 'active' );
	} catch(e){}

	$( '#registerForm' ).on( 'submit', function(){
		
		var username = $( '#r_username' ),
			password = $( '#r_password' );
		
		var data = {
			username: username.val(),
			password: MD5.hex_md5( password.val() )
		}

		if( !data.username || !/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test( data.username ) ){
			alert( '用户名请输入邮箱' );
			return false;
		}

		if( !password.val().trim() ){
			alert( '请输入密码' );
			return false;
		}
	
		$.ajax({
			url: '/register',
			type: 'post',
			data: data,
			dataType: 'json',
			success: function( ret ){
				if( ret.code == '0' ){
					$( '#userModal' ).modal( 'hide' )
					$( '.beforeLogin' ).addClass( 'hide' );;
					$( '.afterLogin' ).removeClass( 'hide' );
					$( '#userbarUsername' ).html( username.val() );
					return;
				}
				alert( DOC.errorCode[ ret.code ] );
			}
		});
		return false;		

	});

	$( '#loginForm' ).on( 'submit', function(){
		
		var username = $( '#l_username' ),
			password = $( '#l_password' );
		
		var data = {
			username: username.val().trim(),
			password: MD5.hex_md5( password.val().trim() )
		}

		if( !data.username || !/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test( data.username ) ){
			alert( '用户名请输入邮箱' );
			return false;
		}

		if( !password.val().trim() ){
			alert( '请输入密码' );
			return false;
		}
	
		$.ajax({
			url: '/login',
			type: 'get',
			data: data,
			dataType: 'json',
			success: function( ret ){
				if( ret.code == '0' ){
					$( '#userModal' ).modal( 'hide' )
					$( '.beforeLogin' ).addClass( 'hide' );;
					$( '.afterLogin' ).removeClass( 'hide' );
					$( '#userbarUsername' ).html( username.val() );
					return;
				}
				alert( DOC.errorCode[ ret.code ] );
			}
		});
		return false;		

	});

	$( '.mask' ).on( 'click', function(){
		$( '.userBox' ).fadeOut();
		$( '.mask' ).fadeOut();
	});

	$( '#toRegister' ).on( 'click', function(){
		$( '.userModal .modal-title' ).html( '用户 - 注册' );
		$( '#loginForm' ).addClass( 'hide' );
		$( '#registerForm' ).removeClass( 'hide' );
	});

	$( '#toLogin' ).on( 'click', function(){
		$( '.userModal .modal-title' ).html( '用户 - 登录' );
		$( '#registerForm' ).addClass( 'hide' );;
		$( '#loginForm' ).removeClass( 'hide' );
	});

	$( '.toReg' ).on( 'click', function(){
		
		$( '.userModal' ).addClass( 'tada' );
		setTimeout( function(){
			$( '.userModal .modal-title' ).html( '用户 - 注册' );
			$( '#loginForm' ).addClass( 'hide' );
			$( '#registerForm' ).removeClass( 'hide' );
		}, 500 );

		setTimeout( function(){
			$( '.userModal' ).removeClass( 'tada' );
		}, 1400 );
	});

	$( '.toLog' ).on( 'click', function(){
		
		$( '.userModal' ).addClass( 'tada' );
		setTimeout( function(){
			$( '.userModal .modal-title' ).html( '用户 - 登录' );
			$( '#loginForm' ).removeClass( 'hide' );
			$( '#registerForm' ).addClass( 'hide' );
		}, 500 );

		setTimeout( function(){
			$( '.userModal' ).removeClass( 'tada' );
		}, 1400 );

	});

	$( '#toLogout' ).on( 'click', function(){
		$( '.beforeLogin' ).removeClass( 'hide' );
		$( '.afterLogin' ).addClass( 'hide' );;
		$( '#userbarUsername' ).html( '' );
		$.ajax({
			url: '/logout',
			type: 'post',
			data: {},
			dataType: 'json',
			success: function( ret ){
				window.location.href="/index";
			}
		});
	})


	!function(){

		var name = $.cookies.get('username');
		if( name ){
			$( '.afterLogin' ).removeClass( 'hide' );
			$( '#userbarUsername' ).html( name );
		} else {
			$( '.beforeLogin' ).removeClass( 'hide' );
		}

	}();

	
});
