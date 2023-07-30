
// create 2 data_set
var Solar = [
  { year: '2012', value: 11.705908},
  { year: '2013', value: 18.935963 },
  { year: '2014', value:35.434574 },
  { year: '2015', value: 27.024391},
  { year: '2016', value:42.188133 },
  { year: '2017', value: 59.371902},
  { year: '2018', value: 41.77957},
  { year: '2019', value:35.10234},
  { year: '2020' ,value:62.163147},
  { year: '2021' ,value: 87.80618},
  { year: '2022' ,value: 102.93228},
];
var Gas= [
  { year: '2012', value:299.12012},
  { year: '2013', value:189},
  { year: '2014', value:152.37646},
  { year: '2015', value:213.19043},
  { year: '2016', value:55.194336},
  { year: '2017', value:0},
  { year: '2018', value:819.71045},
  { year: '2019', value:290.3662},
  { year: '2020' ,value:0},
  { year: '2021' ,value:29.166016},
  { year: '2022' ,value:454.08887},
];


// set the dimensions and margins of the graph
const margin = { top: 30, right: 20, bottom: 100, left: 80 };
const width = 960 - margin.left ;
const height = 500 - margin.top;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");


const tooltip = d3.select('body').append('div')
  .attr('class', 'tooltip')
  .style('opacity', 0);

// X axis
var x = d3.scaleBand()
  .range([ 0, width ])
  .domain(Solar.map(function(d) { return d.year; }))
  .padding(0.5);
svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x))

// Add Y axis
var y = d3.scaleLinear()
  .domain([0, 900])
  .range([ height, 0]);
svg.append("g")
  .attr("class", "myYaxis")
  .call(d3.axisLeft(y));

svg.append("text")
.attr("transform", "rotate(-90)")
.attr("y", 0 - margin.left)
.attr("x", 0 - (height / 2))
.attr("dy", "1em")
.style("text-anchor", "middle")
.style("font-size", "15px")
.style("fill", "#777")
.style("font-family", "sans-serif")
.text("Source Growth Rate(TWh growth)");
      
      
 svg.append("text")
.attr("y",  margin.bottom +400 )
.attr("x", margin.left +300 )
.attr("dy", "1em")
.style("text-anchor", "middle")
.style("font-size", "15px")
.style("fill", "#777")
.style("font-family", "sans-serif")
.text("Year");

svg.append("text")
.attr("class", "chart-title")
.attr("x", margin.left +350)
.attr("y", margin.top -30 )
.style("font-size", "20px")
.style("text-anchor", "middle")
.style("fill", "#777")
.style("font-family", "sans-serif")
.text("Annual Change Primary Energy Source");

// A function that create / update the plot for a given variable:
function update(data) {

  var u = svg.selectAll("rect")
    .data(data)

  u
    .enter()
    .append("rect")
    .merge(u)
    .transition()
    .duration(1000)
      .attr("x", function(d) { return x(d.year); })
      .attr("y", function(d) { return y(d.value); })
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height - y(d.value); })
      .attr("fill", "blue")
     .on('mouseover', (d) => {
    tooltip.transition().duration(20).style('opacity', 0.9);
    tooltip.html(`Value: <span>${d.value}</span>`)
      .style('left', `${d3.event.layerX}px`)
      .style('top', `${(d3.event.layerY - 28)}px`);
  })
  .on('mouseout', () => tooltip.transition().duration(500).style('opacity', 0));
}

// Initialize the plot with the first dataset
update(Solar)