var
    width = 1000,
    height = 1000;

var svg = d3.select("#chart")
        .append("svg")
        .attr('version', '1.1')
        .attr('viewBox', '0 0 '+width+' '+height)
        .attr('width', '100%');

var color = d3.scaleOrdinal()
                .domain([0,4])
                .range(d3.schemeBlues[6].reverse());

console.dir(d3.schemeBlues[5]);

var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function(d) { return d.id; }))
    .force("charge", d3.forceManyBody().distanceMax(700))
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force("collide", d3.forceCollide().radius(7));

d3.json("artistas-semelhantes.json", function(error, graph) {
  if (error) throw error;

  graph.nodes = graph.nodes.filter(n => n.size > 55);
  var ids = graph.nodes.map(n => n.id);
  graph.edges = graph.edges.filter(
      e => ids.indexOf(e.source) >= 0 &&
            ids.indexOf(e.target) >= 0);

  var TARGET_ID = "0C0XlULifJtAgn6ZNCW2eu";

  var target = graph.nodes.filter(n => n.id === TARGET_ID);

  var first_ord_neighbors_edges = graph.edges.filter(
      e => e.source === TARGET_ID || e.target === TARGET_ID);

  var first_ord_neighbors = first_ord_neighbors_edges.map(e => e.source)
                    .concat(first_ord_neighbors_edges.map(e => e.target))
                    .filter(id => id !== TARGET_ID);

  var sec_ord_neighbors_edges = graph.edges.filter(
      e => e.source !== TARGET_ID && e.target !== TARGET_ID && (
            first_ord_neighbors.indexOf(e.source) >= 0 ||
            first_ord_neighbors.indexOf(e.target) >= 0)
    );

  var sec_ord_neighbors = sec_ord_neighbors_edges.map(e => e.source)
                    .concat(sec_ord_neighbors_edges.map(e => e.target))
                    .filter(id => first_ord_neighbors.indexOf(id) < 0);

  graph.nodes = graph.nodes.map(function(n){
      if(n.id === TARGET_ID){
          n.grade = 0;
      } else if(first_ord_neighbors.indexOf(n.id) >= 0) {
          n.grade = 1;
      } else if (sec_ord_neighbors.indexOf(n.id) >= 0){
          n.grade = 2;
      } else {
          n.grade = 3;
      }
      return n;
  });

  var link = svg.append("g")
    .attr("class", "link")
    .selectAll("line")
        .data(graph.edges)
    .enter().append("line");

  var node = svg.append("g")
      .attr("class", "nodes")
    .selectAll("circle")
        .data(graph.nodes)
    .enter().append("circle")
      .attr("r", d => (d.size / 10))
      .attr("fill", function(d) { return color(d.grade); })
      .call(d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended));

  node.append("title")
      .text(function(d) { return d.label; });

  simulation
      .nodes(graph.nodes)
      .on("tick", ticked);

  simulation.force("link")
      .links(graph.edges)
      .distance(5);

  function ticked() {
    link
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
  }
});

function dragstarted(d) {
  if (!d3.event.active) simulation.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
}

function dragged(d) {
  d.fx = d3.event.x;
  d.fy = d3.event.y;
}

function dragended(d) {
  if (!d3.event.active) simulation.alphaTarget(0);
  d.fx = null;
  d.fy = null;
}
