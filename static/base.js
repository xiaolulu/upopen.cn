/**
 * @module base 
 */

define(function(){
	
	/**
	 * @method trim 清除字符串两边的空格
	 * @param  {[text]} 需要操作的string
	 * @return {[String]}  操作完成的string
	 */
	String.prototype.trim = String.prototype.trim || function(){

		return this.replace(/^\s*/,'').replace(/\s*$/,'');

	}
	
	/**
	 * @method extend 为source对象增加属性
	 * @param  {[source, part]} 需要操作的string
	 * @return {[String]}  操作完成的string
	 */
	function extend( source ){
		
		var args = Array.prototype.slice.call( arguments, 1 ),
			c;
		
		while( c = args.shift()){
			for( var key in c ){
				source[key] = c[key]
			}
		}

		return source;

	}
	
	/*
	apply
	将除source外的其它参数的属性，复制给source
	*/
	function apply( source ){
		
		var args = Array.prototype.slice.call( arguments, 1 ),
			c;
		
		while( c = args.shift()){
			for( var key in c ){
				source[key] = c[key]
			}
		}

		return source;

	};
	
	/*
	apply
	将除source外的其它参数的属性，复制给source
	*/
	function isArray( data ){
		
		return Object.prototype.toString.call( data ).toLowerCase() == '[object array]';

	}

	return {
		extend: extend,
		apply: apply,
		isArray: isArray
	}
})
