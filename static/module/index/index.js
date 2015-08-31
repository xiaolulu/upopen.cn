
require.config({
	map: {
		'*': {
			'css': './core/css.min'
		}
	},
	baseUrl: basePath,
	paths: {
        all: 'public/js/all'
	}
})

define( [ 'all' ], function(){
	
});

