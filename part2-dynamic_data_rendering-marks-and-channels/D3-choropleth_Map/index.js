const width = window.innerWidth;
const height = window.innerHeight;

const svg = d3
  .select('svg')
    .attr('width', width)
    .attr('height', height);

const g = svg.append('g');

svg.call(d3.zoom().on("zoom", () => {
  g.attr("transform", d3.event.transform);
}));

const projection = d3.geoMercator()
  .scale(width / 6.5)
  .translate([width / 2.2, height / 3]);
const pathGenerator = d3.geoPath().projection(projection);
 
Promise.all([
  d3.tsv('110m.tsv'),
  d3.json('https://d3js.org/world-110m.v1.json')
]).then(([tsvData, topojsonData]) => {
  const rowId =  {};
  tsvData.forEach(d => {
    rowId[d.iso_n3] = d;
  });

  const colorValue = d => rowId[d.id].economy;
  const countries =  topojson.feature(topojsonData, topojsonData.objects.countries);
  const colorScale = d3.scaleOrdinal();
  colorScale
    .domain(countries.features.map(colorValue).sort().reverse())
    .range(d3.schemeSpectral[colorScale.domain().length]);

  const colorLegend = svg.selectAll('circle').data(colorScale.domain());
  colorLegend
    .enter().append('circle')
      .attr('cy', (d, i) => i * 50 + height / 2.5)
      .attr('cx', 25)
      .attr('r', 20)
      .attr('fill', d => colorScale(d));
  colorLegend
    .enter().append('text')
      .attr('y', (d, i) => i * 50 + height / 2.5)
      .attr('x', 50)
      .attr('class', 'text-legend')
      .text(d => d);

  g.selectAll('path').data(countries.features)
    .enter().append('path')
      .attr('d', pathGenerator)
      .attr('class', 'country')
      .attr('fill', d => colorScale(colorValue(d)))
    .append('title')
      .text(d => rowId[d.id].name);
}).catch(err => console.log(err));
