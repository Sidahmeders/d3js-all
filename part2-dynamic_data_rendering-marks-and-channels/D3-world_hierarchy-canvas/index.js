const width = window.innerWidth;
const height = window.innerHeight * 2;

const svg = d3
  .select('svg')
  .style('background-color', '#fdfdfd')
    .attr('width', width)
    .attr('height', height);

svg.call(d3.zoom().on("zoom", () => {
  g.attr("transform", d3.event.transform);
}));

const g = svg.append('g')
  .attr('transform', `translate(70, 0)`);

const worldTree = d3.tree()
  .size([height, width - 150]);

d3.json('world-data.json').then(data => {
  const root = d3.hierarchy(data);
  const links =  worldTree(root).links();
  const linkPathGenerator = d3.linkHorizontal()
    .x(d => d.y)
    .y(d => d.x);

  g.selectAll('path').data(links)
    .enter().append('path')
      .attr('d', linkPathGenerator);

  g.selectAll('text').data(root.descendants())
    .enter().append('text')
      .attr('x', d => d.y)
      .attr('y', d => d.x)
      .attr('dy', '0.25em')
      .text(d => d.data.data.id)
      .attr('text-anchor', d => d.children ? 'middle': "start")
      .attr('font-size', d => 3.3 - d.depth +"em");


});
