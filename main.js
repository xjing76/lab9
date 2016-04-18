//Set dim
var body = d3.select('body'),
	menu = d3.select(".ui"),
	margin = { top: 0, right: 0, bottom: 30, left: 40 },
	height = 400 - margin.top - margin.bottom,
	width = 400 - margin.left - margin.right,
	formatNumber = d3.format(',.1f'),
	tooltip = d3.select("body").append("div")
	.attr("class", "tooltip")
	.style("opacity", 0);
  console.log(menu);

d3.csv('car.csv',function (data) {
var Vars = [{"variable":"mpg"},{"variable":"cylinders"},{"variable":"displacement"},{"variable":"horsepower"},{"variable":"weight"},{"variable":"acceleration"},{"variable":"model.year"},{"variable":"name"}];

d3.select("div.ui").append('span').text('X-axis ');

d3.select("div.ui").append('select')
	.on('change',xChange)
	.selectAll('option')
	.data(Vars)
	.enter()
	.append('option')
	.attr('value', function (d) { return d.variable })
	.text(function (d) { return d.variable ;});


d3.select("div.ui").append('span')
		.text('Y-axis ');

d3.select("div.ui").append('select')
		.on('change',yChange)
		.selectAll('option')
		.data(Vars)
		.enter()
		.append('option')
		.attr('id', function (d) { return d.variable })
		.attr('value', function (d) { return d.variable })
		.text(function (d) { return d.variable ;});

	d3.select("[id='displacement']")
		.attr("selected", "selected");

	var xScale = d3.scale.linear()
		.domain([d3.min(data,function (d) { return 0.93*d['mpg']}),d3.max(data,function (d) { return 1.07*d['mpg']})])
		.range([0,width]);

	var yScale = d3.scale.linear()
		.domain([d3.min(data,function (d) { return 0.98*d['displacement']}),d3.max(data,function (d) { return 1.02*d['displacement']})])
		.range([height,0]);


	var svg = d3.select(".plot").append('svg')
		.attr('height',1.01*height + margin.top + margin.bottom)
		.attr('width',width + margin.left + margin.right)
		.append('g')
		.attr('transform','translate(' + margin.left + ',' + margin.top + ')');

	var xAxis = d3.svg.axis()
		.scale(xScale)
		.ticks(5)
		.orient('bottom')
		.tickSize(-height);

	var yAxis = d3.svg.axis()
		.scale(yScale)
		.ticks(5)
		.orient('left')
		.tickSize(-width - margin.left - margin.right);


	svg.append('g')
		.attr('class','axis')
		.attr('id','xAxis')
		.attr('transform', 'translate(-1,' + height + ')')
		.call(xAxis)
		.append('text')
			.attr('id','xAxisLabel')
			.attr("dy", "2em")
    		.attr("dx", width/1.6)
			.style('text-anchor','end')
			.text('mpg');

	svg.append('g')
		.attr('class','axis')
		.attr('id','yAxis')
		.call(yAxis)
		.append('text')
			.attr('id', 'yAxisLabel')
			.attr('transform','rotate(-90)')
			.attr("dy", "-1.6em")
			.attr("dx", -height/2.5)
			.style('text-anchor','end')
			.text('displacement');

	var circles = svg.selectAll('circle')
		.data(data)
		.enter()
		.append('svg:circle')
			.attr('cx',function (d) {  return xScale(d['mpg']) })
			.attr('cy',function (d) { return yScale(d['displacement']) })
			.attr('r','2')
      .on("mouseover", function(d) { console.log(d);
      d3.select('#hovered').text(d.name);
      })
      .on("mouseout", function() { });


// d3.select('#hovered').append("text").text(function(d) {return 10;});

	function xChange() {

		var value = this.value;
		xScale.domain([d3.min(data,function (d) { return 0.93*d[value]}),d3.max(data,function (d) { return 1.07*d[value]})]);
		xAxis.scale(xScale);

		d3.select('#xAxis')
			.transition()
			.duration(750)
			.call(xAxis);

		d3.select('#xAxisLabel')
			.text(value);

		d3.selectAll('circle')
			.transition()
			.duration(750)
			.attr('cx',function (d) { return xScale(d[value]) })
	};

	function yChange() {

		var value = this.value;
		yScale.domain([d3.min(data,function (d) { return 0.98*d[value]}),d3.max(data,function (d) { return 1.02*d[value]})]);
		yAxis.scale(
      d3.scale.linear()
    		.domain([d3.min(data,function (d) { return 0.93*d[value]}),d3.max(data,function (d) { return 1.07*d[value]})])
    		.range([0,width])
    );

		d3.select('#yAxis')
			.transition()
			.duration(750)
			.call(yAxis);

		d3.select('#yAxisLabel')
			.text(value);

		d3.selectAll('circle')
			.transition()
			.duration(750)
			.attr('cy',function (d) { return yScale(d[value]) });
	}
});
