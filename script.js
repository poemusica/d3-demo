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

var tempColor
	toolTip = d3.select('body').append('div')
		.style('position', 'absolute')
		.style('padding', '0 10px')
		.style('background', 'white')
		.style('opacity', 0);

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
			toolTip.transition()
				.style('opacity', 0.9);
			toolTip.style('left', (d3.event.pageX - 35)  + 'px')
				.style('top', (d3.event.pageY - 30)  + 'px');
			toolTip.html(d);
			d3.select(this)
				.style('opacity', 0.5)
				.style('fill', 'purple');
		})
		.on('mouseout', function(d) {
			toolTip.transition()
				.style('opacity', 0);
			d3.select(this)
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

		
