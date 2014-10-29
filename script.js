var graph = new Object();
graph.nodes = [];
graph.links = [];


function ajax(url, data) {
  return new Promise(function (resolve, reject) {
    $.getJSON(url, data)
      .done(resolve)
      .fail(reject);
  });
}


var get_pmid = ajax(
  "http://www.corsproxy.com/www.ncbi.nlm.nih.gov/pmc/utils/idconv/v1.0/?tool=my_tool&email=my_email@example.com&ids=10.1371/journal.ppat.1003211&format=json"
);

var get_refs = function (result) {
    var pmid = result.records[0].pmid;
    graph.nodes.push({"name":pmid,"group":1});
    return ajax("http://www.corsproxy.com/www.ebi.ac.uk/europepmc/webservices/rest/MED/"+pmid+"/references/1/json");
};


var draw_d3 = function () {
  force
      .nodes(graph.nodes)
      .links(graph.links)
      .start();

  var link = svg.selectAll(".link")
      .data(graph.links)
      .enter().append("line")
      .attr("class", "link")
      .style("stroke-width", function(d) { return Math.sqrt(d.value); });

  var node = svg.selectAll(".node")
      .data(graph.nodes)
      .enter().append("circle")
      .attr("class", "node")
      .attr("r", 5)
      .style("fill", function(d) { return color(d.group); })
      .call(force.drag);

  node.append("title")
      .text(function(d) { return d.name; });

  force.on("tick", function() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
  });
};


get_pmid
.then(get_refs)
.then(function (result) {
  result.referenceList.reference.forEach(function (reference, index) {
    console.log(reference.id);
    // console.log(index);
    graph.nodes.push({"name":reference.id,"group":1});
    graph.links.push({"source":index,"target":0,"value":1});

  });
})
.then(draw_d3);













