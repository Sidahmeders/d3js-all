const margin = {top: 40, right: 0, left: 60, bottom: 30};
const innerWidth = window.innerWidth - margin.right - margin.left;
const innerHeight = window.innerHeight - margin.top - margin.bottom;
const format = d3.format('.3s');	

const svg = d3.select('svg')
  .style('background-color', '#ddd')
    .attr('width', window.innerWidth - 30)
    .attr('height', window.innerHeight);

// d.mpg
// d.cylinders
// d.displacement
// d.horsepower
// d.weight
// d.acceleration
// d.year

const renderData = data => {
    const xValue = d => d.acceleration;
    const yValue = d => d.weight;

    const xScale = d3.scaleLinear()
    .domain(d3.extent(data, xValue))
    .range([0, innerWidth - margin.left * 1.5])
    .nice();

    const yScale = d3.scaleLinear()
    .domain(d3.extent(data, yValue))
    .range([0, innerHeight - 30]);

const g = svg.append('g')
  .attr('transform', `translate(${margin.left + 30}, ${margin.top})`);

g.append('text')
  .text('cars left side info..')
  .attr('class', 'side-text');

g.append('text')
  .text('cars bottom side info..')
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

g.selectAll('circle').data(data)
    .enter().append('circle')
    .attr('cy', d => yScale(yValue(d)))
    .attr('cx', d => xScale(xValue(d)))
    .attr('r', 10)
};


d3.csv('auto-mpg.csv').then(data => {
    data.forEach(d => {
        d.mpg = +d.mpg;
        d.cylinders = +d.cylinders;
        d.displacement = +d.displacement;
        d.horsepower = +d.horsepower;
        d.weight = +d.weight;
        d.acceleration = +d.acceleration;
        d.year = +d.year;
    });
    renderData(data);
});
