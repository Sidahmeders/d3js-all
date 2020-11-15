const margin = {top: 40, right: 0, left: 60, bottom: 0};
const innerWidth = window.innerWidth - margin.right - margin.left;
const innerHeight = window.innerHeight - margin.top - margin.bottom;
const format = d3.format('.3s');	

const svg = d3.select('svg')
  .style('background-color', '#ddd')
    .attr('width', window.innerWidth - 30)
    .attr('height', window.innerHeight);

const renderData = data => {
    const xValue = d => d.population;
    const yValue = d => d.country;

    const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, xValue)])
    .range([0, innerWidth - margin.left * 1.5]);

    const yScale = d3.scaleBand()
    .domain(data.map(yValue))
    .range([0, innerHeight - 30])
    .padding(.2);

const g = svg.append('g')
  .attr('transform', `translate(${margin.left + 30}, ${margin.top})`);

g.append('text')
  .text('Death disease among this modern countries')
  .attr('class', 'head-text');

  const axisTickFormat = number => format(number).replace('G', 'B');

g.append('g').call(d3.axisLeft(yScale))
  .selectAll('.domain, .tick line').remove()
  .select('path').remove();
g.append('g').call(d3.axisBottom(xScale).tickFormat(axisTickFormat).tickSize(- innerHeight + 35))
  .attr('transform', `translate(${0}, ${innerHeight - 30})`)
  .select('.domain').remove()
  .select('path').remove();

g.selectAll('rect').data(data)
    .enter().append('rect')
    .attr('y', d => yScale(yValue(d)))
    .attr('width', d => xScale(xValue(d)))
    .attr('height', yScale.bandwidth())
};


d3.csv('data.csv').then(data => {
    data.forEach(d => {
        d.population = +d.population * 25;
    });
    renderData(data);
});
