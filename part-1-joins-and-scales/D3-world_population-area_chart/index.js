const margin = {top: 40, right: 0, left: 60, bottom: 30};
const innerWidth = window.innerWidth - margin.right - margin.left;
const innerHeight = window.innerHeight - margin.top - margin.bottom;
const format = d3.format('.1s');	

const svg = d3.select('svg')
  .style('background-color', '#ddd')
    .attr('width', window.innerWidth - 30)
    .attr('height', window.innerHeight);

const renderData = data => {
  const xValue = d => d.year;
  const yValue = d => d.population;

  const xScale = d3.scaleTime()
  .domain(d3.extent(data, xValue))
  .range([0, innerWidth - margin.left * 1.5])
  .nice();

  const yScale = d3.scaleLinear()
  .domain([0, d3.max(data, yValue)])
  .range([innerHeight - 30, 0]);

  const g = svg.append('g')
    .attr('transform', `translate(${margin.left + 30}, ${margin.top})`);

  g.append('text')
    .text('population')
    .attr('class', 'side-text');

  g.append('text')
    .text('year')
    .attr('class', 'bottom-text');

    const areaGenerator = d3.area()
    .x(d => xScale(xValue(d)))
    .y0(innerHeight - 30)
    .y1(d => yScale(yValue(d)))
    .curve(d3.curveBasis);

  g.append('path')
    .attr('d', areaGenerator(data))
    .attr('class', 'area-path');

  const axisTickFormat = number => format(number).replace('G', 'B');

  g.append('g').call(d3.axisLeft(yScale)
    .tickSize(-innerWidth + 90)
    .tickPadding(5)
    .tickFormat(axisTickFormat)
    )
    .selectAll('.domain').remove()
    .select('path').remove();

  g.append('g').call(d3.axisBottom(xScale)
    .tickSize(- innerHeight + 35)
    .tickPadding(10)
    )
    .attr('transform', `translate(${0}, ${innerHeight - 30})`)
    .select('.domain').remove()
    .select('path').remove();

  
};


d3.csv('world-population-by-year-2015.csv').then(data => {
    data.forEach(d => {
      d.year = new Date(d.year);
      d.population = +d.population;
    });
    renderData(data);
});
