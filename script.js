var data = [20, 30, 45, 15],
	width = 600,
	height = 400,
	barWidth = 50,
	barOffset = 5;

d3.select('#chart').append('svg')
	.attr('width', width)
	.attr('height', height)
	.style('background', 'gray')
	.selectAll('rect').data(data).enter().append('rect')
		.style('fill', 'magenta')
		.attr('width', barWidth)
		.attr('height', function(d) {
			return d;
		})
		.attr('x', function(d, i) {
			return i * (barWidth + barOffset);
		})
		.attr('y', function(d) {
			return height - d;
		});
