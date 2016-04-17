//Set dim
var margin = {top: 30, right: 20, bottom: 30, left: 50},
    width = 600 - margin.left - margin.right,
    height = 270 - margin.top - margin.bottom;

// Set the ranges
var x = d3.scale.linear().range([0, width]);
var y = d3.scale.linear().range([height, 0]);

console.log("width", width);
console.log("height", height);

// Define the axes
var xAxis = d3.svg.axis().scale(x)
    .orient("bottom").ticks(5);

var yAxis = d3.svg.axis().scale(y)
    .orient("left").ticks(5);
//Define svg
var svg = d3.select("body").select("div.plot")
          .append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

//Data

var data = d3.csv("car.csv")
    .row(function(d) {
      // console.log(d);
      return {
        mpg : +d.mpg,
        cylinders:+d.cylinders,
        displacement : +d.displacement,
        horsepower: +d.horsepower,
        weight: + d.weight,
        acceleration: +d.acceleration,
}; })
    .get(function(error, rows) {
      console.log(rows.length);
      console.log(rows);
      draw(rows);
    });

// Scale the range of the data
x.domain([0, width]);
y.domain([0, height]);

var data1=[[1,1],[50,50]];
    //draw function
    var draw = function(d){
      svg.selectAll("circle").data(d)
      .enter().append("circle")
      .attr("cx",function(d){return d.displacement;})
      .attr("cy",function(d){return height - d.mpg;})
      // .attr("cx",function(d){return d[0];})
      // .attr("cy",function(d){return height - d[1];})
      .attr("r",2);
    };

// Add the X Axis
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

// Add the Y Axis
  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);

  // $(document).ready(function(){console.log(data1); draw(data1)})
