var db = require( '../db/sql' ),
	crypto = require( 'crypto' );

var md5 = function(data) { 
	
    return crypto.createHash('md5').update(data).digest('hex').toLowerCase();  

} 
function addUser( req, res ){
    var data = req.body;
    data.date = new Date();
	data.point = 0;
    db.addUser( data, function( err, doc ){
        if( !err ){
            res.send( { code: 0, msg: 'add User Success', data: doc } );
        }
    })
}

function findUser( req, res ){
    var data = req.body;
    db.findUser( data, function( err, doc ){
        if( !err ){
            res.send(  { code: 0, msg: 'find User Success', data: doc }  );    
        }
    })
}

function removeUser( req, res ){
	var data = req.body;
	db.removeUser( data, function( err, doc ){
        if( !err ){
            res.send(  { code: 0, msg: 'remove User Success', data: doc }  );    
        }
    })
}

function addPoint( req, res ){
    var data = req.body;
	console.log( '================' );
	console.log( data );
    data.date = new Date();
    db.addPoint( data, function( err, doc ){
        if( !err ){
            res.send( { code: 0, msg: 'add Point Success', data: doc } );
			db.updateUserPoint( { _id: data.userid, point: data.point }, function(){} );
        }
    })
}

function findPoint( req, res ){
    var data = req.query;
    db.findPoint( data, function( err, doc ){
        if( !err ){
            res.send(  { code: 0, msg: 'find Point Success', data: doc }  );    
        }
    })
}

function updatePoint( req, res ){
	var data = req.body;
	db.updatePoint( data, function( err, doc ){
        if( !err ){
            res.send(  { code: 0, msg: 'update Point Success', data: doc }  );    
        }
    })
}

module.exports = {
    addUser: addUser,
    findUser: findUser,
	removeUser: removeUser,
	addPoint: addPoint,
	findPoint: findPoint,
	updatePoint: updatePoint
}
