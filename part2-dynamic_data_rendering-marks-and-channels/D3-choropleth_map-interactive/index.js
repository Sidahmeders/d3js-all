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
  
  let selectedColor;
  const selectedCountry = d => {
    selectedColor = d;
    renderCountries(g, countries.features)
    renderColorScale(svg, colorScale.domain());
  };

  const renderCountries = (selection, props) => {
    const countriesPath = selection.selectAll('path').data(props);
    countriesPath
      .enter().append('path')
      .on('mouseover', d => selectedCountry(colorValue(d)))
      .on('mouseout', () => selectedCountry('white'))
        .attr('class', 'country')
        .attr('d', pathGenerator)
      .merge(countriesPath)
        .attr('fill', d => colorScale(colorValue(d)))
        .attr('opacity', d => colorValue(d) === selectedColor ? 1 : .4)
        .attr('stroke-width', d => colorValue(d) === selectedColor ? 1.5 : .2)
      .append('title')
        .text(d => rowId[d.id].name);
  };

  const renderColorScale = (selection, props) => {
    const colorLegend = selection.selectAll('circle').data(props);
    colorLegend.enter().append('rect').data([null])
      .attr('width', 270)
      .attr('height', 360)
      .attr('x', 0)
      .attr('y', 235)
      .attr('fill', '#0009');
  
    colorLegend
      .enter().append('circle')
      .on('mouseover', d => selectedCountry(d))
      .on('mouseout', () => selectedCountry('white'))
        .attr('cy', (d, i) => i * 50 + height / 2.5)
        .attr('cx', 25)
        .attr('stroke', "white")
        .attr('stroke-width', 2)
      .merge(colorLegend)
        .attr('r', 20)
        .attr('fill', d => colorScale(d))
        .attr('opacity', d => d === selectedColor ? 1 : .4);
    colorLegend
      .enter().append('text')
        .attr('y', (d, i) => i * 50 + height / 2.5)
        .attr('x', 50)
        .attr('class', 'text-legend')
        .text(d => d);
  };

  renderCountries(g, countries.features);
  renderColorScale(svg, colorScale.domain());

})
.catch(err => console.log(err));
