var styles = [
	{name: 'foo', color: 'red', width: 200}, 
	{name: 'bar', color: 'green', width: 150},
	{name: 'baz', color: 'blue', width: 130},
	{name: 'bang', color: 'orange', width: 185},
	{name: 'qux', color: 'purple', width: 100},
];

d3.select('#chart').selectAll('div')
	.data(styles)
	.enter().append('div')
	.classed('item', true)
	.text(function(d) {
		return d.name;
	})
	.style({
		'color': 'white',
		'background': function(d) {
			return d.color;
		}, 
		'width': function(d) {
			return d.width + 'px';
		}
	});