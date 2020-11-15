const width = window.innerWidth;
const height = window.innerHeight;

const svg = d3
  .select('svg')
    .attr('width', width)
    .attr('height', height);

const g = svg.append('g');

const colorScale = d3.scaleOrdinal()
  .domain(['apple', 'lemon', 'lime', 'orange'])
  .range(['#d44', '#dd4', 'green', 'orange']);

const makeFruit = type => ({type, id: Math.random()});
  
const colorLegend = g.selectAll('circle').data(colorScale.domain());
colorLegend
  .enter().append('circle')
    .attr('cy', (d, i) => i * 50 + height / 5)
    .attr('cx', width / 5.6)
    .attr('r', 20)
    .attr('fill', d => colorScale(d));

const texts = g.selectAll('text').data(colorScale.domain());
  texts
    .enter().append('text').text(d => d)
      .attr('y', (d, i) => i * 50 + height / 5)
      .attr('x', width / 5);

const sizeScale = d3.scaleSqrt()
  .domain([0, 10])
  .range([0, 50]);

const ticks = sizeScale.ticks(5).filter(num => num > 0).reverse();

const sizeLegend = g.selectAll('g').data(ticks);
sizeLegend
  .enter().append('circle')
    .attr('cy', (d, i) => i * 50 + height / 6)
    .attr('cx', width / 2.15)
    .attr('r', d => sizeScale(d / 3))
    .attr('fill', '#0003');

const numbers = g.selectAll('g').data(ticks);
numbers
  .enter().append('text').text(d => d)
    .attr('y', (d, i) => i * 50 + height / 5.8)
    .attr('x', width / 2);