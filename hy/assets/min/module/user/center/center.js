define( 'all',[],function(){
    var username = $.cookies.get( 'username' );

    if( username ){
          $( '.afterLogin' ).show();
        $( '.menu_username' ).html( username );
    } else {
        $( '.beforeLogin' ).show();
    }
})
;

require.config({
	baseUrl: basePath,
	paths: {
		all: 'public/js/all',
	}
})
define('center',['all'], function(){
   
});

