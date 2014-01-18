/**
 * Creates links to the JS and CSS pages of each gadget defined at [[MediaWiki:Gadgets-definition]]
 * @author: [[User:Helder.wiki]]
 * @tracking: [[Special:GlobalUsage/User:Helder.wiki/Tools/ImproveGadgetsDefinition.js]] ([[File:User:Helder.wiki/Tools/ImproveGadgetsDefinition.js]])
 */
/*jshint browser: true, camelcase: true, curly: true, eqeqeq: true, immed: true, latedef: true, newcap: true, noarg: true, noempty: true, nonew: true, quotmark: true, undef: true, unused: true, strict: true, trailing: true, maxlen: 120, evil: true, onevar: true */
/*global jQuery, mediaWiki */
( function ( mw, $ ) {
'use strict';

function improveGadgetsDefinition(){
	var $gadgets = $( '#mw-content-text' ).find( 'li' ),
		linker = function( match, page ){
			var pg = 'MediaWiki:Gadget-' + page;
			return '|<a href="' + mw.util.getUrl( pg ) + '" title="' + pg + '">' + page + '</a>';
		};
	$gadgets.each( function(){
		var $this = $(this),
			text = $this.text(),
			reDefinition = /^ *([a-zA-Z](?:[-_:.\w\d ]*[a-zA-Z0-9])?)(\s*\[.*?\])?\s*((\|[^|]*)+)\s*$/;
		if ( ! reDefinition.test( text ) ){
			return true;
		}
		$this.html( text.replace( /\|([^|]+?\.(?:js|css)(?=\||$))/g, linker ) );
	} );
}

if( mw.config.get( 'wgNamespaceNumber' ) === 8 && mw.config.get( 'wgTitle' ) === 'Gadgets-definition' ){
	mw.loader.using( 'mediawiki.util', function(){
		$( improveGadgetsDefinition );
	} );
}

}( mediaWiki, jQuery ) );