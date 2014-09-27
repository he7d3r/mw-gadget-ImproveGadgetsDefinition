/**
 * Creates links to the JS and CSS pages of each gadget defined at [[MediaWiki:Gadgets-definition]]
 * @author: Helder (https://github.com/he7d3r)
 * @license: CC BY-SA 3.0 <https://creativecommons.org/licenses/by-sa/3.0/>
 */
( function ( mw, $ ) {
	'use strict';

	function improveGadgetsDefinition( $content ) {
		var $gadgets = $content.find( 'li' ),
			linker = function ( match, page ) {
				var pg = 'MediaWiki:Gadget-' + $.trim( page );
				return '|<a href="' + mw.util.getUrl( pg ) + '" title="' + pg + '">' + page + '</a>';
			};
		$gadgets.each( function () {
			var $this = $(this),
				text = $this.text(),
				reDefinition = /^\s*([a-zA-Z](?:[-_:.\w\d ]*[a-zA-Z0-9])?)(\s*\[.*?\])?\s*((\|[^|]*)+)\s*$/;
			if ( !reDefinition.test( text ) ) {
				return true;
			}
			$this.html( text.replace( /\|([^|]+?\.(?:js|css)(?=\||$))/g, linker ) );
		} );
	}

	if ( mw.config.get( 'wgNamespaceNumber' ) === 8 && mw.config.get( 'wgTitle' ) === 'Gadgets-definition' ) {
		mw.loader.using( 'mediawiki.util', function () {
			mw.hook( 'wikipage.content' ).add( improveGadgetsDefinition );
		} );
	}

}( mediaWiki, jQuery ) );
