
require.config({
	baseUrl: basePath,
	paths: {
		base: 'core/base'
	}
})

define([ 'base' ], function( base ){

	var Regular = {
	
		noBlank: function( value ){
			return !!value;
		},

		min: function( value, rule ){
			return value.length >= rule;
		},

		max: function( value, rule ){
			return value.length <= rule;
		},

		typeZh: function( value ){
			return /^[\u4E00-\u9FA5\uf900-\ufa2d]+$/.test( value );
		},
		
		typeZE: function( value ){
			return /^[\u4E00-\u9FA5\uf900-\ufa2d|a-z|A-Z]+$/.test( value );
		},

		typeEN: function( value ){
			return /^[0-9|a-z|A-Z]+$/.test( value );
		},

		typeNum: function( value ){
			return /^[0-9]+$/.test( value );
		},

		typePhone: function( value ){
			return /^1[0-9]{10}$/.test( value );
		},

		typeEmail: function( value ){
			return true;
		},

		typeIdCard: function( value ){
			return true;
		}

	}

	function check( rules, cb ){
	
		var rule,
			prompt,
			codex,
			value = this.value;
		for ( rule in rules ){

			prompt = rules[ rule ];
			base.isArray( prompt ) && ( codex = prompt[0] ) && ( prompt = prompt[1] );

			if( rule == 'self' ){
				if( rules[ rule ].call( this, cb ) !== true ){
					return false;
				};
			} else if( !Regular[ rule ]( value, codex ) ){
				cb( prompt )
				return false;
			}
			cb( '' );
		}
		return true;

	}

	function validate( el, events, rules, cb ){
		
		if( rules ){

			cb = rules[1];
			rules = rules[0];
			$.each( events, function( k, event ){
				el.on( event, function(){
					check.call( this, rules, cb );
				});

			});
		
		} else {
			
			cb = events[1];
			rules = events[0];
			return check.call( el.get( 0 ), rules, cb );
		
		}

	}
	
	return validate

})