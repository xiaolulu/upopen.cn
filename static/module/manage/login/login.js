
require.config({
	map: {
		'*': {
			'css': './core/css.min'
		}
	},
	baseUrl: basePath,
	paths: {
		md5: 'core/js/md5'
	}
})

define( [ 'md5' ], function( MD5){
    
   $( '#loginForm' ).on( 'submit', function(){
		
		var username = $( '#l_username' ),
			password = $( '#l_password' );
		
		var data = {
			username: MD5.hex_md5( username.val() ),
			password: MD5.hex_md5( password.val() )
		}	
	
		$.ajax({
			url: '/manage/loginIn',
			type: 'post',
			data: data,
			dataType: 'json',
			success: function( ret ){
				if( ret.code == '0' ){
					window.location.href = '/manage/list';
				} else {
					alert( '用户名或密码错误' );
				}
			}
		});
		return false;		

	});

});

