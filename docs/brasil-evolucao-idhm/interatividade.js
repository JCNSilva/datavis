var svg1 = d3.select("#vis1");
var svg2 = d3.select("#vis2");

var path = d3.geoPath();

var color = d3.scaleThreshold()
    .domain(d3.range(0.1, 0.91, 0.2))
    .range(d3.schemeBlues[5]);

d3.queue()
    .defer(d3.json, "br-map-idhm-final.json")
    .await(ready);

function ready(error, dados) {
    if (error) throw error;

  var cidades = dados.features;

  svg1.append("g")
    .attr("class", "cidades")
      .selectAll("path")
      .data(cidades)
      .enter()
      .append("path")
        .attr("fill", d => {valor = d.properties["I2000"]; return valor === "NA" ? '#e0e0eb' : color(valor)})
        .attr("d", path)
        .on("mouseover",showTooltip)
        .on("mousemove",moveTooltip)
        .on("mouseout",hideTooltip);

  svg2.append("g")
      .attr("class", "cidades")
        .selectAll("path")
        .data(cidades)
        .enter()
        .append("path")
          .attr("fill", d => {valor = d.properties["I2010"]; return valor === "NA" ? '#e0e0eb' : color(valor)})
          .attr("d", path)
          .on("mouseover",showTooltip2)
          .on("mousemove",moveTooltip)
          .on("mouseout",hideTooltip);
}

/*
 * LEGENDA
 */
var desenhaLegenda = function(min, max, escalaDeCor, nomeVariavel, id){
  var x = d3.scaleLinear()
      .domain([min, max])
      .rangeRound([10, 250]);

  var svg = d3.select(id)

  var g = svg.append("g")
      .attr("class", "key")
      .attr("transform", "translate(0,40)");

  g.selectAll("rect")
    .data(escalaDeCor.range().map(function(d) {
        d = escalaDeCor.invertExtent(d);
        if (d[0] == null) d[0] = x.domain()[0];
        if (d[1] == null) d[1] = x.domain()[1];
        return d;
      }))
    .enter().append("rect")
      .attr("height", 8)
      .attr("x", d => x(d[0]))
      .attr("width", function(d) { return x(d[1]) - x(d[0]); })
      .attr("fill", function(d) { return escalaDeCor(d[0]); });

  g.append("text")
      .attr("class", "caption")
      .attr("x", x.range()[0])
      .attr("y", -6)
      .attr("fill", "#000")
      .attr("text-anchor", "start")
      .attr("font-weight", "bold")
      .text(nomeVariavel);

  g.call(d3.axisBottom(x)
      .tickSize(13)
      .tickFormat(function(x, i) { return (i ? Math.round(x*100)/100 : Math.round(x*100)/100); })
      .tickValues(escalaDeCor.domain().concat(min)))
    .select(".domain")
      .remove();
}

desenhaLegenda(0.1, 0.9, color, "IDHM 2000", "#vis1");
desenhaLegenda(0.1, 0.9, color, "IDHM 2010", "#vis2");

/*
* ZOOM
*/
//create zoom handler
var zoom_handler_1 = d3.zoom()
    .on("zoom", zoom_actions_1);

//specify what to do when zoom event listener is triggered
function zoom_actions_1(){
    d3.select("#vis1")
        .selectAll("path")
        .attr("transform", d3.event.transform);
}

//add zoom behaviour to the svg element
//same as svg.call(zoom_handler);
svg1.call(zoom_handler_1);

var zoom_handler_2 = d3.zoom()
    .on("zoom", zoom_actions_2);

function zoom_actions_2(){
    d3.select("#vis2")
        .selectAll("path")
        .attr("transform", d3.event.transform);
}

svg2.call(zoom_handler_2);


/*
* TOOLTIP
*/
//Create a tooltip, hidden at the start
var tooltip = d3.select("body").append("div").attr("class","tooltip");
//Position of the tooltip relative to the cursor
var tooltipOffset = {x: 5, y: -25};

function showTooltip(d) {
  moveTooltip();

  tooltip.style("display","block")
      .text(d.properties.Localidade + " - " + d.properties.UF + ": " + d.properties["I2000"]);
}

function showTooltip2(d) {
  moveTooltip();

  tooltip.style("display","block")
      .text(d.properties.Localidade + " - " + d.properties.UF + ": " + d.properties["I2010"]);
}

//Move the tooltip to track the mouse
function moveTooltip() {
  tooltip.style("top",(d3.event.pageY+tooltipOffset.y)+"px")
      .style("left",(d3.event.pageX+tooltipOffset.x)+"px");
}

//Create a tooltip, hidden at the start
function hideTooltip() {
  tooltip.style("display","none");
}
