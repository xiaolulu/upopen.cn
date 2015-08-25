
require.config({
	map: {
		'*': {
			'css': './core/css.min'
		}
	},
	paths: {
		'base': './core/base',
	}
});

define( ['base' ], function( base ){

	var Dialog = function( config ){
	
		this.config = base.apply( {}, this.defaults, config );
		this.hidden = true;
		this.init( this.config );
	
	};

	base.apply( Dialog.prototype, {
	
		defaults: {
			title: {
					'error': '唔，出错了',
					'warning': '警告',
					'prompt': '提示'
				},
			btns: ['确定','取消'],
			type: 'error',
			content: '您确认这样做吗!',
			renderTo: $( 'body' )
		},

		init: function( config ){
			var el = this.render( config );
			this.config.renderTo.append( el );
		},

		render: function( config ){

			this.el = $( '<div>' ).addClass( 'w_dialog w_dialog_' + config.type );
			this.el.append( [this.createHeader( config.title[ config.type ], config.type ), this.createBody( config), this.createFooter( config ) ] );
			this.createMask();
			this.handler();
			return this.el;

		},

		createHeader: function( title, type ){

			return this.header = $( '<div>' ).addClass( 'w_dialog_header w_dialog_header_' + type ).html( title );
			
		},

		createBody: function( config ){
			
			this.content = $( '<p>' ).addClass( 'w_dialog_content' ).html( config.content );
			this.body = $( '<div>' ).addClass( 'w_dialog_body' );
			return this.body.append( this.content );

		},

		createFooter: function( config ){
			
			var me = this;
			this.footer = $( '<div>' ).addClass( 'w_dialog_footer' );
			var btns = [ 'sure', 'cancel' ]
			$.each( config.btns, function( k, v ){
				me.footer.append( me[btns[k]] = $( '<button>' ).addClass( 'w_dialog_btn w_dialog_btn_' + btns[k] ).html( v ) );
			});
			return this.footer
				
		},

		handler: function(){
			
			var me = this;
			this.sure.on( 'click', function(){
				me.hide();
			} );

			this.cancel.on( 'click', function(){
				me.hide();
			} );

		},

		createMask: function(){

			var mask = $( '.w_dialog_mask' );
			if( mask.length ){
				this.mask = mask;
			} else {
				$( 'body' ).append( this.mask = $( '<div>' ).addClass( 'w_dialog_mask' ) );
			}

		},

		setContent: function( text, code ){
			this.content.html( text ).attr( 'code', code );
		},
		
		show: function( text, code ){
			
			this.setContent( text || this.config.content, code || 0 );
			this.el.fadeIn();
			this.mask.fadeIn();
			this.hidden = false;

		},

		hide: function(){
			
			this.el.hide();
			this.mask.fadeOut();
			this.hidden = true;

		}

	} );

	return {
		Dialog: Dialog
	}
	
} );