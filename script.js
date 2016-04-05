var data = [20, 30, 45, 15],
	width = 600,
	height = 400;

var yscale = d3.scale.linear()
			   .domain([0, d3.max(data)])
			   .range([0, height]),
	xscale = d3.scale.ordinal()
			   .domain(d3.range(0, data.length))
			   .rangeBands([0, width]),
	colors = d3.scale.linear()
			   .domain([0, d3.max(data)])
			   .range(['orange', 'magenta']);

d3.select('#chart').append('svg')
	.attr('width', width)
	.attr('height', height)
	.style('background', 'gray')
	.selectAll('rect').data(data).enter().append('rect')
		.style('fill', colors)
		.attr('width', xscale.rangeBand())
		.attr('height', function(d) {
			return yscale(d);
		})
		.attr('x', function(d, i) {
			return xscale(i);
		})
		.attr('y', function(d) {
			return height - yscale(d);
		});
