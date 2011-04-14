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
		
		var w = $(this).width(); // full width
		var h = $(this).height(); // full height
		var cw = w / opt.columns; // cell width
		var ch = h / opt.rows; // cell height
		var self = $(this).hide();
		
		
		// ok, let's dupicate this shit
		var i = 0, j = 0;
		for (i = 0; i < opt.rows; i++) {
			for (j = 0; j < opt.columns; j++) {
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
			p = $(tile).position();
			
			$(tile).css({
				left: (Math.floor(Math.random() * w) + (Math.random() > .5) ? -w : w) + 'px',
				top: (Math.floor(Math.random() * h) + (Math.random() > .5) ? -h : h) + 'px'
			}).animate({
				left: (p.left) + 'px',
				top: (p.top) + 'px'
			}, Math.floor(Math.random() * 1000 + 2000));
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
		$(this).explode();
	});
});
