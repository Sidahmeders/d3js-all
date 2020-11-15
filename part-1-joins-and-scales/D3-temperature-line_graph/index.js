const margin = {top: 40, right: 0, left: 60, bottom: 30};
const innerWidth = window.innerWidth - margin.right - margin.left;
const innerHeight = window.innerHeight - margin.top - margin.bottom;
const format = d3.format('.3s');	

const svg = d3.select('svg')
  .style('background-color', '#ddd')
    .attr('width', window.innerWidth - 30)
    .attr('height', window.innerHeight);

const renderData = data => {
  const xValue = d => d.timestamp;
  const yValue = d => d.temperature;

  const xScale = d3.scaleTime()
  .domain(d3.extent(data, xValue))
  .range([0, innerWidth - margin.left * 1.5])
  .nice();

  const yScale = d3.scaleLinear()
  .domain(d3.extent(data, yValue))
  .range([innerHeight - 30, 0]);

  const g = svg.append('g')
    .attr('transform', `translate(${margin.left + 30}, ${margin.top})`);

  g.append('text')
    .text('temperature')
    .attr('class', 'side-text');

  g.append('text')
    .text('time stamp')
    .attr('class', 'bottom-text');

  g.append('g').call(d3.axisLeft(yScale)
    .tickSize(-innerWidth + 90)
    .tickPadding(5)
    )
    .selectAll('.domain').remove()
    .select('path').remove();

  g.append('g').call(d3.axisBottom(xScale)
    .tickSize(- innerHeight + 35)
    .tickPadding(5)
    )
    .attr('transform', `translate(${0}, ${innerHeight - 30})`)
    .select('.domain').remove()
    .select('path').remove();

  const lineGenerator = d3.line()
    .x(d => xScale(xValue(d)))
    .y(d => yScale(yValue(d)))
    .curve(d3.curveBasis);

  g.append('path')
    .attr('d', lineGenerator(data))
    .attr('class', 'line-path');
};


d3.csv('temperature-in-san-francisco.csv').then(data => {
    data.forEach(d => {
      d.temperature = +d.temperature;
      d.timestamp = new Date(d.timestamp);
    });
    renderData(data);
});
