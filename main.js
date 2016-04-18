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
// // Set the ranges
// var x = d3.scale.linear().range([0, width]);
//
// var y = d3.scale.linear().range([height, 0]);
// console.log(y);

// //setup x
// var xValue = function(d) { return d.displacement;}, // data -> value
//     xScale = d3.scale.linear().range([0, width]), // value -> display
//     xMap = function(d) { return xScale(xValue(d));}, // data -> display
//     xAxis = d3.svg.axis().scale(xScale).orient("bottom");
//
// //setup y
// var yValue = function(d) { return d.mpg;}, // data -> value
//     yScale = d3.scale.linear().range([height, 0]), // value -> display
//     yMap = function(d) { return yScale(yValue(d));}, // data -> display
//     yAxis = d3.svg.axis().scale(yScale).orient("left");



d3.csv('car.csv',function (data) {
var Vars = [{"variable":"mpg"},{"variable":"cylinders"},{"variable":"displacement"},{"variable":"horsepower"},{"variable":"weight"},{"variable":"acceleration"},{"variable":"model.year"}];

d3.select("div.ui").append('span').text('X-axis ');

d3.select("div.ui").append('select')
	.on('change',xChange)
	.selectAll('option')
	.data(Vars)
	.enter()
	.append('option')
	.attr('value', function (d) { return d.variable })
	.text(function (d) { return d.variable ;});

d3.select("div.ui").append('br');

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
		// .tickFormat(d3.format(',.0f'))
		.ticks(5)
		.orient('bottom')
		.tickSize(-height);

	var yAxis = d3.svg.axis()
		.scale(yScale)
		// .tickFormat(d3.format(',.0f'))
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
		.append('circle')
			.attr('cx',function (d) { return xScale(d['mpg']) })
			.attr('cy',function (d) { return yScale(d['displacement']) })
			.attr('r','2');
		// .on("mouseover", function(d) {
		// 	tooltip.transition()
		// 	.duration(250)
		// 	.style("opacity", .9);
		// 	tooltip.html(
	  //         "<p><strong>mpg:  </strong>" + formatCurrency(d['mpg']) + "&ndash;" + formatCurrency(d['mpg']) + "</p>" +
	  //         "<p><strong>Poverty Rate:  </strong>" + formatNumber(d['Poverty Rate']) + "%</p>" +
	  //         "<p><strong>Infant Mortality:  </strong>" + formatNumber(d['Infant Mortality Rate']) + " per 1,000 live births</p>" +
	  //         "<p><strong>Male Life Expectancy:  </strong>" + formatNumber(d['Male Life Expectancy']) + " years</p>" +
	  //         "<p><strong>Female Life Expectancy:  </strong>" + formatNumber(d['Female Life Expectancy']) + " years</p>"
		// 	)
		// 	.style("left", (d3.event.pageX + 15) + "px")
		// 	.style("top", (d3.event.pageY - 28) + "px");
		// })
		// .on("mouseout", function(d) {
		// 	tooltip.transition()
		// 	.duration(250)
		// 	.style("opacity", 0);
		// });

	function xChange() {

		var value = this.value;
		xScale.domain([d3.min(data,function (d) { return 0.93*d[value]}),d3.max(data,function (d) { return 1.07*d[value]})]);
		xAxis.scale(xScale);

		d3.select('#sel-x')
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
		yAxis.scale(yScale);

		d3.select('#sel-y')
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

// // Define the axes
// var xAxis = d3.svg.axis().scale(x)
//     .orient("bottom").ticks(5);
// console.log(xAxis);
// var yAxis = d3.svg.axis().scale(y)
//     .orient("left").ticks(5);
//Define svg

// var svg = d3.select("body").select("div.plot")
//           .append("svg")
//           .attr("width", width + margin.left + margin.right)
//           .attr("height", height + margin.top + margin.bottom)
//           .append("g")
//           .attr("transform",
//               "translate(" + margin.left + "," + margin.top + ")");

//Data

// d3.csv("car.csv", function(error, data) {
//   data.forEach(function(d) {
//     d.mpg = +d.mpg;
//     d.cylinders =+d.cylinders;
//     d.displacement =+d.displacement;
//     d.horsepower=+d.horsepower;
//     d.weight=+ d.weight;
//     d.acceleration=+d.acceleration;
//   console.log(d);
//   });

// var data = d3.csv("car.csv")
//     .row(function(d) {
//       // console.log(d);
//       return {
//         mpg : +d.mpg,
//         cylinders:+d.cylinders,
//         displacement : +d.displacement,
//         horsepower: +d.horsepower,
//         weight: + d.weight,
//         acceleration: +d.acceleration,
// }; })
//     .get(function(error, rows) {
//       console.log(rows);
//       draw(rows);
//     });

// // Scale the range of the data
// x.domain([0, width]);
// y.domain([0, height]);

//draw function
// var draw = function(d){
//   svg.selectAll("circle").data(d)
//   .enter().append("circle")
//   // .attr("cx", xMap)
//   // .attr("cy", yMap)
//   .attr("cx",function(d){return d.displacement-margin.left;})
//   .attr("cy",function(d){return height - d.mpg*4;})
//   // .attr("cx",function(d){return d[0];})
//   // .attr("cy",function(d){return height - d[1];})
//   .attr("r",2);
// };

// // Add the X Axis
//   svg.append("g")
//       .attr("class", "x axis")
//       .attr("transform", "translate(0," + height + ")")
//       .call(xAxis);
//
// // Add the Y Axis
//   svg.append("g")
//       .attr("class", "y axis")
//       .call(yAxis);

// x-axis
  // svg.append("g")
  //     .attr("class", "x axis")
  //     .attr("transform", "translate(0," + height + ")")
  //     .call(xAxis)
  //   .append("text")
  //     .attr("class", "label")
  //     .attr("x", width)
  //     .attr("y", -6)
  //     .style("text-anchor", "end")
  //     .text("displacement");
  //
  // // y-axis
  // svg.append("g")
  //     .attr("class", "y axis")
  //     .call(yAxis)
  //   .append("text")
  //     .attr("class", "label")
  //     .attr("transform", "rotate(-90)")
  //     .attr("y", 6)
  //     .attr("dy", ".71em")
  //     .style("text-anchor", "end")
  //     .text("mpg");


  // $(document).ready(function(){console.log(data1); draw(data1)})
