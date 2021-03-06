var margin = { top: 10, right: 50, bottom: 50, left: 50 },
    outerWidth = 400,
    outerHeight = 400,
    width = outerWidth - margin.left - margin.right,
    height = outerHeight - margin.top - margin.bottom;

var x = d3.scale.linear()
    .range([0, width]).nice();

var y = d3.scale.linear()
    .range([height, 0]).nice();

var xCat = "X",
    yCat = "Y",
    rCat = "",
    colorCat = "esquina";

d3.csv("noise/esq1,2,3,4_v3.csv", function(data) {
  data.forEach(function(d) {
    d.esquina = d.esquina;
    d.id = +d.id;
    d.mix=d.mix;
    d.valx=d.valx;
    d.valy=d.valy;
    
  });

  var xMax = d3.max(data, function(d) { return 30; }) * 1.05,
      xMin = d3.min(data, function(d) { return -30; }),
      xMin = xMin > 0 ? 0 : xMin,
      yMax = d3.max(data, function(d) { return 30; }) * 1.05,
      yMin = d3.min(data, function(d) { return -30; }),
      yMin = yMin > 0 ? 0 : yMin;

  x.domain([xMin, xMax]);
  y.domain([yMin, yMax]);

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom")
      .tickSize(-height);

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left")
      .tickSize(-width);

  var color = d3.scale.category10();

  var tip = d3.tip()
      .attr("class", "d3-tip")
      .offset([-10, 0])
      .html(function(d) {
        return d.esquina + ": " + d.mix;
      });

  var zoomBeh = d3.behavior.zoom()
      .x(x)
      .y(y)
      .scaleExtent([0, 500])
      .on("zoom", zoom);

  var svg = d3.select("#scatter")
    .append("svg")
      .attr("width", outerWidth)
      .attr("height", outerHeight)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .call(zoomBeh);

  svg.call(tip);

  svg.append("rect")
      .attr("width", width)
      .attr("height", height);

  svg.append("g")
      .classed("x axis", true)
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .append("text")
      .classed("label", true)
      .attr("x", width)
      .attr("y", margin.bottom - 10)
      .style("text-anchor", "end")
      .text(xCat);

  svg.append("g")
      .classed("y axis", true)
      .call(yAxis)
    .append("text")
      .classed("label", true)
      .attr("transform", "rotate(-90)")
      .attr("y", -margin.left)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text(yCat);

  var objects = svg.append("svg")
      .classed("objects", true)
      .attr("width", width)
      .attr("height", height);

  objects.append("svg:line")
      .classed("axisLine hAxisLine", true)
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", width)
      .attr("y2", 0)
      .attr("transform", "translate(0," + height + ")");

  objects.append("svg:line")
      .classed("axisLine vAxisLine", true)
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", 0)
      .attr("y2", height);

  objects.selectAll(".dot")
      .data(data)
    .enter().append("circle")
      .classed("dot", true)
      .attr("class", function(d){
        //console.log(d.esquina);
        return "dot" +" "+ d.esquina;
      })
      .attr("r", 2)
      .attr("transform", transform)
      .attr("opacity",.7)
      .style("fill", function(d) { return color(d[colorCat]); })
      .on("mouseover", tip.show)
      .on("mouseout", tip.hide);

      var estadorosa=0;        
      var estadogerard=0;
      var estadojoan=0;
      var estadoestar=0;



  var legend = svg.selectAll(".legend")
      .data(color.domain())
      .enter().append("g")
      .attr("id", function(i){
        return "label"+i;
      })
      .classed("legend", true)
      .on("click", function(d) {    
        var clickedlab = this.id;
        //console.log(clickedlab+" "+estadorosa);
        if (clickedlab==="labelC22" && estadorosa===0) {
          estadorosa=1;
          d3.selectAll('.C22')
          .style("visibility", "hidden")          
        }else if (clickedlab==="labelC22" && estadorosa===1){
          estadorosa=0;
          d3.selectAll('.C22')
          .style("visibility", "visible")                    
        }
        if (clickedlab==="labelC21" && estadogerard===0) {
          estadogerard=1;
          d3.selectAll('.C21')
          .style("visibility", "hidden")          
        }else if (clickedlab==="labelC21" && estadogerard===1) {
          estadogerard=0;
          d3.selectAll('.C21')
          .style("visibility", "visible")          
        }if (clickedlab==="labelC11" && estadojoan===0) {
          estadojoan=1;
          d3.selectAll('.C11')
          .style("visibility", "hidden")          
        }else if (clickedlab==="labelC11" && estadojoan===1) {
          estadojoan=0;
          d3.selectAll('.C11')
          .style("visibility", "visible")          
        }if (clickedlab==="labelC12" && estadoestar===0) {
          estadoestar=1;
          d3.selectAll('.C12')
          .style("visibility", "hidden")          
        }else if (clickedlab==="labelC12" && estadoestar===1) {
          estadoestar=0;
          d3.selectAll('.C12')
          .style("visibility", "visible")          
        }
    })
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  legend.append("circle")
      .attr("r", 3.5)
      .attr("cx", width + 20)
      .attr("fill", color);

  legend.append("text")
      .attr("x", width + 26)
      .attr("dy", ".35em")
      .text(function(d) { return d; });

  d3.select("input").on("click", change);

  function change() {
    xCat = "X";
    xMax = d3.max(data, function(d) { return 30; });
    xMin = d3.min(data, function(d) { return -30; });

    zoomBeh.x(x.domain([xMin, xMax])).y(y.domain([yMin, yMax]));

    var svg = d3.select("#scatter").transition();

    svg.select(".x.axis").duration(750).call(xAxis).select(".label").text(xCat);

    objects.selectAll(".dot").transition().duration(1000).attr("transform", transform);
  }

  function zoom() {
    svg.select(".x.axis").call(xAxis);
    svg.select(".y.axis").call(yAxis);

    svg.selectAll(".dot")
        .attr("transform", transform);
  }

  function transform(d) {
    return "translate(" + x(d.valx) + "," + y(d.valy) + ")";
  }
});