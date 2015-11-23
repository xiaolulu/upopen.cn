var mongoose = require( 'mongoose' ),
	config   = require( '../config/server' );

var path = 'mongodb://' + config.host + '/' + config.db;
mongoose.connect( path, function( err ){
	if( !err ){
		console.log( 'connect to mongodb' );
	}
});

/**
model
*/
var Schema = mongoose.Schema;

var ActionSchema = new Schema({
	name: String,
	kind: String,
	description: String,
	url: String,
	method: Number,
	params: Object,
	owner: String,
	date: Date,
	sort: Number
});

var ActionModel = mongoose.model( 'action', ActionSchema, 'action' );

/**
method
*/

function createAction( data, cb ){
	console.log( data );
	( new ActionModel( data )).save( function( err, doc ){
		cb( err, doc );
	});
}

function fetchAction( data, cb ){
	console.log( data );
	ActionModel.find( data ).exec( function( err, docs ){
		console.log( docs );
		cb( err, docs );
	});
}

function updateAction( data, cb ){
	var id = data.id;
	delete data.id;
	ActionModel.update( {_id: data.id}, data, {}, function( err, docs ){
		cb( err, docs );
	})
}

function removeAction( data, cb ){
	ActionModel.remove( {_id: data.id}, function( err, docs ){
		cb( err, docs );
	})
}

module.exports = {
	createAction: createAction,
	fetchAction: fetchAction,
	updateAction: updateAction,
	removeAction: removeAction
}

