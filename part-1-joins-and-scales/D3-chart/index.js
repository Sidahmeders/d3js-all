const width = window.innerWidth;
const height= window.innerHeight;
const margin = {top: 20, right: 20, left: 80, bottom: 20};
const innerWidth = width - margin.right - margin.left;
const innerHeight = height - margin.top - margin.bottom;

const svg = d3.select('svg')
  .style('background-color', '#ddd')
    .attr('width', width)
    .attr('height', height);

const renderData = data => {
    const xValue = d => d.population;
    const yValue = d => d.country;

    const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, xValue)])
    .range([0, width - margin.left * 1.5]);

    const yScale = d3.scaleBand()
    .domain(data.map(yValue))
    .range([0, height - 50])
    .padding(.2);

const g = svg.append('g')
  .attr('transform', `translate(${margin.left}, ${margin.top})`);

g.append('g').call(d3.axisLeft(yScale));
g.append('g').call(d3.axisBottom(xScale))
  .attr('transform', `translate(${0}, ${height -50})`);

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
