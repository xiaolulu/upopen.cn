/*******************************************************/
var client     = null, 
	domain     = require('domain'),
	mysqlModel = require('mysql'), 
	uid        = require('../controls/uuid'),
	tool       = require('../controls/tool');

var d = domain.create();

d.on( 'error', function( e ){
	console.log(' mysql async =======================');
	tool.logInfo.error( e );
	console.log( e );
});

var db = {
	host:     'localhost',   
	port:     '3306',
	user:     'root',
	password: '123456',
	database: 'qjddb'
}


var dataBase = {
	member : {
		id       : 50,
		phone    : 11,
		password : 50,
		name     : 50,
		province : 10,
		city     : 10,
		strict   : 10,
		address  : 50,
		date	 : 10
	},
	parters : {
		id       : 50,
		phone    : 11,
		company  : 100,
		model    : 10,
		status   : 2,
		date     : 10,
		annex    : 100
	},
	loan : {
		id                 : 50,
		provinceCode       : 10,
		cityCode           : 10,
		project            : 100,
		propertyDeveloper  : 100,
		contractAmount     : 10,
		loanAmount         : 10,
		loanLimit          : 10,
		loanNo             : 50,
		model              : 10,
		partner            : 100,
		phone              : 11,
		status             : 1,
		date               : 10
	}
}


/*******************************************************/
function getDbCon(){

	try {
		if( client ){
			client = mysqlModel.createConnection( db );
		} else {
			client = new mysqlModel.createConnection( db );
		}
		client.connect();
		console.log( 'mysql connect');
	} catch ( e ) {
		tool.logInfo.error(' mysql connect =======================');
		tool.logInfo.error( e );
		throw e;
	}
	return client;

};

var mysql = getDbCon();

function formatQuery( data, config ){
	try{ 

		var _where = '',
			_limit = '',
			_update = '',
			s = '',
			config = config || {};

		delete data.__proto__;
		
		if( isNaN( data.start - 0 ) ){
			data.start = 0;
		}

		if( isNaN( data.pageSize - 0 ) ){
			data.pageSize = 15;
		}

		_limit = ' limit ' + ( data.start || 0 ) + ', ' + ( data.pageSize || 15 );

		delete data.start;
		delete data.pageSize;
		
		var _db = dataBase[ config.base ];
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

		//data = tool.escape( data );

		if( config.type == 'update' ){
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
		tool.logInfo.error(' mysql formatQuery =======================');
		tool.logInfo.error( e );
	}
}

function sqlQuery( sql, c, callback ){
	callback = callback || function(e){console.log(e)};
	if( Object.prototype.toString.call( c ) ==  '[object Function]' ){
		callback = c;
	}
	
	var cb = function( err, results, fields ){

			if( err ){
				callback( err );
				throw err;
			} else {
				if( !results.length && c ){
					results.id = c[0];
				}
				return callback( err, results, fields );
			}
		}
	
	try{
		if( Object.prototype.toString.call( c ) ==  '[object Function]' ){
			d.run( function(){mysql.query( sql, cb )});
		} else {
			console.log( sql );
			console.log(c );
			d.run( function(){mysql.query( sql, c, cb)});
		}
	
	} catch(e){
		tool.logInfo.error(' mysql sqlQuery =======================');
		tool.logInfo.error( e );
		//console.log( 'err:=====================' + ':' + e );
		//console.log( sql );
	}
	

}

/*******************************************************/
var Member = {
		id       : 50,
		phone    : 11,
		password : 50,
		name     : 50,
		province : 10,
		city     : 10,
		strict   : 10,
		address  : 50,
		date	 : 10
};
/*** add role to db ***/
Member.save = function( config, callback ){
	console.log( config );
	var sql = "insert into member ( id,phone,password,name,province,city,strict,address, date ) values( ?,?,?,?,?,?,?,?,? )",
		value = [ uid.v4(), config.phone, config.password, config.name, config.province,config.city, config.strict, config.address, config.date ];
	
	sqlQuery( sql, value, callback );

}

/*** fetch role from db ***/
Member.get = function get( config, callback ){

	var sql = "select * from member " + config.where + '  order by date desc ' + config.limit; 
	console.log( sql )
	sqlQuery( sql, callback );

}

/*** fetch count for all roles from db ***/
Member.count = function get( config, callback ){
	
	var sql = "select count(*) from member " + config.where; 
	sqlQuery( sql, callback );

}

/*** delete one role from db ***/
Member.del = function get( config, callback ){

	var sql = "delete from member " + config.where;
	
	sqlQuery( sql, callback );

}

/*** update one role from db ***/
Member.update = function( config, id, callback ){
	
	var sql = 'update member set ' + config.update + ' where id = ' + id;
	sqlQuery( sql, callback );

}

/*************************/
function addMember( data, callback ){
	//console.log( data );
	Member.save( data,  callback);

}



function findMember( data, callback ){
	
	Member.get( formatQuery( data, { base: 'member' } ), callback );

}

/*******************************************************/
var Parter = {
		id       : 50,
		phone    : 11,
		company  : 100,
		model    : 10,
		status   : 2,
		date     : 10,
		annex    : 100
};
/*** add role to db ***/
Parter.save = function( config, callback ){
	console.log( config );
	var sql = "insert into parters ( id,phone,company,model,status,date,annex ) values( ?,?,?,?,?,?,? )",
		value = [ uid.v4(), config.phone, config.company, config.model, config.status,config.date, config.annex ];
	
	sqlQuery( sql, value, callback );

}

/*** fetch role from db ***/
Parter.get = function get( config, callback ){

	var sql = "select * from parters " + config.where + '  order by date desc ' + config.limit; 
	console.log( sql )
	sqlQuery( sql, callback );

}

/*** fetch count for all roles from db ***/
Parter.count = function get( config, callback ){
	
	var sql = "select count(*) from parters " + config.where; 
	sqlQuery( sql, callback );

}

/*** delete one role from db ***/
Parter.del = function get( config, callback ){

	var sql = "delete from parters " + config.where;
	
	sqlQuery( sql, callback );

}

/*** update one role from db ***/
Parter.update = function( config, id, callback ){
	
	var sql = 'update parters set ' + config.update + ' where id = ' + id;
	sqlQuery( sql, callback );

}

/*************************/
function addParter( data, callback ){
	//console.log( data );
	Parter.save( data,  callback);

}



function findParter( data, callback ){
	
	Parter.get( formatQuery( data, { base: 'parters' } ), callback );

}
/*
function updateRole( data, callback ){

	Role.update( formatQuery( data, { base: 'role', type: 'update' } ), data.id, function( err, docs ){

		callback( err );

	});
	
}

function deleteRole( data, callback ){

	Role.del( formatQuery( data, { base: 'role' } ), callback );

}


function findRoleCount( data, callback ){
	
	Role.count( formatQuery( data, { base: 'role' } ), callback );

}

*/

/*******************************************************/
var Loan = {
		
};
/*** add role to db ***/
Loan.save = function( config, callback ){
	console.log( config );
	var sql = "insert into loan ( id,provinceCode,cityCode,projectName,propertyDeveloper,contractAmount,loanAmount,loanLimit, loanNo, model, partner, date, phone, status ) values( ?,?,?,?,?,?,?,?,?,?,?,?,?,? )",
		value = [ uid.v4(), config.provinceCode, config.cityCode, config.projectName, config.propertyDeveloper,config.contractAmount, config.loanAmount, config.loanLimit, config.loanNo, config.model, config.partner, config.date, config.phone, config.status ];
	console.log( sql );
	console.log( value );
	sqlQuery( sql, value, callback );

}

/*** fetch role from db ***/
Loan.get = function( config, callback ){

	var sql = "select * from loan " + config.where + '  order by date desc ' + config.limit; 
	console.log( sql )
	sqlQuery( sql, callback );

}

/*** fetch count for all roles from db ***/
Loan.count = function( config, callback ){
	
	var sql = "select count(*) from loan " + config.where; 
	sqlQuery( sql, callback );

}

/*** delete one role from db ***/
Loan.del = function( config, callback ){

	var sql = "delete from loan " + config.where;
	
	sqlQuery( sql, callback );

}

/*** update one role from db ***/
Loan.update = function( config, id, callback ){
	
	var sql = 'update loan set ' + config.update + ' where id = ' + id;
	sqlQuery( sql, callback );

}

/*************************/
function addLoanApply( data, callback ){
	//console.log( data );
	Loan.save( data,  callback);

}



function fetchLoanList( data, callback ){
	
	console.log( '/fetchLoanList'  + 'db' );
	Loan.get( formatQuery( data, { base: 'loan' } ), callback );

}
/****************************************************************/
/*exports*/
module.exports = {

	addMember:     addMember,
	findMember: findMember,
	addParter: addParter,
	findParter: findParter,
	fetchLoanList: fetchLoanList,
	addLoanApply: addLoanApply
}
