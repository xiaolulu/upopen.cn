
var mongoose	= require( 'mongoose' ),
	config		= require( '../config/server' ),
	toy			= require( '../tool/toy' );

var path = 'mongodb://' + config.mongodb.host + '/'  + config.mongodb.db;
mongoose.connect( path, function( err ){

	if( !err ){
		toy.log.info( 'connect to mongoDB success' );
	} else {
		toy.log.error( 'connect to mongoDB error ' + err );
		throw err;
	}

});

/***************************************************************/
/*model*/
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
	kind: String,
	title: String,
	description: String,
	content: String,
	author: String,
	tag: Array,
	date: Date,
	link: String,
	sort: Number,
	hot: Number,
	disabled: Boolean
});

var ArticleModel = mongoose.model( 'Article', ArticleSchema, 'Article' );

var KindSchema = new Schema({
	name: String,
	index: String,
	amount: Number,
	sort: Number,
	disabled: Boolean,
	date: Date
});

var KindModel = mongoose.model( 'kind', KindSchema, 'Kind' );

var TalkSchema = new Schema({
	belong: String,
	title: String,
	content: String,
	name: String,
	date:Date,
	link: String,
	sort: Number,
	hot: Number
});

var TalkModel = mongoose.model( 'talk', TalkSchema, 'talk' );

/***************************************************************/
/*sql*/
/******** Article *********/
function addArticle( data, callback ){

	( new ArticleModel( data ) ).save( function( err, doc ){
		callback( err, doc );
		if( err ){
			toy.log.err( 'db article save, err=' + err );
		} else {
			toy.log.info( 'db article save, doc=' + doc );
		}
	});
	

}

function updateArticle( data, callback ){

    var query = {},
          id;

	for( var key in data ){
        
		if( ArticleSchema.tree[ key ] ){
			query[ key ] = data[ key ];	
		};

	}

    query.tag = query.tag.split(',');
    id = query.id;
    delete query.id;

	ArticleModel.update( { _id: id }, query, function( err, doc ){
		callback( err, doc );
		if( err ){
			toy.log.err( 'db article update, err=' + err );
		} else {
			toy.log.info( 'db article update, doc=' + doc );
		}
	});
	
}

function fetchArticle( data, callback ){

	var query = {};

	for( var key in data ){
		if( ArticleSchema.tree[ key ] ){
			query[ key ] = data[ key ];	
		};
	}

	ArticleModel.find( query, { 'content': 0, 'type': 0, 'disabled': 0, 'sort': 0, 'type': 0  } ).
		sort( { 'sort': -1, 'date' : -1 } ).
		exec( function( err, docs ){
			callback( err, docs );
			if( err ){
				toy.log.err( 'db article update, err=' + err );
			} else {
				toy.log.info( 'db article update, doc.length=' + docs.length );
			}
		});

}

function fetchArticleAll( data, callback ){

	var query = {};

	for( var key in data ){
		if( ArticleSchema.tree[ key ] ){
			query[ key ] = data[ key ];	
		};
	}

	ArticleModel.find( query ).sort( { 'sort': -1, 'date' : -1 } ).exec( function( err, docs ){
		callback( err, docs )
	});

}

function fetchArticleByKind( data, callback ){

	var query = {};
	for( var key in data ){
		if( ArticleSchema.tree[ key ] ){
			query[ key ] = data[ key ];	
		};
	}
	ArticleModel.find( query, { 'content': 0, 'type': 0, 'disabled': 0, 'sort': 0, 'type': 0  } ).sort( { 'kind': 1, 'sort': -1, 'date' : -1 } ).exec( function( err, docs ){
		callback( err, docs )
	});

}

function fetchArticleInfo( data, callback ){
	
	var query = {};
	for( var key in data ){
		if( ArticleSchema.tree[ key ] ){
			query[ key ] = data[ key ];	
		};
	}
	
	ArticleModel.findOne( query ).exec( function( err, docs ){
		callback( err, docs )
	});
}

/***************************************************************/
/*sql*/
/******** Talk *********/
function addTalk( data, callback ){

	( new TalkModel( data ) ).save( function( err, doc ){
		callback( err, doc );
	});

}

function updateTalk( id, data, callback ){

	TalkModel.update( { _id: id }, data, function( err, docs ){
		callback( err, doc );
	});
	
}

function fetchTalk( data, callback ){

    var query = {};
	for( var key in data ){
		if( TalkSchema.tree[ key ] ){
			query[ key ] = data[ key ];	
		};
	}

	TalkModel.find( query ).exec( function( err, docs ){
		callback( err, docs )
	});
}

function fetchLastTalk( data, callback ){

    var query = {};
	for( var key in data ){
		if( TalkSchema.tree[ key ] ){
			query[ key ] = data[ key ];	
		};
	}

	TalkModel.find( query ).limit( 10 ).sort( { date: -1 } ).exec( function( err, docs ){
		callback( err, docs )
	});
}


/***************************************************************/
/*sql*/
/******** Kind *********/
function addKind( data, callback ){

	( new KindModel( data ) ).save( function( err, doc ){
		callback( err, doc );
	});

}

function updateKind( id, data, callback ){

	KindModel.update( { _id: id }, data, function( err, docs ){
		callback( err, doc );
	});
	
}

function fetchKind( data, callback ){

	var query = {};
	for( var key in data ){
		if( KindSchema.tree[ key ] ){
			query[ key ] = data[ key ];	
		};
	}
	KindModel.find( query ).sort( {  "sort":1 } ).exec( function( err, docs ){
		callback( err, docs );
	});

}

function incKind( index, amount, callback ){

	KindModel.update( { "index": index }, { $inc: { "amount": amount } }, function( err, docs ){
		callback( err, docs );
	});

}

/****************************************************************/
/*exports*/
module.exports = {

	addKind: addKind,
	updateKind: updateKind,
	fetchKind: fetchKind,
	incKind: incKind,

	addArticle:    addArticle,
	updateArticle: updateArticle,
	fetchArticle:   fetchArticle,
    fetchArticleByKind: fetchArticleByKind,
	fetchArticleInfo: fetchArticleInfo,
	fetchArticleAll: fetchArticleAll,
	addTalk:    addTalk,
	updateTalk: updateTalk,
	FetchTalk:   fetchTalk,
    FetchLastTalk: fetchLastTalk

}
