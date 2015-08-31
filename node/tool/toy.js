
var log4js       = require( 'log4js' ),
	qs           = require( 'querystring'),
	http         = require( 'http' ),
	crypto       = require( 'crypto' ),
	server       = require( '../config/server' ).server,
	domain       = require('domain'),
	BufferHelper = require( 'BufferHelper' );

var logConfig = {

	"appenders":[
		{"type": "console","category":"console"},
		{
			"type": "dateFile",
			"filename":"./log/",
			"pattern":"yyyyMMdd.log",
			"absolute":true,
			"alwaysIncludePattern":true,
			"category":"logInfo"
		}
	],
	"levels":{"logInfo":"DEBUG"}

};

log4js.configure( logConfig );

var logInfo = log4js.getLogger('logInfo');

var Domain = domain.create();

Domain.on( 'error', function( e ){

	toy.log.error( 'http request: error=' + e );

});

function getCookie( cookie, name ){

	try{

		var cs = cookie.split(';'),
			c,
			item;
		for( var i = 0; i < cs.length; i++ ){
			c = cs[i];
			item = c.split('=');
			if( item[0].trim() == name ){
			    return item[1];
			}
		}

	} catch( e ){
		
		logInfo.error( 'getCookie: error=' + e );
		return false;

	}
    
};

/******************************* pad *************************************/
function pad( str, len, pack ){

	return ( new Array( len - ( str + '' ).length + 1 ).join( pack || '0' ) ) + str;

}

/******************************* md5 *************************************/
var md5 = function(data) { 
	
    return crypto.createHash('md5').update(data).digest('hex').toLowerCase();  

} 



function getTime( config ){
	
	config = config || {};
	var date = new Date,
		y = pad( date.getFullYear(), 4 ),
		m = pad( date.getMonth() + 1, 2 ),
		d = pad( date.getDate(), 2 ),
		h = pad( date.getHours(), 2 ),
		mi = pad( date.getMinutes(), 2 ),
		s = pad( date.getSeconds(), 2 );
	if( config.type == 'day' ){
		return [y, m, d].join( config.join || '-' );
	} else if( config.type == 'millis' ){
		return date.getTime();
	}
	return [y, m, d].join( config.join || '-' ) + ' ' + [ h, mi, s].join( config.joinH || ':' );

}

function getClientIp( req ) {

	return req.headers['x-forwarded-for'] ||
	req.connection.remoteAddress ||
	req.socket.remoteAddress ||
	req.connection.socket.remoteAddress;

};

/******************************* reqConfig ***************************************/
function reqConfig( config, req, res, callback ){

	req.headers.host = server.hostname;
	
	var method = config.method || 'POST';

	var	path   = config.path + ( ( method.toUpperCase() == 'GET' ) ? '?' + qs.stringify( req.query ) : '' );

	if( method.toUpperCase() == 'POST' ){

		req.headers['content-length'] = qs.stringify(req.body).length;

	}
	var options = {
			host     : server.host,
			port     : server.port,
			path     : path,
			method   : method,
			headers  : req.headers
		},
		bufferData = new BufferHelper(),
		httpreq;

	Domain.run( function(){
	
		httpreq = http.request( options, function( httpres ) {

			var cookie = httpres.headers[ 'set-cookie' ];

			console.log( cookie );
			cookie && res.setHeader( 'Set-Cookie', cookie );

			httpres.on( 'data', function ( data ) {

				bufferData.concat( data );

			} );

			httpres.on( 'end', function(){
				
				toy.log.info( 'http request: ret=' + bufferData.toBuffer().toString() );
				callback( bufferData );
				

			});

		} );
	
	} );
	
	httpreq.on('error', function(e) {

		ctoy.log.info( 'http request: error=' + e );

	});

	httpreq.write( qs.stringify( req.body ) );

	httpreq.end();

	toy.log.info( 'http request: option=' + JSON.stringify( options ) );

}

module.exports = {

    getCookie: 		getCookie,
	reqConfig: 		reqConfig,
	log: 			logInfo,
	getTime:		getTime,
	md5:			md5,
	getClientIp:	getClientIp

}
