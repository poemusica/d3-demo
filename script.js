var data = [],
	width = 600,
	height = 400;

for (var i = 0; i < 100; i++) {
	data.push(Math.random());
}

var yscale = d3.scale.linear()
			   .domain([0, d3.max(data)])
			   .range([0, height]),
	xscale = d3.scale.ordinal()
			   .domain(d3.range(0, data.length))
			   .rangeBands([0, width]),
	colors = d3.scale.linear()
			   .domain([0, data.length*0.25, data.length*0.5, data.length*0.75, data.length])
			   .range(['red', 'orange', 'yellow', 'green', 'blue']);

var tempColor;

var chart = d3.select('#chart').append('svg')
	.attr('width', width)
	.attr('height', height)
	.style('background', 'gray')
	.selectAll('rect').data(data).enter().append('rect')
		.style('fill', function(d, i) {
			return colors(i);
		})
		.attr('width', xscale.rangeBand())
		.attr('x', function(d, i) {
			return xscale(i);
		})
		.attr('height', 0)
		.attr('y', height)
		.on('mouseover', function(d){
			tempColor = this.style.fill;
			d3.select(this)
				// .transition()
				.style('opacity', 0.5)
				.style('fill', 'purple');
		})
		.on('mouseout', function(d) {
			d3.select(this)
				// .transition().delay(500).duration(800)
				.style('opacity', 1)
				.style('fill', tempColor);
		});

chart.transition()
	.delay(function(d, i) {
		return i * 10;
	})
	.ease('elastic')
	.duration(1000)
	.attr('height', function(d) {
		return yscale(d);
	})
	.attr('y', function(d) {
		return height - yscale(d);
	});

		
