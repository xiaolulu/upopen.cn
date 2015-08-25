
var http	= require( 'http' ),
	db		= require( '../db/sql' ),
	toy		= require( '../tool/toy' );

/***********************************************
talk
updateHostsDay:		计数提交评论的频率，一小时内最多能提10条评论
addTalk:			新闻评论
fetchtalk:			获取评论
************************************************/

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

function addTalk( req, res ){

    var ip = toy.getClientIp( req );
	if( hostsDay[ ip ] && hostsDay[ip].count > 10 ){
		res.send( { code: 1002 , msg: 'talk too often', data: null } );
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
    
    if( data.content.length > 200 ){
        res.send( { code: 1001, msg: 'talk content to length', data: null } );
        return;
    }
    if( data.content.length == 0 ){
        res.send( { code: 1002, msg: 'talk content must be in', data: null } );
        return;
    }
	data.hot = 0;
	data.date = new Date();
	data.sort = 1;
	data.title = '';
   	
	db.addTalk( req.body, function( err, docs ){
		if( !err ){
			res.send( { code: 0, msg: 'add talk success', data: docs } );
		}
	} );

}

function fetchTalk( req, res ){
    
    var data = req.query;
    if( data.start ){
        db.FetchLastTalk( data,  function( err, docs ){
		    if( !err ){
			    res.send( { code: 0, msg: 'find talk success', data: docs } );
		    }
	    } );
    } else {
        db.FetchTalk( data, function( err, docs ){
		    if( !err ){
			    res.send( { code: 0, msg: 'find talk success', data: docs } );
		    }
	    } );
    }

}

module.exports = {
	addTalk:   addTalk,
	fetchTalk: fetchTalk
}
