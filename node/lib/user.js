
var http	= require( 'http' ),
	db		= require( '../db/sql' ),
	redis	= require( '../tool/redis' ),
	toy		= require( '../tool/toy' );

/***********************************************
User

************************************************/

function createSid( username ){
	return toy.md5( username + toy.getTime( 'millis') );
}

function redisSaveUser( data, res ){
	var user = {
			username: data.username,
			userId: data._id
		},
		sid = createSid( data.username );
	user = JSON.stringify( user );
	res.setHeader( 'Set-cookie', 'connectSid=' + sid );
	res.setHeader( 'Set-cookie', 'username=' + data.username );
	redis.set( sid, user );
}

var hostsDay = {};

function updateHostsDay(){
    var date = new Date();
    for( var ip in hostsDay ){
        if( date - hostsDay[ ip ].time > 60000 ){
            delete hostsDay[ip]
        }
    }
}

setInterval( updateHostsDay, 1000 );

function addUser( req, res ){

    var ip = toy.getClientIp( req );
	if( hostsDay[ ip ] && hostsDay[ip].count > 2 ){
		res.send( { code: 1005 , msg: 'register too often', data: null } );
		return;
	} else {
		if( hostsDay[ ip ] ){
            hostsDay[ ip ].count ++
        } else {
            hostsDay[ ip ] = {};
            hostsDay[ ip ].time = toy.getTime( { type: 'millis' } );
            hostsDay[ ip ].count = 1;
        }
	}
	
	var data = req.body;
	if( !data.username || data.username.length >= 50 || !/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test( data.username ) ){
		res.send( { code: 1001, msg: 'username error', data: null } );
        return;
	}

	if( !data.password || data.password >= 20 ){
		res.send( { code: 1002, msg: 'password error', data: null } );
        return;
	}
	data.date = new Date();
	data.disabled = false;
   	data.password = toy.md5( data.password );
	db.findUser( {username: data.username}, function( err, docs ){
		console.log( docs );
		if( docs.length > 0 ){
			res.send( { code: 1004, msg: 'user has be exist', data: docs } );
			return;
		}

		db.addUser( data, function( err, docs ){
			if( !err ){
				redisSaveUser( docs, res );
				res.send( { code: 0, msg: 'add user success', data: null } );
			}
		} );

	});
	

}

function findUser( req, res ){
    
    var data = req.query;
	if( !data.username || data.username.length >= 50 || !/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test( data.username ) ){
		res.send( { code: 1001, msg: 'username error', data: null } );
        return;
	}

	if( !data.password || data.password >= 20 ){
		res.send( { code: 1002, msg: 'password error', data: null } );
        return;
	}
    data.password = toy.md5( data.password );
    db.findUser( data, function( err, docs ){
	    
		if( docs.length ){
			redisSaveUser( docs[0], res );
			res.send( { code: 0, msg: 'find user success', data: docs } );
		} else {
			res.send( { code: 1003, msg: 'find user nothing', data: docs } );
		}
    } );

}

module.exports = {
	addUser:   addUser,
	findUser: findUser
}
