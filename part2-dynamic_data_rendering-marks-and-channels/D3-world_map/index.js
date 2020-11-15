const width = window.innerWidth;
const height = window.innerHeight;
const eyeSpacing = 60;

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
  .translate([width / 2, height / 2]);
const pathGenerator = d3.geoPath().projection(projection);
 
Promise.all([
  d3.tsv('110m.tsv'),
  d3.json('https://d3js.org/world-110m.v1.json')
]).then(([tsvData, topojsonData]) => {
  const countryName =  {};
  tsvData.forEach(d => {
    countryName[d.iso_n3] = d.name;
  });
  const countries =  topojson.feature(topojsonData, topojsonData.objects.countries);
  g.selectAll('path').data(countries.features)
    .enter().append('path')
      .attr('d', pathGenerator)
      .attr('class', 'country')
    .append('title')
      .text(d => countryName[d.id]);
}).catch(err => console.log(err));
