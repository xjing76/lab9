// Setup data
            var dataset = null;  // Initialize empty array

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
                  dataset = rows;
                //  console.log(rows);
                });
            console.log(dataset);
//
//             // Setup settings for graphic
//             var canvas_width = 500;
//             var canvas_height = 300;
//             var padding = 30;  // for chart edges
//
//             // Create scale functions
//             var xScale = d3.scale.linear()  // xScale is width of graphic
//                             .domain([0, d3.max(dataset, function(d) {
//                                 return d[0];  // input domain
//                             })])
//                             .range([padding, canvas_width - padding * 2]); // output range
//
//             var yScale = d3.scale.linear()  // yScale is height of graphic
//                             .domain([0, d3.max(dataset, function(d) {
//                                 return d[1];  // input domain
//                             })])
//                             .range([canvas_height - padding, padding]);  // remember y starts on top going down so we flip
//
//             // Define X axis
//             var xAxis = d3.svg.axis()
//                             .scale(xScale)
//                             .orient("bottom")
//                             .ticks(5);
//
//             // Define Y axis
//             var yAxis = d3.svg.axis()
//                             .scale(yScale)
//                             .orient("left")
//                             .ticks(5);
//
//             // Create SVG element
//             var svg = d3.select("body").select("div.plot") // This is where we put our vis
//                 .append("svg")
//                 .attr("width", canvas_width)
//                 .attr("height", canvas_height)
//
//             // Create Circles
//             svg.selectAll("circle")
//                 .data(dataset)
//                 .enter()
//                 .append("circle")  // Add circle svg
//                 .attr("cx", function(d) {
//                     return xScale(d[0]);  // Circle's X
//                 })
//                 .attr("cy", function(d) {  // Circle's Y
//                     return yScale(d[1]);
//                 })
//                 .attr("r", 2);  // radius
//
//             // Add to X axis
//             svg.append("g")
//                 .attr("class", "x axis")
//                 .attr("transform", "translate(0," + (canvas_height - padding) +")")
//                 .call(xAxis);
//
//             // Add to Y axis
//             svg.append("g")
//                 .attr("class", "y axis")
//                 .attr("transform", "translate(" + padding +",0)")
//                 .call(yAxis);
//
//             // On click, update with new data
//             d3.select("body").select("div.plot")
//                 .on("click", function() {
//                     var numValues = dataset.length;  // Get original dataset's length
//                     var maxRange = Math.random() * 1000;  // Get max range of new values
//                     dataset = [];  // Initialize empty array
//                     for(var i=0; i<numValues; i++) {
//                         var newNumber1 = Math.floor(Math.random() * maxRange);  // Random int for x
//                         var newNumber2 = Math.floor(Math.random() * maxRange);  // Random int for y
//                         dataset.push([newNumber1, newNumber2]);  // Add new numbers to array
//                     }
//
//                     // Update scale domains
//                     xScale.domain([0, d3.max(dataset, function(d) {
//                         return d[0]; })]);
//                     yScale.domain([0, d3.max(dataset, function(d) {
//                         return d[1]; })]);
//
//                     // Update circles
//                     svg.selectAll("circle")
//                         .data(dataset)  // Update with new data
//                         .transition()  // Transition from old to new
//                         .duration(1000)  // Length of animation
//                         .each("start", function() {  // Start animation
//                             d3.select(this)  // 'this' means the current element
//                                 .attr("fill", "red")  // Change color
//                                 .attr("r", 5);  // Change size
//                         })
//                         .delay(function(d, i) {
//                             return i / dataset.length * 500;  // Dynamic delay (i.e. each item delays a little longer)
//                         })
//                         //.ease("linear")  // Transition easing - default 'variable' (i.e. has acceleration), also: 'circle', 'elastic', 'bounce', 'linear'
//                         .attr("cx", function(d) {
//                             return xScale(d[0]);  // Circle's X
//                         })
//                         .attr("cy", function(d) {
//                             return yScale(d[1]);  // Circle's Y
//                         })
//                         .each("end", function() {  // End animation
//                             d3.select(this)  // 'this' means the current element
//                                 .transition()
//                                 .duration(500)
//                                 .attr("fill", "black")  // Change color
//                                 .attr("r", 2);  // Change radius
//                         });
//
//                         // Update X Axis
//                         svg.select(".x.axis")
//                             .transition()
//                             .duration(1000)
//                             .call(xAxis);
//
//                         // Update Y Axis
//                         svg.select(".y.axis")
//                             .transition()
//                             .duration(100)
//                             .call(yAxis);
//                 });
//
