$.fn.extend({
	explode: function(customOptions) {
		var opt = $.extend({}, $.fn.explode.defaultOptions, customOptions || {});
		
		var container = $(this)
			.wrap('<div class="container"></div>')
			.parent()
			.css({
				position: 'relative',
				width: $(this).width() + "px",
				height: $(this).height() + "px",
				overflow: 'hidden'
			});
		
		var w = $(this).width(),	// full width
			h = $(this).height(),		// full height
			cw = w / opt.columns,		// cell width
			ch = h / opt.rows,			// cell height
			self = $(this).hide();
		
		
		// ok, let's duplicate this shit
		for (var i = 0; i < opt.rows; i++) {
			for (var j = 0; j < opt.columns; j++) {
				$('<div class="tile"></div>')
					.css({
						width: cw + 'px',
						height: ch + 'px',
						position: 'absolute',
						left: (cw * j) + 'px',
						top: (ch * i) + 'px',
						backgroundImage: 'url(' + self.attr('src') + ')',
						backgroundPosition: "-" + (cw * j) + 'px -' + (ch * i) + 'px'
					})
					.appendTo(container)
					.show();
			}
		}
		
		// now let's iterate over the elements and move them all over the place
		var tiles = container.find('.tile');
		
		tiles.each(function(i, tile) {
			var p = $(tile).position();
			
			// adjust height above tile if there's any gap due to rounding error			
			if (i >= opt.columns) {
				var above_index = i - opt.columns
				var above_tile = $(tiles[above_index]);
				var above_tile_p = $(above_tile).position();
				
				//console.log('processing above index for: ' + i + ' to ' + above_index);
				
				console.log($(above_tile).height() + ' | ' + above_tile_p.top + ' | ' + p.top);
				
				if (above_tile.height() + above_tile_p.top < p.top) {
					above_tile.css({height: p.top - above_tile_p.top});
					console.log('adjusting ' + above_index);
				}
			}
			
			/*if ($(tiles).index(tile) > columns) {
				var last_tile = tiles[tiles.index(tile) % columns]
			}
			*/
			$(tile)
				.css({
					left: (Math.floor(Math.random() * w) + (Math.random() > .5) ? -w : w) + 'px',
					top: (Math.floor(Math.random() * h) + (Math.random() > .5) ? -h : h) + 'px'
				})
				.animate({
					left: (p.left) + 'px',
					top: (p.top) + 'px'
				}, Math.floor(Math.random() * 1000 + 2000))
		});// end each
		
		$.when(tiles).done(function(t) { 
			//t.hide();
			//self.show();
		}); 
				
		return self;
	}
});

$.fn.explode.defaultOptions = {
	rows: 10,
	columns: 10
}


$(function() {
	$('img').load(function() {
		$(this).explode({rows: 5, columns: 5});
	});
});
