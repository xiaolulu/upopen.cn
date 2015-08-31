
require.config({
	map: {
		'*': {
			'css': './core/css.min'
		}
	},
	baseUrl: basePath,
	paths: {
        base: 'core/base',
        all: 'public/js/all',
        kind: 'public/js/kind',
        talk: 'public/js/talk'
	}
})

define( [ 'all' ], function(  ){
    
    $( '.infoname' ).append( $.cookies.get( 'username' ) );

});

