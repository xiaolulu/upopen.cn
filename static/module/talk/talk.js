
require.config({
	map: {
		'*': {
			'css': './core/css.min'
		}
	},
	baseUrl: basePath,
	paths: {
		base: 'core/base',
		dialog: 'widget/dialog/dialog',
		all: 'public/js/all'
	}
})

define( ['base', 'dialog', 'doc', 'all'],function( base, Dialog, DOC ){
    
    var dialog = new Dialog.Dialog();

	var belong = 'thisismessage',
		content = $( '#talkcontent' ),
		talkBox = $( '#talkBox' ),
       talkAmount = $( '#talkAmount' ),
        formBtn = $('#form').find('button'),
		data = [],
		tmp = [ '<tt class="talkNum">{num}</tt>',
                    '<div class="talkHeader"><tt class="talkName">{name}</tt>--<span class="talkDate">{date}<span></div>',
                    '<p class="talkContent">{content}<p>' ].join('');

	function renderAll( items ){
		
		var els = [];
		$.each( items, function( k, v ){
			els.push( render( v ) );
		});	
		talkBox.append( els );
        
	}

	function render( item, talkBox ){
		
		item.num = data.length + 1;
        item.date = item.date.replace( 'T' , ' ' );
        item.name = item.name || '匿名';
		var el =  tmp.replace( /\{(.*?)\}/g, function( $1, $2 ){
				return item[ $2 ];
			}) ;
		el = $( '<div>' ).append( el ).addClass( 'talkItem clearfix');
		item.el = el
		data.push( item );
		talkBox && talkBox.append( el );
        talkAmount.html( talkAmount.html() - 0 + 1 );
		return el;

	}
    
    function submitTalk( belong ){
        $( '#form' ).on( 'submit', function(){
		    formBtn.attr( 'disabled', true );
		    var data = {
			    content: content.val(),
			    belong:         belong
		    };
		    $.ajax( {
			    url: basePath + '/addTalk',
			    type: 'post',
			    dataType: 'json',
			    data: data,
			    success: function( ret ){
				    if( ret.code == '0' ){
					    render( ret.data, talkBox );
                    content.val( '' );
				    }  else if( ret.code == '1001' ) {
                    dialog.show( '回复太频繁了，请稍后再试')
                   }  else if( ret.code == '1002' ) {
                    dialog.show( '内容不能为空')
                   }
                    formBtn.attr( 'disabled', false );
			    }
		    } );
		    return false;
	    } );
    }
	
   	
	function fetchTalk( belong ){
		
		var data = {
			belong: belong
		};

		$.ajax( {
			url: basePath + '/fetchTalk',
			type: 'get',
			dataType: 'json',
			data: data,
			success: function( ret ){
				if( ret.code == '0' ){
					renderAll( ret.data );
                submitTalk( belong )
				}
			}
		} );
		
	};

    function init( id ){
        fetchTalk( id )
    }
	
    return init

});

