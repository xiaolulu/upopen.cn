var mysql = require( 'mysql' ),
	config = require( '../config/server' ).sql;

var options = {
	host: config.host,
	port: config.port,
	user: config.user,
	password: config.password,
	database: config.database
}

var client = new mysql.createConnection( options );
client.connect();
function query( sql, value, cb ){
	if( Object.prototype.toString.call( value ) == '[object Function]' ){
		cb = value;
		client.query( sql, cb );
	} else {
		client.query( sql, value, cb );
	}	
}

function format( data, DB, type ){
	try{

		var _where = '',
			_limit = '',
			_update = '',
			s = '';
		
		if( isNaN( data.start - 0 ) ){
			data.start = 0;
		}

		if( isNaN( data.pageSize - 0 ) ){
			data.pageSize = 15;
		}

		_limit = ' limit ' + ( data.start || 0 ) + ', ' + ( data.pageSize || 15 );

		delete data.start;
		delete data.pageSize;
		
		var _db = DB.params;
		/*
		for( var key in data ){
			if( !_db[ key ] ){
				delete data[ key ];
				continue;
			}
			if( data[ key ].length > _db[ key ] ){
				data[ key ] = data[ key ].slice( 0, _db[ key ] );
			}
			data[ key ] = mysql.escape( data[ key ] );
		}
		*/
		//data = tool.escape( data );

		if( type == 'update' ){
			for( var key in data ){
				s ? s += ', ': s;
				s +=  key + '=' + data[key] + '';
			}
			_update = s;
		} else {
			for( var key in data ){
				s ? s += ' and ': s;
				s += '' + key + '=' + data[key] + '';
			}
			_where = s ? ' where ' + s : s ;
		}
		return { where: _where, limit: _limit, update: _update };
	
	} catch (e){
		
	}
}

/**
user
*/
var User = {
	params: [ 'id', 'username', 'password', 'date' ]
};

User.save = function(data, cb ){
	var sql = 'insert into user (' + User.params.join( ',') + ') values (?,?,?,?)',
		value = [ data.id, data.username, data.password, data.date ];
	query( sql, value, cb );
}

User.fetch = function( data, cb ){
	var condition = format( data, User, 'where' );
	var sql = 'select * from user ' + condition.where;
	query( sql, cb )
}

var user = {
	create: User.save,
	fetch: User.fetch
}

module.exports = {
	user: user
}
