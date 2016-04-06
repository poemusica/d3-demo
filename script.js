var data = [],
	margin = {top: 30, right: 30, bottom: 40, left: 50},
	width = 600 - margin.right - margin.left,
	height = 400 - margin.top - margin.bottom;

d3.tsv('data.tsv', function(d) {

	for (key in d) {
		data.push(d[key].value);
	}

	var yscale = d3.scale.linear()
				   .domain([0, d3.max(data)])
				   .range([0, height]),
		xscale = d3.scale.ordinal()
				   .domain(d3.range(0, data.length))
				   .rangeBands([0, width], 0.2, 0),
		colors = d3.scale.linear()
				   .domain([0, data.length*0.25, data.length*0.5, data.length*0.75, data.length])
				   .range(['red', 'orange', 'yellow', 'green', 'blue']);

	var tempColor,
		toolTip = d3.select('body').append('div')
			.style('position', 'absolute')
			.style('padding', '0 10px')
			.style('background', 'white')
			.style('opacity', 0);

	var chart = d3.select('#chart').append('svg')
		.style('background', 'gray')
		.attr('width', width + margin.right + margin.left)
		.attr('height', height + margin.top + margin.bottom)
		.append('g')
		.attr('transform', 'translate(' + margin.left + ',' + margin.top +')')
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

	var xAxis = d3.svg.axis()
			.scale(xscale)
			.orient('bottom')
			.tickValues(xscale.domain().filter( function(d, i) {
				return !(i % (data.length/5));
			})),
		xGuide = d3.select('svg').append('g')
			.attr('transform', 'translate(' + margin.left + ',' + (height + margin.top) + ')');
		yGuideScale = d3.scale.linear()
			.domain([0, d3.max(data)])
			.range([height, 0]),
		yAxis = d3.svg.axis()
			.scale(yGuideScale)
			.orient('left')
			.ticks(10),
		yGuide = d3.select('svg').append('g')
			.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

	yAxis(yGuide);
	xAxis(xGuide);

	yGuide.selectAll('path')
			.style({fill: 'none', stroke: 'black'});
	yGuide.selectAll('line')
			.style({stroke: '#000'});
	xGuide.selectAll('path')
			.style({fill: 'none', stroke: 'black'});
	xGuide.selectAll('line')
			.style({stroke: '#000'});

});

