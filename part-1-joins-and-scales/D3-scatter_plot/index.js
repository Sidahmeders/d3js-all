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
    .range([0, innerWidth - margin.left * 1.5])
    .nice();

    const yScale = d3.scalePoint()
    .domain(data.map(yValue))
    .range([0, innerHeight - 30])
    .padding(.8);

const g = svg.append('g')
  .attr('transform', `translate(${margin.left + 30}, ${margin.top})`);

g.append('text')
  .text('Death disease among this modern countries')
  .attr('class', 'head-text');

  const axisTickFormat = number => format(number).replace('G', 'B');

g.append('g').call(d3.axisLeft(yScale).tickSize(-innerWidth + 90))
  .selectAll('.domain').remove()
  .select('path').remove();

g.append('g').call(d3.axisBottom(xScale).tickFormat(axisTickFormat).tickSize(- innerHeight + 35))
  .attr('transform', `translate(${0}, ${innerHeight - 30})`)
  .select('.domain').remove()
  .select('path').remove();

g.selectAll('circle').data(data)
    .enter().append('circle')
    .attr('cy', d => yScale(yValue(d)))
    .attr('cx', d => xScale(xValue(d)))
    .attr('r', 10)
};


d3.csv('data.csv').then(data => {
    data.forEach(d => {
        d.population = +d.population * 25;
    });
    renderData(data);
});
